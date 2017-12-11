<!--
This component is responsible for socketio.
-->
<template>
  <div class="zbr-container">
    <masthead :hasRows="rows.length" />
    <!-- Use of tables *is* appropiate here... it's tabular data! -->
    <!-- @keyup.meta.enter doesn't work https://github.com/vuejs/vue/issues/1813 -->
    <table class="zbr-main" @keyup.ctrl.enter="onSave" @keyup.esc="onCancel">
      <!-- Header row -->
      <tr>
        <td class="zbr-col-empty">
        </td>
        <th class="zbr-col-heading zbr-todo">To do
        </th>
        <th class="zbr-col-heading zbr-blocked">Blocked</span>
        </th>
        <th class="zbr-col-heading zbr-inprogress">In progress
        </th>
        <th class="zbr-col-heading zbr-done">Done <span class="fa fa-check-circle"></span>
        </th>
      </tr>

      <!-- @card-drag-end is propagated up from Cell component -->
      <row v-for="row in rows" :row="row" key="row.id" @card-drag-end="cardDragEnd" />

      <tr v-if="rows.length === 0">
        <td colspan="5" class="zbr-table-bg">
            <div class="zbr-no-rows">To create a row, click the "+ Add row" button</div>
        </td>
      </tr>
    </table>

    <cardEditor />
    <row-editor />
    <!-- TODO: <archive :archivedRows='archivedRows' /> -->
  </div>
</template>

<script>
import Vue from 'vue'
import masthead from './Masthead'
import row from './Row'
import cardEditor from './modals/CardEditor'
import RowEditor from './modals/RowEditor'
import Archive from './XArchive'
import EventBus from './EventBus'
import VueSocketio from 'vue-socket.io'

// API might be on a different server
let apiUrl = process.env.API_URL || window.location.origin
Vue.use(VueSocketio, apiUrl)

export default {
  name: 'board',
  components: {
    masthead, row, cardEditor, RowEditor, Archive
  },
  props: ['disableFetch'],  // For unit testing only
  data () {
    return {
      rows: [],
      archivedRows: []
    }
  },
  sockets: {
    connect: function () {
      console.log('socket connected')
    },
    boardRefresh: function (rows) {
      console.log('boardRefresh', rows)
      this.rows = rows
    }
    // TODO: archiveRefresh
  },
  watch: {
    rows: function (newRows) {
      console.log(newRows)
    },
    archivedRows: function (newRows) {
      console.log('watched', newRows)
    }
  },
  created: function () {
    let self = this
    if (!this.disableFetch) {
      // XXX: Polyfill for fetch
      fetch(process.env.API_URL + '/api/rows/deep').then(function (response) {
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        response.json().then(function (json) {
          self.rows = json
          self.initArchive()
        })
      }).catch(function (err) {
        console.error(err)
        alert('Sorry, something went wrong\n\n' + err)
      })
    }
  },
  methods: {
    cardDragEnd: function (data) {
      console.log('board:card-drag-end', data)
      this.$socket.emit('card:move', data)
    },
    onCancel: function (data) {
      console.log('board:onCancel')
      EventBus.$emit('global-cancel', true)
    },
    onSave: function (data) {
      // Avoid "global" save - it's unclear if it should apply to draft card, card modal or row modal

      // console.log('board:onSave')
      // EventBus.$emit('global-save', true)
    },
    initArchive: function () {
      let self = this
      fetch(process.env.API_URL + '/api/archive/rows/deep').then(function (response) {
        if (response.status !== 200) {
          throw Error(response.statusText)
        }
        response.json().then(function (json) {
          self.archivedRows = json
          console.log('Archive', json)
        })
      }).catch(function (err) {
        console.error(err)
        alert('Couldn\'t load archive\n\n' + err)
      })
    }
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
      this.$socket.emit('card:create', draftCard)
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

  .zbr-col-empty {
    border: none;
    width: 14%;
  }
  .zbr-col-heading {
    width: 21.5%;
    font-weight: normal;
    font-family: 'Helvetica Neue', sans-serif;
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
