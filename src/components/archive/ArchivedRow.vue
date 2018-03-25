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
					class="zbr-card zar-card" :data-card-id="card.id" v-on:click="editDetails"
					:title="'id: ' + card.id" @click="editDetails">{{card.title}}</div>
		</td>
  </tr>
</template>

<script>
export default {
  name: 'ArchivedRow',
  components: {
  },
  props: {
    row: Object
  }
}
</script>