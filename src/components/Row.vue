<!--
Each row can be thought of as a "wave" of work.
-->
<template>
  <tr class="zbr-row zbr-table-bg" @mouseover="hover = true" @mouseleave="hover = false">
    <th>
      <div class="zro-title-container">
        <div class="zro-title" @click="onClick" :data-is-test-data="row.title === '0F65u28Rc66ORYII'">{{row.title}}</div>
      </div>
      <row-props :description="row.description" />
      <!-- TODO: <transition name="zro-fade"> -->
        <div v-if="hover" class="zro-button" @click="addDraftCard" disabled="hasDraftCard">+&nbsp;Add&nbsp;card</div>
      <!-- </transition> -->
      <div v-if="!hover" class="zro-button zro-button-placeholder">+&nbsp;Add&nbsp;card</div>
    </th>

    <!-- @card-drag-end is originally fired within cell component -->
    <cell v-for="(cell, index) in row.cells"
        :cell="cell" :key="(row.id + ',' + index)" :rowId="row.id"
        :hasDraftCard="hasDraftCard && (cell.colId === 1)" :lastDragColId="lastDragColId" :newCardId="newCardId"
        @card-drag-end="cardDragEnd" />
  </tr>
</template>

<script>
import cell from './Cell'
import rowProps from './RowProps'
import EventBus from './EventBus'

export default {
  name: 'row',
  components: {
    cell, rowProps
  },
  props: ['row', 'lastDragColId', 'newCardId'],
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
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    padding-bottom: 10px;
  }

  .zro-title-container {
    margin: 7px 3px 2px;
  }

  .zro-title {
    margin-top: 7px;
    cursor: pointer;
    font-weight: bold;

    /*
    display: inline;
    background-color: #2260c5;
    padding: 3px 0px;
    box-shadow: 5px 0 0 #2260c5, -5px 0 0 #2260c5;
    */
  }

  .zro-button {
    font-weight: normal;
    font-size: 13px;
    background-color: #BBB;
    color: #000;
    padding: 4px 5px 4px 4px;
    margin-top: 10px;
    display: inline-block;
    cursor: pointer;
    border-radius: 2px;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }
  .zro-button:hover {
    background-color: #AAA;
  }
  .zro-button-placeholder {
    visibility: hidden;
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
