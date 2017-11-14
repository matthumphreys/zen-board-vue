<template>
  <div class="task" :class="{'task-new': card.isDraft}" :data-card-id="card.id" v-on:click="editDetails"
      :contenteditable="card.isDraft" v-focus="card.isDraft">{{card.label}}
  </div>
</template>

<script>
import EventBus from './EventBus'

const focus = {
  inserted (el, binding) {
    if (binding.value) {
      el.focus()
    }
  }
}

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
  directives: {
    focus: focus
  }
}
</script>

<style scoped>
  .task {
    background-color: #D5F5E3;
    padding: 4px;
    margin-top: 3px;
    margin-bottom: 6px;
    cursor: pointer;
  }
  div.task:hover {
      background-color: rgba(213, 245, 227, 0.7);
      padding: 4px;
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

  /* DRAFT CARDS **************************************************************/

  [contenteditable] {
      z-index: 100;

      white-space: pre-wrap;
      background-color: #fffbdd; /*#f5f3d5;*/
      /*
      color: springgreen;
      font-family: 'Courier New', Courier, monospace;
      */

      padding: 4px; /*3px 6px 4px 4px;*/
      margin-bottom: 5px;
      margin-top: 7px;
      /* More intuitive without cursor: move */
  }

  [contenteditable]:hover {
      background-color: rgba(255, 251, 221, 0.6) !important;

      padding: 4px !important;
      margin-bottom: 5px !important;
      margin-top: 7px !important;
  }
</style>
