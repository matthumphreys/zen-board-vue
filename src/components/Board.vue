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
          <div @click="addDraftCard">Add card</div>
        </td>
        <cell v-for="(cell, index) in row.cells"
            :cell="cell" :rowId="row.id" :key="(row.id + ',' + index)"
            @card-drag-end="cardDragEnd"/>
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
    addDraftCard: function (data) {
      console.log('addCard', this.rows)
      // TODO: Get current row
      let currentRow = this.rows[0]
      let draftCard = {
        label: '',
        isDraft: true
      }
      currentRow.cells[0].cards.push(draftCard)
    }
  },
  mounted () {
    let self = this
    EventBus.$on('rows-refreshed', function (rows) {
      console.log('board:rows-refreshed')
      self.rows = rows
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
