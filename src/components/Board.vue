<!--
This is the top-level component. It's responsible for socketio.
-->
<template>
  <div class="wrapper">
    <masthead />
    <!-- Use of tables *is* appropiate here... it's tabular data! -->
    <!-- @keyup.meta.enter doesn't work https://github.com/vuejs/vue/issues/1813 -->
    <table class="main" @keyup.ctrl.enter="onSave" @keyup.esc="onCancel">
      <!-- Header row -->
      <tr >
        <td class="cell-0">
        </td>
        <th class="col col-todo">To do
        </th>
        <th class="col col-blocked">Blocked <span class="fa fa-exclamation-triangle"></span>
        </th>
        <th class="col col-inprogress">In progress
        </th>
        <th class="col col-done">Done <span class="fa fa-check-circle"></span>
        </th>
      </tr>

      <!-- @card-drag-end is propagated up from Cell component -->
      <row v-for="row in rows" :row="row" key="row.id" @card-drag-end="cardDragEnd" />
    </table>

    <cardEditor />
    <row-editor />
  </div>
</template>

<script>
import Vue from 'vue'
// import VideoBg from 'vue-videobg'
// import VueVideoBackground from './misc/VueVideoBackground'
import masthead from './Masthead'
import row from './Row'
import cardEditor from './modals/CardEditor'
import RowEditor from './modals/RowEditor'
import EventBus from './EventBus'
import VueSocketio from 'vue-socket.io'

// API might be on a different server
let apiUrl = process.env.API_URL || window.location.origin
Vue.use(VueSocketio, apiUrl)

// Vue.component('video-bg', VueVideoBackground)

export default {
  name: 'board',
  components: {
    masthead, row, cardEditor, RowEditor
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
    },
    boardRefresh: function (rows) {
      console.log('boardRefresh', rows)
      this.rows = rows
    }
  },
  watch: {
    rows: function (newRows) {
      console.log(newRows)
    }
  },
  created: function () {
    let self = this
    // TODO: Polyfill for fetch
    fetch(process.env.API_URL + '/api/rows/deep').then(function (response) {
      response.json().then(function (json) {
        self.rows = json
      })
    }).catch(function (err) {
      console.error(err)
      alert('Sorry, something went wrong\n\n' + err)  // TODO: Improve
    })
  },
  methods: {
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
    }
    /* ,
    getRow: function (rowId) {
      for (let i = 0; i < this.rows.length; i++) {
        let row = this.rows[i]
        if (row.id.toString() === rowId) return row
      }
    },
    */
    /** @param xy the row id and cell id of the Cancel button that was clicked
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
    */
  },
  mounted () {
    let self = this
    EventBus.$on('rows-refreshed', function (rows) {
      console.log('board:rows-refreshed')
      self.rows = rows
    })
    EventBus.$on('draft-card-save', function (draftCard) {
      console.log('draft-card-save', draftCard)
      // XXX: Call API from DraftCard component instead!
      this.$socket.emit('task:create', draftCard)
    })
  }
}
</script>

<style scoped>
  .wrapper {
    margin: 10px;
  }
  table {
      width: 100%;
      background-color:rgba(0, 0, 0, 0);
      /*border: 1px dotted #ABEBC6;*/
      border-collapse: collapse;
  }
  /* */
  td, th {
      border: 1px dotted #239B56;
      padding: 5px 7px 4px;
      vertical-align: top;
  }
  th {
      /*background-color: #1D8348;*/
      color: white;
  }
  .cell-0 {
      border: none;
      width: 12%;
  }
  .col {
      width: 22%;
      font-weight: normal;
      font-family: 'Helvetica Neue', sans-serif;
  }

</style>
