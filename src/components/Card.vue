<template>
  <div :class="{'zbr-card': true, 'zca-urgent': isUrgent}"
      :data-card-id="card.id" v-on:click="editDetails"
      :title="'id: ' + card.id">{{card.title}}<Nudge :cardId="card.id" :lastDragColId="lastDragColId" :newCardId="newCardId" /></div>
</template>

<script>
import EventBus from './EventBus'
import Nudge from './Nudge'

export default {
  name: 'Card',
  props: {
    card: Object,
    colId: Number,
    lastDragColId: [Number, Boolean],
    newCardId: [Number, Boolean]
  },
  components: {
    Nudge
  },
  methods: {
    editDetails: function () {
      console.log('card:editDetails')
      EventBus.$emit('card-edit-details', this.card.id)
    }
  },
  computed: {
    isUrgent: function () {
      return this.card.title.indexOf('!!') > 0
    },
    filteredTitle: function () {
      // Can filter here e.g. replace('#social', "<span class='hashtag'>#social</span>")
      return this.card.title
    }
  }
}
</script>

<style>
  .zbr-card {
    background-color: #FFF;
    padding: 4px 4px 4px 5px;
    margin-top: 3px;
    margin-bottom: 6px;
    cursor: pointer;
    border-radius: 2px;
    color: #000;
  }
  .zbr-card:hover {
    background-color: #EEE;
    /* Pointer icon is relevant to click (for details) and move. "Move" icon is only relevant to move. */
    cursor: pointer;
  }

  /* Ghost class used by Vue.Draggable */
  .zca-ghost {
    opacity: .2;
  }

  .zca-urgent {
    background-color: #ff3860 !important;
    color: #FFF;
  }
  .zca-urgent:hover {
    color: #ffe9ed !important; /* Alternate value: #e9002f */
  }
</style>
