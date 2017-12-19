<!--
WORK IN PROGRESS!

1. When row is archived it should have it's position set to null (and other
rows should have their position updated).
2. The RowEditor for archived rows shouldn't show the "Position" field (unless
user unchecks "Archive").
3. Need to figure out dragging and dropping cards in archived rows.
-->
<template>
  <div class="history-container">
    <h3 class="section-heading">Archived rows</h3>
    <table class="history">
      <!-- Header row -->
      <tr >
        <td class="cell-0">
        </td>
        <th class="history-col">To do
        </th>
        <th class="history-col">Blocked</span>
        </th>
        <th class="history-col">In progress
        </th>
        <th class="history-col">Done</span>
        </th>
      </tr>

      <row v-for="row in archivedRows" :row="row" key="row.id" />
    </table>
  </div>
</template>

<script>
import row from './Row'

export default {
  name: 'archive',
  props: ['archivedRows'],
  components: {
    row
  }
}
</script>

<style scoped>
  /*
  font-size: 26px;
  font-weight: bold;
  display: inline-block;
  margin: 0px 0 15px;
  */

  .section-heading {
    background-color: #000;
    color: #FFF;
    padding: 5px 8px 4px;
    width: 129px;
  }
  table {
      width: 100%;
      background-color:rgba(0, 0, 0, 0);
      border-collapse: collapse;
  }
  td, th {
      border: 1px dotted #239B56;
      padding: 5px 7px 4px;
      vertical-align: top;
  }
  th {
      color: white;
      font-weight: normal;
  }
  .cell-0 {
      border: none;
      width: 14%;
  }
  .history-col {
      width: 21.5%;
      font-weight: normal;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      cursor: default;
  }
</style>
