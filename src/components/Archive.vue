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

      <!--
      <archive-row v-for="archiveRow in archiveRows" :row="archiveRow" key="archiveRow.id"/>
      -->
    </table>
  </div>
</template>

<script>
export default {
  name: 'archive'
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
      width: 12%;
  }
  .col {
      width: 22%;
      font-weight: normal;
      font-family: 'Helvetica Neue', sans-serif;
      cursor: default;
  }
</style>
