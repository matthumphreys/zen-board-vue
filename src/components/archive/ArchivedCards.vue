<template>
  <div v-if="hasArchivedCard" class="zbr-archive-container zbr-archived-cards">
    <!-- <h3 class="zbr-section-heading">Archived cards</h3> -->
    <table class="zbr-archive">
      <!-- Header row -->
      <tr>
        <td class="zbr-col-empty">
        </td>
        <th class="zbr-col-heading zbr-todo zar-todo">To do
        </th>
        <th class="zbr-col-heading zbr-blocked zar-blocked">Blocked
        </th>
        <th class="zbr-col-heading zbr-inprogress zar-inprogress">In progress
        </th>
        <th class="zbr-col-heading zbr-done zar-done">Done <span class="fa fa-check-circle"></span>
        </th>
      </tr>

      <!-- Based on Row.vue -->
      <tr class="zbr-row zbr-table-bg">
        <th>
          <div class="zro-title-container">
            <div class="zro-title zar-title">Archived cards</div>
          </div>
        </th>

        <td v-for="(cell, index) in cells" :cell="cell" :key="index">
          <div v-for="card in cell.cards" :key="card.id" 
              class="zbr-card zar-card" :data-card-id="card.id" v-on:click="editDetails"
              :title="'id: ' + card.id" @click="editDetails">{{card.title}}</div>
        </td>
      </tr>
    </table>
  </div>
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
  },
  computed: {
    hasArchivedCard: function () {
      let result = false
      if (this.cells) {
        this.cells.forEach(cell => {
          console.log(cell)
          if (cell.cards.length) result = true
        })
      }
      return result
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

  .zar-title {
    color: rgba(255, 255, 255, 0.7);
    cursor: default !important;
  }
  .zar-todo {
    color: rgba(160, 213, 248, 0.7);
  }
  .zar-blocked {
    color: rgba(255, 137, 87, 0.7);
  }
  .zar-inprogress {
    color: rgba(255, 221, 87, 0.7);
  }
  .zar-done {
    color: rgba(35, 209, 96, 0.7);
  }
  .zar-card {
    background-color: rgba(255, 255, 255, 0.7) !important;
    color: rgba(0, 0, 0, 0.7) !important;
  }
</style>
