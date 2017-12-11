<template>
  <!--
  Key handlers on board component seem flaky... is it a focus issue?
  Adding key handlers on this component too
  -->
  <div v-if="card" class="zen-modal zen-card-editor" @click="onCancelIfClickOutside">
    <!-- ^^ Clicking on background cancels the editor -->
    <div class="zmo-content" @keyup.ctrl.enter="onSave" @keyup.esc="onCancel">
      <div class="zfo-title"><input type="text" name="title" v-model="card.title" v-focus></div>
      <div class="zfo-description"><textarea name="description" v-model="card.description"></textarea></div>
      <div class="zfo-buttons">
          <input type="button" class="zfo-button zfo-cancel" value="Cancel" title="[Esc]" @click="onCancel">
          <span class="zfo-archive">Archive <input type="checkbox" name="archive" v-model="card.isArchived"></span>
          <input type="button" class="zfo-button zfo-save" value="Save" title="[CMD + Enter]" @click="onSave">
      </div>
    </div>
  </div>
</template>

<script>
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

    EventBus.$on('global-save-card', function () {
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
      console.log('About to save card...', this.card)
      if (this.card === false) {
        console.log('Card modal has no card to save')
      } else {
        this.card.timestamp = new Date().getTime()
        let self = this

        // XXX: Validate id is integer
        fetch(process.env.API_URL + '/api/cards/save', {
          method: 'post',
          headers: new Headers({'Content-Type': 'application/json'}),
          body: JSON.stringify(this.card)

        }).then(function (response) {
          // REFACTOR: Extract function
          if (response.ok) {
            console.log('Card saved')
            // Hide card editor
            self.card = false
          } else {
            throw Error(response.statusText)  // Trigger catch
          }
        }).catch(err => alert('Sorry, something went wrong\n\n' + err))
      }
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
