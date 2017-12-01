<!--
Each row can be thought of as a "wave" of work.
-->
<template>
    <tr class="plain-bg" @mouseover="hover = true" @mouseleave="hover = false">
      <th class="row-heading-cell">
        <div class="row-label" @click="onClick">{{row.label}}</div>
        <transition name="fade">
          <div v-if="hover" class="btn-task-new" @click="addDraftCard" disabled="hasDraftCard">+ Add card</div>
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
      if (self.row.position === 1) {
        self.hasDraftCard = true
      }
    })
  }
}
</script>

<style scoped>
  td, th {
      border: 1px dotted #239B56;/*#bbb;*/
      padding: 5px 7px 4px;
      vertical-align: top;
  }
  th {
    text-align: left;
    font-weight: normal;
    font-family: 'Helvetica Neue', sans-serif;
    color: #FFF; /* Depends on background picture/video! */
  }
  .row-heading-cell {
    /* Placeholder */
  }

  /* ??? */
  .row-heading {
    margin-top: 3px;
  }

  .row-label {
    margin-top: 7px;
    cursor: pointer;
  }
  .cell-0 {
      border: none;
      width: 12%;
  }
  .col {
      width: 22%;
      font-weight: normal;
  }

  .plain-bg {
    background: rgba(0,0,0,0.4); /*#fff;*/
  }

  .btn-task-new {
      font-weight: normal;
      font-size: 13px;
      /*font-family: 'Helvetica Neue', sans-serif;*/
      background-color: #CCC; /* #209cee; */
      color: #000;
      padding: 4px 5px 4px 4px;
      margin-top: 6px;
      display: inline-block;
      cursor: pointer;
      border-radius: 2px;
  }
  .btn-task-new:hover {
      background-color: #BBB; /* #1190e3 rgba(221, 221, 221, 0.7); */ /* #eee; */
  }

  /** TRANSITIONS *************************************************************/

  .fade-enter-active {
    transition: opacity .1s
  }
  .fade-leave-active {
    transition: opacity .4s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0
  }
</style>
