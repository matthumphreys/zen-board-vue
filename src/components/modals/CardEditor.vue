<template>
  <!--
  Key handlers on board component seem flaky... is it a focus issue?
  Adding key handlers on this component too
  -->
  <div v-if="card" class="template-task-details template-modal" @click="onCancelIfClickOutside">
    <!-- ^^ Clicking on background cancels the editor -->
    <div class="task-details-content modal-content" @keyup.ctrl.enter="onSave" @keyup.esc="onCancel">
      <div><input type="text" name="label" class="tdc-label form-label" v-model="card.label" v-focus></div>
      <div><textarea name="description" class="tdc-description form-textarea" v-model="card.description"></textarea></div>
      <div class="tdc-archive form-archive">Archive <input type="checkbox" name="archive" class="tdc-archive form-archive" v-model="card.isArchived"></div>
      <div class="modal-buttons tdc-buttons">
          <input type="button" class="modal-cancel tdc-button-cancel" value="Cancel" title="[Esc]" @click="onCancel">
          <input type="button" class="modal-save tdc-button-save" value="Save" title="[CMD + Enter]" @click="onSave">
      </div>
    </div>
  </div>
</template>

<script>
// import Vue from 'Vue'
import EventBus from '../EventBus'

/* Custom Vue directive */
const focus = {
  inserted (el) {
    el.focus()
  }
}

export default {
  name: 'cardEditor',
  directives: { focus: focus },
  data () {
    return {
      card: false // No card to edit until user clicks one
    }
  },

  mounted () {
    let self = this

    EventBus.$on('card-edit-details', function (cardIdToEdit) {
      console.log('Edit card', cardIdToEdit)

      // TODO: Polyfill for fetch
      fetch(process.env.API_URL + '/api/cards/' + cardIdToEdit).then(function (response) {
        response.json().then(function (json) {
          self.card = json
        })
      }).catch(function (err) {
        console.error(err)
        alert('Sorry, something went wrong\n\n' + err)  // TODO: Improve
      })
    })

    EventBus.$on('global-cancel', function () {
      self.onCancel()
    })

    EventBus.$on('global-save', function () {
      self.onSave()
    })
  },
  methods: {
    onCancel: function () {
      // TODO: Persist unsaved changes to localStorage
      this.card = false
    },
    onCancelIfClickOutside: function (ev) {
      if (ev.srcElement.classList.contains('template-modal')) {
        // XXX: Use this.methods.onCancel() instead?
        EventBus.$emit('global-cancel', ev)
      }
    },
    onSave: function () {
      console.log('About to save card...')
      this.card.timestamp = new Date().getTime()
      let self = this

      // TODO: Escape id
      console.log('api url', process.env.API_URL)
      fetch(process.env.API_URL + '/api/cards/save', {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify(this.card)

      }).then(function (response) {
        // REFATOR: Extract function
        if (response.ok) {
          console.log('Card saved')
          // Hide card editor
          self.card = false
          // response.json().then(function (rows) {
          //   EventBus.$emit('rows-refreshed', rows)
          // })
        } else {
          throw Error(response.statusText)  // Trigger catch
        }
      }).catch(err => alert('Sorry, something went wrong\n\n' + err))
    },
    /* meta.enter is broken https://github.com/vuejs/vue/issues/1813 */
    handleCmdEnter: function (e) {
      console.log(e)
      if ((e.metaKey || e.ctrlKey) && e.keyCode === 13) {
        this.onSave()
      }
    }
  }
}
</script>

<style scoped>

.template-modal {
    /*display: none;*/
    position: fixed;
    z-index: 1;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);

    padding-top: 20px;
    overflow: auto; /* Enable scroll if needed */
}
.modal-content {
    margin: 5% auto;
    width: 70%;
    max-width: 500px;
    padding: 15px 19px 15px 13px;
    background-color: #f9f9f9; /* #d5f5f3; */
    border: 1px solid #CCC;
    font-family: 'Helvetica Neue', sans-serif;
}
.form-title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
}
div.form-label {
    font-size: 24px;
    margin-bottom: 20px;
}
div.form-textarea {
    margin-bottom: 20px;
    height: 380px;
}
div.form-archive {
    margin-bottom: 20px;
}

input.form-label {
    font-size: 23px;
    width: 100%;
    margin-bottom: 15px;
}
textarea.form-textarea {
    width: 100%;
    height: 380px;
    margin-bottom: 10px;
    font-size: 16px;
}
.modal-buttons  {
    text-align: right;
}
.modal-buttons  input {
    background-color: #ddd;
    font-size: 13px;
}
.modal-buttons  input:hover {
    background-color: #eee;
}
.modal-cancel {
    float: left;
}
</style>
