<template>
  <div class="draft-card-wrapper">
    <div class="task-new" :contenteditable="true" @input="onInput" v-focus></div>
    <div class="button-container">
      <span class="button btn-cancel" title="[Esc]" @click="onCancel"
          :data-row-id="rowId" :data-col-id="colId">Cancel</span>
      <span class="button btn-save" title="[CTRL + Enter]" @click="onSave">Save</span>
    </div>
  </div>
</template>

<script>
import EventBus from './EventBus'

const focus = {
  inserted (el) {
    el.focus()
  }
}

export default {
  name: 'draft-card',
  props: ['rowId', 'colId', 'numCards'],
  directives: {
    focus: focus
  },
  data () {
    return {
      label: ''
    }
  },
  methods: {
    onInput: function (event) {
      this.label = event.target.innerText
    },
    onCancel: function (event) {
      let el = event.srcElement
      let rowId = el.dataset['rowId']
      let colId = el.dataset['colId']
      let payload = {
        rowId: rowId,
        colId: colId
      }
      EventBus.$emit('draft-card-cancel', payload)
    },
    onSave: function (event) {
      let cardToSave = {
        label: this.label,
        rowId: this.rowId,
        colId: this.colId,
        myOrder: this.numCards + 1  // XXX: Do server-side
      }
      EventBus.$emit('draft-card-save', cardToSave)
      // EventBus.$emit('draft-card-save2', cardToSave)
    }
  }
}
</script>

<style scoped>
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

  /* BUTTONS ******************************************************************/

  .button-container {
      align-content: right;
      font-size: 13px;
      float: right;
      margin-top: 3px;
      margin-bottom: 4px;
  }

  .button {
      font-weight: normal;
      font-size: 13px;
      background-color: #ddd;
      padding: 3px 5px 3px 5px;
      cursor: pointer;
  }

  .button:hover {
      background-color: rgba(221, 221, 221, 0.7);/*#eee;*/
  }
</style>
