<template>
  <div v-if="message" class="zbr-nudge">
    <div class="znu-content">
      <div class="znu-message">{{message}}</div>
      <div class="znu-arrow-down"></div>
      <img src="static/themes/desert-beach/avatars/avatar1.png" width="50" />
    </div>
  </div>
</template>

<script>
import EventBus from './EventBus'

export default {
  name: 'nudge',
  props: ['cardId'],
  data () {
    return {
      message: '',
      icon: ''
    }
  },
  mounted () {
    let self = this
    EventBus.$on('card-drag-end', function (draggedCard) {
      if (draggedCard.id.toString() === self.cardId.toString()) {
        self.initMessage(draggedCard.colId)
      } else {
        self.message = false
        self.icon = false
      }
    })
  },
  methods: {
    initMessage: function (colId) {
      console.log('Col', colId)
      if (colId === '4') {
        // Done
        let r = this.getRandomInt(1, 10)
        this.icon = false
        switch (r) {
          case 1:
            this.message = 'Will you be able to tell if this has the desired impact?'
            this.icon = 'fa fa-question-circle'
            break
          case 2:
            this.message = 'Did you test in different browsers? Better now than never!!'
            this.icon = 'fa fa-question-circle'
            break
          case 3:
            this.message = 'Good work!'
            break
          case 4:
            this.message = 'Nice :)'
            break
          case 5:
            this.message = 'Bravo!'
            break
          case 6:
            this.message = 'Don\'t forget to take regular breaks!'
            break
          case 7:
            this.message = 'One step closer to world domination... mwahahaha!'
            break
          default:
            this.message = false
        }
      }
      if (colId === '3') {
        // In progress
        let r = this.getRandomInt(1, 16)
        this.icon = false
        switch (r) {
          case 1:
            this.message = 'Tip: Get a different perspective from someone else'
            break
          case 2:
            this.message = 'Not clear what\'s required? Conversation beats documentation'
            break
          case 3:
            this.message = 'Tip: Some face-to-face time always helps :)'
            break
          // case 3:
          //   this.message = 'Big changes start with small steps'
          //   break
          case 4:
            this.message = 'Collaborating can give you superpowers'
            break
          case 5:
            this.message = 'Is it clear what the desired outcome is?'
            this.icon = 'fa fa-question-circle'
            break
          case 6:
            this.message = 'How can you get user feedback for this?'
            break
          case 7:
            this.message = 'Will this need to be maintained?'
            this.icon = 'fa fa-question-circle'
            break
          case 8:
            this.message = 'Any security concerns to consider for this?'
            this.icon = 'fa fa-question-circle'
            break
          case 9:
            this.message = 'Go for it!'
            break
          case 10:
            this.message = 'Knock it out of the park!'
            break
          case 11:
            this.message = 'Will this be your Sistine Chapel?'
            break
          case 12:
            this.message = 'Use the force, Luke'
            break
          case 13:
            this.message = 'Try some self-compassion'
            break
          default:
            this.message = false
            this.icon = false
        }
      }
      if (colId === '1') {
        // To do
        console.log('To do')
        let r = this.getRandomInt(1, 15)
        this.icon = false
        switch (r) {
          case 1:
            this.message = '"Do less, better" ~ Dieter Rams'
            break
          case 2:
            this.message = '"Innovation is saying no to 1000 things" ~ Steve Jobs'
            break
          case 3:
            this.message = 'Is it clear what the desired outcome is?'
            this.icon = 'fa fa-question-circle'
            break
          case 4:
            this.message = 'How can you get user feedback for this?'
            break
          case 5:
            this.message = 'Tip: a specific title makes it easier for people to pick up a card'
            break
          case 6:
            // TODO: Check card title for danger words
            this.message = 'Tip: Don\t make card titles overly-technical'
            break
          case 7:
            this.message = '"Build, Measure, Learn" ~ Lean Startup'
            break
          case 8:
            this.message = '"Experiment & Learn Rapidly" (quote from Modern Agile)'
            break
          case 9:
            this.message = '"Make your users awesome" ~ Kathy Sierra'
            break
          case 10:
            this.message = 'What\'s the biggest assumption for this piece of work?'
            break
          case 11:
            this.message = 'Should some of this be deferred until later, so that you can get feedback from users sooner?'
            break
          default:
            this.message = false
            this.icon = false
        }
      }
    },
    getRandomInt: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min
    }
  }
}
</script>

<!--
Animal avatars might be useful!
https://www.freepik.com/free-vector/variety-of-animal-avatars_766787.htm
-->
<style>
  .zbr-nudge {
    margin-top: 4px;
  }

  .znu-message {
    background-color: #2260c5;
    padding: 4px 5px;
    color: white;
    font-family: 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  /* Arrow css from https://css-tricks.com/snippets/css/css-triangle/ */
  .znu-arrow-down {
    width: 0px;
    height: 0px;

    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid #2260c5;
    margin-left: 15px;
  }
</style>
