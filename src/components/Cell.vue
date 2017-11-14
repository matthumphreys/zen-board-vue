<template>
  <td>
    <draggable element="div" :list="cell.cards" class="dragArea" :options="dragOptions"
        :data-col-id="cell.colId" :data-row-id="rowId"
        @end="onEnd" @update="onUpdate" @change="onChange" @sort="onSort">
      <card v-for="card in cell.cards" class="task" :card="card" key="card.id" />
    </draggable>
  </td>
</template>

<script>
import draggable from 'vuedraggable'
import card from './Card'

export default {
  name: 'cell',
  props: ['cell', 'rowId'],
  components: {
    draggable, card
  },
  computed: {
    dragOptions () {
      return {
        group: 'cards',
        ghostClass: 'ghost'
        // animation: 0,
        // disabled: !this.editable,
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
