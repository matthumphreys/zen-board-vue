<template>
  <div class="zen-draft-card" @keydown.meta.enter="onSave" @keyup.enter="onSave">
    <div class="zdc-title" :contenteditable="true" @input="onInput" v-focus></div>
    <div class="zdc-button-container">
      <span class="zdc-button zdc-cancel" title="[Esc]" @click="onCancel"
          :data-row-id="rowId" :data-col-id="colId">Cancel</span>
      <span class="zdc-button zdc-save" title="[Enter]" @click="onSave">Save</span>
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
  name: 'DraftCard',
  props: {
    rowId: Number,
    colId: Number,
    numCards: Number
  },
  directives: {
    focus: focus
  },
  data () {
    return {
      title: '',
      hasChanges: false // Avoids multiple saves
    }
  },
  methods: {
    onInput: function (event) {
      this.title = event.target.innerText
      this.hasChanges = true
    },
    onCancel: function (event) {
      let rowId = this.rowId
      let colId = this.colId
      let payload = {
        rowId: rowId,
        colId: colId
      }
      console.log('draft-card:draft-card-cancel', this.rowId, this.colId)
      EventBus.$emit('draft-card-cancel', payload)
    },
    onSave: function (event) {
      if (this.title) {
        if (this.hasChanges) {
          let cardToSave = {
            title: this.title,
            rowId: this.rowId,
            colId: this.colId,
            position: this.numCards + 1  // XXX: More robust to do this server-side
          }

          fetch(process.env.API_URL + '/api/cards/create', {
            method: 'post',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify(cardToSave)

          }).then((response) => {
            if (response.ok) {
              // Remove card
              EventBus.$emit('draft-card-cancel', cardToSave)
            } else {
              throw Error(response.statusText)
            }
          }).catch(err => alert('Sorry, something went wrong\n\n' + err))
        }
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

<style>
  .zdc-title[contenteditable] {
    color: #000;
    background-color: #e8f5fd; /* Alternate values: #fffbdd, #f5f3d5 */
    white-space: pre-wrap;
    padding: 4px;
    margin-bottom: 5px;
    margin-top: 6px;
    border-radius: 2px;

    /* ZDC is more intuitive without cursor: move */
  }

  .zdc-title[contenteditable]:hover {
    background-color: #d6edfc !important;
  }

  /* BUTTONS ******************************************************************/

  .zdc-button-container {
    float: right;
    font-size: 13px;
    margin-top: 3px;
    margin-bottom: 4px;
  }

  .zdc-button {
    font-weight: normal;
    font-size: 13px;
    background-color: #CCC; /* Alternate value: #5de48c; */
    color: #000; /* Alternate value: #31dd6d; */
    padding: 3px 5px 3px 5px;
    cursor: pointer;
    border-radius: 2px;
  }
</style>
