<template>
    <tr>
      <td>{{row.label}}
        <!-- TODO: Disable "Add card" button when a draft already exists -->
        <div v-if="!hasDraftCard(row.id)" @click="addDraftCard">Add card</div>
      </td>
      <!-- @card-drag-end is fired within cell component -->
      <cell v-for="(cell, index) in row.cells"
          :cell="cell" :key="(row.id + ',' + index)" :rowId="row.id"
          @card-drag-end="cardDragEnd" />
    </tr>
</template>

<script>
import cell from './Cell'
import EventBus from './EventBus'

export default {
  name: 'row',
  components: {
    cell
  },
  props: ['row'],
  methods: {
    cardDragEnd: function (data) {
      // Propogate up to parent
      this.$emit('card-drag-end', data)
    },
    hasDraftCard: function (rowId) {
      // TODO: Make Row a component, to simplify disabling "Add card" button
      return false
    },
    addDraftCard: function (event) {
      let draftCard = {
        label: '',
        isDraft: true
      }
      this.row.cells[0].cards.push(draftCard)
    },
    /** @param xy the row id and cell id of the Cancel button that was clicked */
    removeDraftCards: function (xy) {
      let row = this.row
      if (row.id.toString() === xy.rowId) {
        console.log('Removing draft cards from row', xy.rowId)
        row.cells.forEach(function (cell) {
          // Use traditional "for" loop to avoid "modified during iteration" issues
          for (let i = 0; i < cell.cards.length; i++) {
            let card = cell.cards[i]
            // Only remove draft from the "current" cell
            if (card.isDraft && (xy.rowId === row.id.toString()) && (xy.colId === cell.colId.toString())) {
              cell.cards.splice(i, 1)
            }
          }
        })
      }
    }
  },
  mounted () {
    let self = this
    EventBus.$on('draft-card-cancel', function (parentCell) {
      self.removeDraftCards(parentCell)
    })
  }
}
</script>

<style scoped>
  td, th {
      border: 1px dotted #239B56;/*#bbb;*/
      padding: 5px 7px 4px;
      vertical-align: top;
  }
  th {
      background-color: #1D8348;
      color: white;
  }
  .cell-0 {
      border: none;
      width: 12%;
  }
  .col {
      width: 22%;
      font-weight: normal;
  }
</style>
