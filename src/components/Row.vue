<!--
Each row can be thought of as a "wave" of work.
-->
<template>
  <tr class="zbr-row zbr-table-bg" @mouseover="hover = true" @mouseleave="hover = false">
    <th>
      <div class="zro-title" @click="onClick" :data-is-test-data="row.title === '0F65u28Rc66ORYII'">{{row.title}}</div>
      <transition name="zro-fade">
        <div v-if="hover" class="zro-button" @click="addDraftCard" disabled="hasDraftCard">+&nbsp;Add&nbsp;card</div>
      </transition>
    </th>
    <!-- @card-drag-end is originally fired within cell component -->
    <cell v-for="(cell, index) in row.cells"
        :cell="cell" :key="(row.id + ',' + index)" :rowId="row.id"
        :hasDraftCard="hasDraftCard && (cell.colId === 1)"
        @card-drag-end="cardDragEnd" />
  </tr>
</template>

<script>
import cell from './Cell'
import EventBus from './EventBus'

export default {
  name: 'row',
  components: {
    cell
  },
  props: ['row'],
  data () {
    return {
      hasDraftCard: false,
      hover: false
    }
  },
  methods: {
    cardDragEnd: function (data) {
      // Propogate up to parent
      console.log('row:card-drag-end')
      this.$emit('card-drag-end', data)
    },
    addDraftCard: function (event) {
      this.hasDraftCard = true
    },
    /** @param xy the row id and cell id of the Cancel button that was clicked */
    removeDraftCards: function (xy) {
      this.hasDraftCard = false
    },
    onClick: function () {
      console.log('onClick')
      EventBus.$emit('row-edit-details', this.row.id)
    }
  },
  mounted () {
    let self = this
    EventBus.$on('draft-card-cancel', function (xy) {
      if (xy.rowId.toString() === self.row.id.toString()) {
        self.removeDraftCards(xy)
      }
    })
    EventBus.$on('draft-card-save', function (draftCard) {
      if ((draftCard.rowId === self.row.id)) {
        self.hasDraftCard = false
      }
    })
    EventBus.$on('masthead-add-card', function () {
      console.log('masthead-add-card')
      // XXX: What if first row has a different position?
      if (self.row.position === 1) {
        self.hasDraftCard = true
      }
    })
  }
}
</script>

<style>
  /** Zenboard row */

  .zbr-row th {
    text-align: left;
    font-weight: normal;
    font-family: 'Helvetica Neue', sans-serif;
  }

  .zro-title {
    margin-top: 7px;
    cursor: pointer;
  }

  .zro-button {
      font-weight: normal;
      font-size: 13px;
      background-color: #CCC;
      color: #000;
      padding: 4px 5px 4px 4px;
      margin-top: 6px;
      display: inline-block;
      cursor: pointer;
      border-radius: 2px;
  }
  .zro-button:hover {
      background-color: #BBB;
  }

  /** TRANSITIONS *************************************************************/

  .zro-fade-enter-active {
    transition: opacity .1s
  }
  .zro-fade-leave-active {
    transition: opacity .4s
  }
  .zro-fade-enter, .zro-fade-leave-to {
    opacity: 0
  }
</style>
