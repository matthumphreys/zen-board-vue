<template>
  <div :class="{task: true, urgent: isUrgent}" :data-card-id="card.id" v-on:click="editDetails">{{card.label}}</div>
</template>

<script>
import EventBus from './EventBus'

export default {
  name: 'card',
  props: ['card'],
  methods: {
    editDetails: function () {
      console.log('editDetails')
      // EventBus.$emit('card_end', 'hello')
      EventBus.$emit('card-edit-details', this.card.id)
    }
  },
  computed: {
    isUrgent: function () {
      return this.card.label.indexOf('!!') > 0
    },
    filteredLabel: function () {
      return this.card.label
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

<style scoped>
  .task {
    background-color: #D5F5E3;
    padding: 4px 4px 4px 5px;
    margin-top: 3px;
    margin-bottom: 6px;
    cursor: pointer;
    border-radius: 2px;
  }
  div.task:hover {
      background-color: rgba(213, 245, 227, 0.7);
      padding: 4px 4px 4px 5px;
      margin-top: 3px;
      margin-bottom: 6px;
      /* "Pointer" icon is relevant to click (for details) and move.
       * "Move" icon is only relevant to move. */
      cursor: pointer;
  }

  /* ghost class used by Vue.Draggable */
  .ghost {
    opacity: .2;
    /*background: #C8EBFB;*/
  }

  .urgent {
    background-color: #ff3860 !important;
    color: white;
  }
  .urgent:hover {
    color: #ffe9ed !important; /* #e9002f */
  }
</style>
