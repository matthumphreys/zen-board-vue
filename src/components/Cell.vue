<!--
This component is reponsible for dragging and dropping cards.
-->
<template>
  <draggable element="td" :list="cell.cards" class="drag-area" :options="dragOptions"
      :data-col-id="cell.colId" :data-row-id="rowId"
      @end="onEnd" @sort="onSort">
    <card v-for="card in cell.cards" :card="card" key="card.id" />
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
  props: ['cell', 'rowId', 'hasDraftCard'],
  components: {
    draggable, card, draftCard
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
      console.log('onEnd (drag)') // , evt)
      // TODO: Do nothing if user has pressed "escape"
      let payload = {
        id: evt.clone.dataset.cardId, // cardId
        rowId: evt.to.dataset.rowId,  // toRowId
        colId: evt.to.dataset.colId,  // toColId
        position: evt.newIndex + 1    // toPosition
      }
      this.$emit('card-drag-end', payload)  // XXX: Use EventBus instead
      EventBus.$emit('card-drag-end', payload)
    },
    onSort () {
      // Called once for item being removed, and once for item being added?
      // console.log('Sort!')
      return true
    }
  }
}
</script>
