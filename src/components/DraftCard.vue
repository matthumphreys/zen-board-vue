<template>
  <div class="draft-card-wrapper" @keyup.ctrl.enter="onSave">
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
      console.log('onCancel', this.rowId, this.colId)
      // let el = event.srcElement
      let rowId = this.rowId // el.dataset['rowId']
      let colId = this.colId // el.dataset['colId']
      let payload = {
        rowId: rowId,
        colId: colId
      }
      EventBus.$emit('draft-card-cancel', payload)
    },
    onSave: function (event) {
      if (this.label) {
        let cardToSave = {
          label: this.label,
          rowId: this.rowId,
          colId: this.colId,
          myOrder: this.numCards + 1  // XXX: Do server-side
        }
        EventBus.$emit('draft-card-save', cardToSave)
      } else {
        this.onCancel()
      }
    }
  },
  mounted () {
    let self = this
    EventBus.$on('global-cancel', function (rows) {
      console.log('draft-card:global-cancel')
      self.onCancel()
    })
  }
}
</script>

<style scoped>
  [contenteditable] {
      z-index: 100;

      white-space: pre-wrap;
      background-color: #e8f5fd; /* #fffbdd #f5f3d5 */
      /*
      color: springgreen;
      font-family: 'Courier New', Courier, monospace;
      */

      padding: 4px; /*3px 6px 4px 4px;*/
      margin-bottom: 5px;
      margin-top: 6px;
      /* More intuitive without cursor: move */

      border-radius: 2px;
  }

  [contenteditable]:hover {
      background-color: #d6edfc !important;

      padding: 4px !important;
      margin-bottom: 5px !important;
      margin-top: 6px !important;
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
      border-radius: 2px;
  }

  .btn-save {
    background-color: #CCC; /* #5de48c; */
    color: #000;
  }
  .btn-save:hover {
      background-color: #BBB; /* #31dd6d; */
  }

  .btn-cancel {
    background-color: #CCC;
    color: #000;
  }
  .btn-cancel:hover {
      background-color: #BBB;
  }
</style>
