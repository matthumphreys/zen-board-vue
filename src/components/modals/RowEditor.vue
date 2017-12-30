<template>
  <!--
  Key handlers on board component seem flaky... is it a focus issue?
  Adding key handlers on this component too
  -->
  <div v-if="row" class="zen-modal zen-row-editor" @click="onCancelIfClickOutside">
    <!-- ^^ Clicking on background cancels the editor -->

    <div class="zmo-content" @keydown.meta.enter="onSave" @keyup.esc="onCancel">
      <div class="zfo-title">
        <input type="text" name="label" v-model="row.title" v-focus
            :placeholder="(row.isNew) ? 'New row' : 'Title'" @keyup.enter="onSave">
      </div>
      <div v-if="allRows.length" class="zre-position">
        Position <select v-model="row.position">
          <option :value="1">1 (top)</option>
          <option v-for="rowOption in allRows" :value="positionLabel(rowOption.position)" v-if="showOption(rowOption.position)">{{positionLabel(rowOption.position)}} (after {{rowOption.title}})</option>
        </select>
      </div>
      <div class="zfo-description"><textarea name="description" v-model="row.description"></textarea></div><!-- placeholder="Any additional info here" -->
      <div class="zfo-buttons">
          <input type="button" class="zfo-button zfo-cancel" value="Cancel" title="[Esc]" @click="onCancel">
          <span class="zfo-archive">Archive <input type="checkbox" name="archive" class="tdc-archive form-archive" v-model="row.isArchived"></span>
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
  name: 'row-editor',
  directives: { focus: focus },
  data () {
    return {
      row: false, // No row to edit until user clicks one,
      allRows: []
    }
  },

  mounted () {
    let self = this

    EventBus.$on('row-edit-details', function (rowIdToEdit) {
      console.log('Edit row', rowIdToEdit)

      if (rowIdToEdit === 'new-row') {
        self.row = {
          isNew: true,
          position: 1,
          isArchived: false
        }
      } else {
        fetch(process.env.API_URL + '/api/rows/' + rowIdToEdit).then(function (response) {
          if (!response.ok) {
            throw new Error(response.statusText)
          }
          response.json().then(function (json) {
            self.row = json
            json.isArchived = json.is_archived
            console.log(json)
            // Set originalPosition - it's used when row is saved
            self.row.originalPosition = json.position
          })
        }).catch(function (err) {
          console.error(err)
          alert('Sorry, something went wrong\n\n' + err)  // TODO: Improve
        })
      }

      fetch(process.env.API_URL + '/api/rows/').then(function (response) {
        response.json().then(function (json) {
          self.allRows = json
        })
      }).catch(function (err) {
        console.error(err)
        alert('Sorry, something went wrong\n\n' + err)  // TODO: Improve
      })
    })

    EventBus.$on('global-cancel', function () {
      self.onCancel()
    })
  },
  methods: {
    showOption: function (optionPosition) {
      if (this.row.isNew) {
        return true
      } else {
        return (optionPosition !== this.row.position)
      }
    },
    positionLabel: function (optionPosition) {
      console.log(this.row.position, optionPosition)
      if (this.row.isNew) {
        return optionPosition + 1
      } else {
        if (optionPosition > this.row.position) {
          return optionPosition
        } else {
          return optionPosition + 1
        }
      }
    },
    onCancel: function () {
      // TODO: Persist unsaved changes to localStorage
      this.row = false
    },
    onCancelIfClickOutside: function (ev) {
      if (ev.srcElement.classList.contains('zen-row-editor')) {
        // XXX: Use this.methods.onCancel() instead?
        EventBus.$emit('global-cancel', ev)
      }
    },
    onSave: function () {
      console.log('About to save row...')
      // this.card.timestamp = new Date().getTime()
      let self = this

      // TODO: Escape id
      console.log('api url', process.env.API_URL)
      fetch(process.env.API_URL + '/api/rows/save', {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify(this.row)

      }).then(function (response) {
        // REFATOR: Extract function
        if (response.ok) {
          console.log('Card saved')
          // Hide card editor
          self.row = false
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
        // XXX: Disabled, clashes with card save
        // this.onSave()
      }
    }
  }
}
</script>

<style>
.zre-position {
  font-size: 14px;
  margin-bottom: 15px;
}
.zre-position select {
  margin-left: 5px;
}
</style>
