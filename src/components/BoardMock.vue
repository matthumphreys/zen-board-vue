<template>
  <div id="main">

    <zenTable/>

    <table class="main">
      <tr>
        <draggable element="td" :list="list" class="dragArea" :options="dragOptions">
          <div v-for="element in list" class="task">{{element.name}}</div>
        </draggable>
        <draggable element="td" :list="list2" class="dragArea" :options="dragOptions">
          <div v-for="element in list2" class="task">{{element.name}}</div>
        </draggable>
        <draggable element="td" :list="list3" class="dragArea" :options="dragOptions">
          <div v-for="element in list3" class="task">{{element.name}}</div>
        </draggable>
      </tr>
    </table>

  </div>
</template>

<script>
import draggable from 'vuedraggable'
// import rows from './Rows'
import zenTable from './Table'

export default {
  name: 'board',
  components: {
    draggable, zenTable
  },
  data () {
    return {
      list: [{name: 'Polls fix'}, {name: 'Remove underscore'}, {name: 'Combine commercial scripts'}],
      list2: [{name: 'JS optimisation'}, {name: 'Remote login'}],
      list3: []
    }
  },
  computed: {
    dragOptions () {
      return {
        // animation: 0,
        group: 'tasks',
        // disabled: !this.editable,
        ghostClass: 'ghost'
      }
    }
  }
}
</script>

<style scoped>
  /* MAIN TABLE ****************************************************************/

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
  .row-heading {
      text-align: left;
      color: black;
      padding-top: 12px;
      padding-bottom: 12px;
  }
  .row-label {
      cursor: pointer;
  }

  /* CARDS ********************************************************************/

  .dragArea{
       min-height: 10px;
  }
  .task {
    background-color: #D5F5E3;
    padding: 4px;
    margin-top: 3px;
    margin-bottom: 6px;
    cursor: pointer;
  }
  div.task:hover {
      background-color: rgba(213, 245, 227, 0.7);
      padding: 4px;
      margin-top: 3px;
      margin-bottom: 6px;
      /* "Pointer" icon is relevant to click (for details) and move.
       * "Move" icon is only relevant to move. */
      cursor: pointer;
  }

  .ghost {
    opacity: .2;
    /*background: #C8EBFB;*/
  }

  td {
    vertical-align: top;
    padding: 2px;
  }
</style>
