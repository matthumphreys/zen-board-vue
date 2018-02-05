<!--
This component is reponsible for dragging and dropping cards.
-->
<template>
  <Draggable element="td" :list="cell.cards" class="drag-area" :options="dragOptions"
      :data-col-id="cell.colId" :data-row-id="rowId"
      @end="onEnd" @start="onStart">
    <Card v-for="card in cell.cards" :card="card" key="card.id"
        :colId="cell.colId" :lastDragColId="lastDragColId" :newCardId="newCardId" />
    <DraftCard v-if="hasDraftCard" :rowId="rowId" :colId="cell.colId" :numCards="cell.cards.length"/>
  </Draggable>
</template>

<script>
import Draggable from 'vuedraggable'
import Card from './Card'
import DraftCard from './DraftCard'
import EventBus from './EventBus'

export default {
  name: 'Cell',
  props: ['cell', 'rowId', 'hasDraftCard', 'lastDragColId', 'newCardId'],
  components: {
    Draggable, Card, DraftCard
  },
  data () {
    return {
      dragCancelled: false
    }
  },
  computed: {
    dragOptions () {
      return {
        group: 'cards',
        ghostClass: 'zca-ghost',
        disabled: this.contentEditable // Dragging draft card is currently wonky
      }
    }
  },
  methods: {
    // onEnd more appropriate than onMove. (onMove fires even if item isn't dropped).
    onEnd (evt) {
      console.log('onEnd (drag)', evt)
      // TODO: Detect if "escape" (cancel) has been pressed??
      if (!this.dragCancelled) {
        let payload = {
          id: evt.clone.dataset.cardId, // cardId
          rowId: evt.to.dataset.rowId,  // toRowId
          colId: evt.to.dataset.colId,  // toColId
          position: evt.newIndex + 1    // toPosition (alternatively, try evt.draggedContext.futureIndex)
        }
        this.$emit('card-drag-end', payload)  // XXX: Use EventBus instead
        EventBus.$emit('card-drag-end', payload)
        EventBus.$emit('card-nudge', payload)
      }
    },
    onStart (event) {
      let payload = {
        cardId: event.clone.dataset.cardId,
        colId: event.srcElement.dataset.colId
      }
      EventBus.$emit('card-drag-start', payload)
      console.log('onStart', payload)
      this.dragCancelled = false
      return true
    }
  }
}
</script>
