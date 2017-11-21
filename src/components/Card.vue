<template>
  <div class="task" :data-card-id="card.id" v-on:click="editDetails">{{card.label}}</div>
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
</style>
