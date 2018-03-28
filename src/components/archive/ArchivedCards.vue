<template>
  <!-- Based on Row.vue -->
  <tr class="zbr-row zbr-table-bg">
    <th>
      <div class="zro-title-container">
        <div class="zro-title zar-title zar-default-cursor">Archived cards</div>
      </div>
    </th>

    <td v-for="(cell, index) in cells" :cell="cell" :key="index">
      <div v-for="card in cell.cards" :key="card.id" 
          class="zbr-card zar-card" :data-card-id="card.id" v-on:click="editDetails"
          :title="'id: ' + card.id">{{card.title}}</div>
    </td>
  </tr>
</template>

<script>
import Cell from '../Cell'
import EventBus from '../EventBus'

export default {
  name: 'ArchivedCards',
  props: {
    'cells': Array
  },
  components: {
    Cell
  },
  methods: {
    editDetails: function (event) {
      console.log('ArchivedCards:editDetails', event.target.dataset.cardId)
      EventBus.$emit('card-edit-details', event.target.dataset.cardId)
    }
  }
}
</script>

<style>
  .zbr-archived-cards {
    margin-top: 10px;
  }

  .zbr-archived-cards .zbr-section-heading {
    width: 135px;
  }
</style>
