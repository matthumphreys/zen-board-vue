<template>
  <div>
    <!-- Use of tables IS appropiate here... this is tabular data! -->
    <!-- @keyup.meta.enter doesn't work https://github.com/vuejs/vue/issues/1813 -->
    <table class="main" @keyup.ctrl.enter="onSave" @keyup.esc="onCancel">
      <tr>
        <td class="cell-0">
        </td>
        <th class="col">Todo
        </th>
        <th class="col">Blocked
        </th>
        <th class="col">In progress
        </th>
        <th class="col">Done
        </th>
      </tr>
      <!-- REFACTOR: Extract to Row component? -->
      <tr v-for="row in rows">
        <td>{{row.label}}
          <!-- TODO: Disable "Add card" button when a draft already exists -->
          <div v-if="!hasDraftCard(row.id)" @click="addDraftCard" :data-row-id="row.id">Add card</div>
        </td>
        <!-- @card-drag-end is fired within cell component -->
        <cell v-for="(cell, index) in row.cells"
            :cell="cell" :key="(row.id + ',' + index)" :rowId="row.id"
            @card-drag-end="cardDragEnd" />
      </tr>
    </table>

    <cardEditor />
  </div>
</template>

<script>
import Vue from 'vue'
import cell from './Cell'
import cardEditor from './modals/CardEditor'
// import draggable from 'vuedraggable'
import EventBus from './EventBus'
import VueSocketio from 'vue-socket.io'
Vue.use(VueSocketio, 'http://localhost:3001') // Usually port 1923 ?

export default {
  name: 'board',
  components: {
    // draggable,
    cell, cardEditor
  },
  data () {
    return {
      rows: []
    }
  },
  sockets: {
    connect: function () {
      console.log('socket connected')
    },
    customEmit: function (val) {
      console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
    }
  },
  watch: {
    rows: function (newRows) {
      console.log(newRows)
      // console.log(this.rows)
    }
  },
  created: function () {
    let self = this
    // TODO: Polyfill for fetch
    fetch('http://localhost:3001/api/rows/deep').then(function (response) {
      response.json().then(function (json) {
        self.rows = json
      })
    }).catch(function (err) {
      console.error(err)
      alert('Sorry, something went wrong\n\n' + err)  // TODO: Improve
    })
  },
  methods: {
    hasDraftCard: function (rowId) {
      // TODO: Make Row a component, to simplify disabling "Add card" button
      return false
    },
    cardDragEnd: function (data) {
      console.log('board:card-drag-end', data)
      this.$socket.emit('task:move', data)
    },
    onCancel: function (data) {
      console.log('board:onCancel')
      EventBus.$emit('global-cancel', true)
    },
    onSave: function (data) {
      console.log('board:onSave')
      EventBus.$emit('global-save', true)
    },
    addDraftCard: function (event) {
      let rowId = event.srcElement.dataset.rowId
      console.log('addCard', rowId)
      let row = this.getRow(rowId)
      let draftCard = {
        label: '',
        isDraft: true
      }
      row.cells[0].cards.push(draftCard)
    },
    getRow: function (rowId) {
      for (let i = 0; i < this.rows.length; i++) {
        let row = this.rows[i]
        if (row.id.toString() === rowId) return row
      }
    },
    /** @param xy the row id and cell id of the Cancel button that was clicked */
    removeDraftCards: function (rows, xy) {
      console.log('Remove draft cards!')

      // XXX: Use this.getRow
      rows.forEach(function (row) {
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
      })
    }
  },
  mounted () {
    let self = this
    EventBus.$on('rows-refreshed', function (rows) {
      console.log('board:rows-refreshed')
      self.rows = rows
    })
    EventBus.$on('draft-card-cancel', function (parentCell) {
      console.log('draft-card-cancel', parentCell)
      self.removeDraftCards(self.rows, parentCell)
    })
  }
}
</script>

<style scoped>
  table {
      width: 100%;
      background-color:rgba(0, 0, 0, 0);
      /*border: 1px dotted #ABEBC6;*/
      border-collapse: collapse;
  }
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
