<!--
This component is reponsible for dragging and dropping cards.
-->
<template>
  <draggable element="td" :list="cell.cards" class="drag-area" :options="dragOptions"
      :data-col-id="cell.colId" :data-row-id="rowId"
      @end="onEnd" @start="onStart">
    <card v-for="card in cell.cards" :card="card" key="card.id"
        :colId="cell.colId" :lastDragColId="lastDragColId" :newCardId="newCardId" />
    <draft-card v-if="hasDraftCard" :rowId="rowId" :colId="cell.colId" :numCards="cell.cards.length"/>
  </draggable>
</template>

<script>
import draggable from 'vuedraggable'
import card from './Card'
import draftCard from './DraftCard'
import EventBus from './EventBus'

export default {
  name: 'cell',
  props: ['cell', 'rowId', 'hasDraftCard', 'lastDragColId', 'newCardId'],
  components: {
    draggable, card, draftCard
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
      // TODO: How to detect if "escape" (cancel) has been pressed??
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
