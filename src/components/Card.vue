<template>
  <div :class="{'zbr-card': true, 'zca-urgent': isUrgent}"
      :data-card-id="card.id" v-on:click="editDetails"
      :title="'id: ' + card.id">{{card.title}}<nudge :cardId="card.id" :lastDragColId="lastDragColId" :newCardId="newCardId" /></div>
</template>

<script>
import EventBus from './EventBus'
import Nudge from './Nudge'

export default {
  name: 'card',
  props: ['card', 'colId', 'lastDragColId', 'newCardId'],
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
      return this.card.title
      /*
      .replace('#social', "<span class='hashtag'>#social</span>")
      .replace('#images', "<span class='hashtag'>#images</span>")
      .replace('#dev', "<span class='hashtag'>#dev</span>")
      .replace('#pagespeed', "<span class='hashtag'>#dev</span>")
      .replace('#seo', "<span class='hashtag'>#dev</span>")

      .replace('@s', "<span class='person-s'>@s</span>")
      .replace('@g', "<span class='person-g'>@g</span>")
      .replace('@a', "<span class='person-a'>@a</span>")
      .replace('@mh', "<span class='person-mh'>@mh</span>")
      .replace('@h', "<span class='person-h'>@mh</span>")
      .replace('@mi', "<span class='person-mi'>@mh</span>")
      */
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
    /* Why the "Pointer" icon and not "Move" icon? Pointer icon is relevant to
     * click (for details) and move. "Move" icon is only relevant to move. */
    cursor: pointer;
  }

  /* ghost class used by Vue.Draggable */
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
