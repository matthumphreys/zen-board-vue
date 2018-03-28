<!--
WORK IN PROGRESS!

1. When row is archived it should have it's position set to null (and other
rows should have their position updated).
2. The RowEditor for archived rows shouldn't show the "Position" field (unless
user unchecks "Archive").
3. Need to figure out dragging and dropping cards in archived rows.
-->
<template>
  <div v-if="(archivedRows.length) || hasArchivedCard" class="zbr-archive-container">
    <h3 class="zbr-section-heading">Archive</h3>
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
        <th class="zbr-col-heading zbr-done zar-done">Done<span class="fa fa-check-circle"></span>
        </th>
      </tr>

      <ArchivedRow v-for="row in archivedRows" :row="row" :key="row.id" />
    
			<ArchivedCards v-if="hasArchivedCard" :cells='archivedCards' />
		</table>
  </div>
</template>

<script>
import ArchivedRow from './ArchivedRow'
import ArchivedCards from './ArchivedCards'

export default {
  name: 'Archive',
  props: {
    'archivedRows': Array,
    'archivedCards': Array
  },
  components: {
    ArchivedRow, ArchivedCards
  },
  computed: {
    hasArchivedCard: function () {
      const cells = this.archivedCards
      let result = false
      if (cells) {
        cells.forEach(cell => {
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
  .zbr-section-heading {
    background-color: #000;
    color: #FFF;
    padding: 5px 8px 4px;
    width: 67px;
  }
  .zbr-archive {
    width: 100%;
    border-collapse: collapse;
    color: #FFF;
  }

	.zar-title {
    color: rgba(255, 255, 255, 0.7);
  }
  .zar-default-cursor {
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
