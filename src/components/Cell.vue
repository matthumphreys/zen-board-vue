<template>
  <td>
    <draggable element="div" :list="cell.cards" class="dragArea" :options="dragOptions"
        :data-col-id="cell.colId" :data-row-id="rowId"
        @end="onEnd" @update="onUpdate" @change="onChange" @sort="onSort">
      <card v-for="card in cell.cards" :card="card" key="card.id" />
    </draggable>
    <draft-card v-if="hasDraftCard" :rowId="rowId" :colId="cell.colId" />
  </td>
</template>

<script>
/** This component is reponsible for dragging and dropping cards */

import draggable from 'vuedraggable'
import card from './Card'
import draftCard from './DraftCard'

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
        ghostClass: 'ghost',
        // animation: 0,
        disabled: this.contentEditable // Dragging draft card is currently wonky
      }
    }
  },
  methods: {
    onEnd (evt) {
      console.log('End (drag)') // , evt)
      this.$emit('card-drag-end', {
        id: evt.clone.dataset.cardId, // cardId
        rowId: evt.to.dataset.rowId,  // toRowId
        colId: evt.to.dataset.colId,  // toColId
        myOrder: evt.newIndex + 1     // toPosition
      })
    },
    onUpdate () {
      // console.log('Update!')
    },
    onChange () {
      // console.log('Change!')
    },
    onMove () {
      // No, called even if item isn't dropped
    },
    onSort () {
      // Called once for item being removed, and once for item being added?
      // console.log('Sort!')
      return true
    }
  }
}
</script>

<style scoped>
  /* td styles are defined in the Board component (along with th) */

  .row-heading {
      text-align: left;
      color: black;
      padding-top: 12px;
      padding-bottom: 12px;
  }
  .row-label {
      cursor: pointer;
  }

  .dragArea{
       min-height: 10px;
  }
</style>
