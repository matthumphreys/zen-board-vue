<template>
	<tr class="zbr-row zbr-table-bg">
    <th>
      <div class="zro-title-container">
        <div class="zro-title zar-title" @click="onClick" :data-is-test-data="row.title === '0F65u28Rc66ORYII'">{{row.title}}</div>
      </div>
      <RowProps :description="row.description" />
    </th>

    <td v-for="(cell, index) in row.cells" :cell="cell" :key="index">
			<div v-for="card in cell.cards" :key="card.id" 
					class="zbr-card zar-card" :data-card-id="card.id" v-on:click="editCardDetails"
					:title="'id: ' + card.id">{{card.title}}</div>
		</td>
  </tr>
</template>

<script>
import EventBus from '../EventBus'
import RowProps from '../RowProps'

export default {
  name: 'ArchivedRow',
  components: {
    RowProps
  },
  props: {
    row: Object
  },
  methods: {
    editCardDetails: function (event) {
      console.log('ArchivedRow:editCardDetails', event)
      EventBus.$emit('card-edit-details', event.target.dataset.cardId)
    },
    onClick: function () {
      console.log('ArchivedRow:onClick')
      EventBus.$emit('row-edit-details', this.row.id)
    }
  }
}
</script>