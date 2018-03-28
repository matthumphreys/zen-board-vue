<!--
This component is responsible for socketio.
(Drag and drop is handled by Cell component).
-->
<template>
  <div class="zbr-container">
    <Masthead :hasRows="rows.length > 0" :title="title" />
    <!-- Use of tables *is* appropiate here... it's tabular data! -->
    <table class="zbr-main" @keydown.esc="onCancel">
      <!-- Header row -->
      <tr>
        <td class="zbr-col-empty">
        </td>
        <th class="zbr-col-heading zbr-todo">To do
        </th>
        <th class="zbr-col-heading zbr-blocked">Blocked
        </th>
        <th class="zbr-col-heading zbr-inprogress">In progress
        </th>
        <th class="zbr-col-heading zbr-done">Done <span class="fa fa-check-circle"></span>
        </th>
      </tr>

      <Row v-for="row in rows" :row="row" :key="row.id" :lastDragColId="lastDragColId" :newCardId="newCardId" />

      <tr v-if="rows.length === 0">
        <td colspan="5" class="zbr-table-bg">
            <div class="zbr-no-rows">To create a row, click the "+ Add row" button</div>
        </td>
      </tr>
    </table>

    <CardEditor />
    <RowEditor />
    <Archive :archivedRows='archivedRows' :archivedCards='archivedCards' />
  </div>
</template>

<script>
import Vue from 'vue'
import Masthead from './Masthead'
import Row from './Row'
import CardEditor from './modals/CardEditor'
import RowEditor from './modals/RowEditor'
import Archive from './archive/Archive'
import EventBus from './EventBus'
import VueSocketio from 'vue-socket.io'

// API might be on a different server
let apiUrl = process.env.API_URL || window.location.origin
Vue.use(VueSocketio, apiUrl)

export default {
  name: 'Board',
  components: {
    Masthead, Row, CardEditor, RowEditor, Archive
  },
  props: {disableFetch: Boolean},  // So unit tests can populate data manually, rather than via API
  data () {
    return {
      rows: [],
      archivedRows: [],
      archivedCards: [],
      title: '',
      lastDragCardId: false,
      lastDragColId: false,
      newCardId: false
    }
  },
  sockets: {
    connect: function () {
      console.log('socket connected')
    },
    boardRefresh: function (board) {
      console.log('boardRefresh', board)
      this.rows = board.rows
    },
    rowArchiveRefresh: function (archivedRows) {
      console.log('rowArchiveRefresh', archivedRows)
      this.archivedRows = archivedRows
    },
    cardArchiveRefresh: function (archivedCards) {
      console.log('cardArchiveRefresh', archivedCards)
      this.archivedCards = archivedCards
    },
    boardTitleLoaded: function (boardTitle) {
      console.log('boardTitleLoaded')
      EventBus.$emit('board-title-loaded', boardTitle)
    },
    cardCreated: function (card) {
      console.log('board:cardCreated')
      // The last card created by this user
      this.newCardId = card.id
    }
    // TODO: archiveRefresh
  },
  watch: {
    rows: function (newRows) {
      console.log(newRows)
    },
    archivedRows: function (newRows) {
      console.log('archive', newRows)
    }
  },
  created: function () {
    let self = this
    if (!this.disableFetch) {
      // TODO: Polyfill for fetch
      fetch(process.env.API_URL + '/api/rows/deep').then(function (response) {
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        response.json().then(function (json) {
          self.rows = json
          self.loadTitle()
        })
      }).catch(function (err) {
        console.error(err)
        alert('Sorry, something went wrong\n\n' + err)
      })
    }
  },
  methods: {
    onCancel: function (data) {
      console.log('board:onCancel')
      EventBus.$emit('global-cancel', true)
    },
    loadTitle: function () {
      let self = this
      fetch(process.env.API_URL + '/api/board/').then(function (response) {
        if (response.status === 200) {
          response.json().then(function (board) {
            self.title = board.title
            document.title = board.title
          })
        }
        self.initArchive()
      })
    },
    initArchive: function () {
      let self = this

      fetch(process.env.API_URL + '/api/archive/rows/deep').then(function (response) {
        if (response.status !== 200) {
          throw Error(response.statusText)
        }
        response.json().then(function (json) {
          self.archivedRows = json
          console.log('Archived rows', json)
        })
      }).catch(function (err) {
        console.error(err)
        alert('Couldn\'t load archived rows\n\n' + err)
      })

      fetch(process.env.API_URL + '/api/archive/cards').then(function (response) {
        if (response.status !== 200) {
          throw Error(response.statusText)
        }
        response.json().then(function (json) {
          self.archivedCards = json
          console.log('Archived cards', json)
        })
      }).catch(function (err) {
        console.error(err)
        alert('Couldn\'t load archived cards\n\n' + err)
      })
    }
  },
  mounted () {
    let self = this

    EventBus.$on('card-drag-start', function (draggedCard) {
      self.lastDragCardId = draggedCard.colId
      self.lastDragColId = draggedCard.colId
    })
  }
}
</script>

<style>
  /** Zenboard container, main table, etc */

  .zbr-container {
    margin: 10px;
  }

  .zbr-main {
    width: 100%;
    border-collapse: collapse;
    color: #FFF;
  }
  td, th {
    border: 1px dotted #999;
    padding: 5px 7px 4px;
    vertical-align: top;
  }
  th {
    color: #FFF;
  }
  .zbr-col-heading {
    background-color: rgba(0, 0, 0, 0.3);
  }

  .zbr-col-empty {
    border: none;
    width: 20%;
  }
  .zbr-col-heading {
    width: 20%;
    font-weight: bold;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    cursor: default;
  }

  .zbr-todo {
    color: #a0d5f8;
  }
  .zbr-blocked {
    color: #ff8957;
  }
  .zbr-inprogress {
    color: #ffdd57;
  }
  .zbr-done {
    color: #23d160;
  }

  .zbr-table-bg {
    background: rgba(0,0,0,0.3);
  }

  .zbr-no-rows {
    color: #fff;
    margin: 15px;
    text-align: center;
  }

</style>
