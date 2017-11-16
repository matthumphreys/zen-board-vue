<template>
    <tr>
      <td>{{row.label}}
        <div disabled="hasDraftCard" @click="addDraftCard">Add card</div>
      </td>
      <!-- @card-drag-end is originally fired within cell component -->
      <cell v-for="(cell, index) in row.cells"
          :cell="cell" :key="(row.id + ',' + index)" :rowId="row.id"
          :hasDraftCard="hasDraftCard && (cell.colId === 1)"
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
  data () {
    return {
      hasDraftCard: false
    }
  },
  methods: {
    cardDragEnd: function (data) {
      // Propogate up to parent
      this.$emit('card-drag-end', data)
    },
    addDraftCard: function (event) {
      this.hasDraftCard = true
    },
    /** @param xy the row id and cell id of the Cancel button that was clicked */
    removeDraftCards: function (xy) {
      this.hasDraftCard = false
    }
  },
  mounted () {
    let self = this
    EventBus.$on('draft-card-cancel', function (xy) {
      if (xy.rowId === self.row.id.toString()) {
        self.removeDraftCards(xy)
      }
    })
    EventBus.$on('draft-card-save', function (draftCard) {
      if ((draftCard.rowId === self.row.id)) {
        self.hasDraftCard = false
      }
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
