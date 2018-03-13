<template>
  <div v-if="message || image" class="zbr-nudge">
    <div class="znu-content">
      <template v-if="!image">
        <img class="znu-avatar" :src="'static/themes/desert-beach/avatars/' + getRandomAvatar()" width="50" />
        <div class="znu-arrow-left"></div>
        <div class="znu-message" v-html="message" />
      </template>
      <template v-else>
        <template v-if="message">
          <div class="znu-message znu-message-wide" v-html="message" />
          <div class="znu-arrow-down"></div>
        </template>
        <img :src="image" class="znu-img" />
      </template>
    </div>
  </div>
</template>

<script>
import EventBus from './EventBus'

export default {
  name: 'Nudge',
  props: {
    cardId: Number,
    lastDragColId: [Number, Boolean],
    newCardId: [Number, Boolean]
  },
  data () {
    return {
      message: '',
      image: ''
    }
  },
  mounted () {
    let self = this

    console.log('message for card created', this.cardId, this.newCardId)
    if (this.cardId === this.newCardId) {
      self.initMessageForCardCreated()
      EventBus.$emit('nudge-clear', this.newCardId)
    }

    // card-nudge, previously known as card-drag-end
    EventBus.$on('card-nudge', function (draggedCard) {
      self.message = ''
      self.image = ''
      console.log('nudge', draggedCard.id, self.cardId)
      if (draggedCard.id.toString() === self.cardId.toString()) {
        console.log('lastdrag', self.lastDragColId, draggedCard.colId)
        // If this card has changed column (not just moved within a cell)
        if (self.lastDragColId.toString() !== draggedCard.colId.toString()) {
          self.initMessageForCardMoved(draggedCard.colId)
        }
      }
    })

    /** Clear nudges from other "To do" cards */
    EventBus.$on('nudge-clear', function (excludeId) {
      if (self.cardId.toString() !== excludeId.toString()) {
        self.message = ''
        self.image = ''
      }
    })
  },
  watch: {
    fromColId: function (newFromColId) {
      console.log('newFromColId', newFromColId)
    }
  },
  methods: {
    initMessageForCardMoved: function (colId) {
      if (colId === 4) {
        // Done
        let r = this.getRandomInt(1, 14)
        switch (r) {
          case 1:
            this.message = 'Will you be able to tell if this has the desired impact?'
            break
          case 2:
            this.message = 'Did you test in different browsers? Better now than never!!'
            break
          case 3:
            this.message = 'Good work!'
            break
          case 4:
            this.message = 'Nice :)' // Smiley = &#x263a;
            break
          case 5:
            this.message = 'Bravo! <span class="fa fa-star" style="color: gold"></span>'
            break
          case 6:
            this.message = 'Don\'t forget to take regular breaks!'
            break
          case 7:
            this.message = 'One step closer to world domination... mwahahaha!'
            this.image = 'https://www.jobboarddoctor.com/wp-content/uploads/2016/12/world-domination-300x182.jpg'
            break
          case 8:
            this.message = ''
            // Animal high five
            this.image = 'http://images4.fanpop.com/image/photos/14700000/High-five-puppies-14748728-400-299.jpg'
            // Alt https://cmeimg-a.akamaihd.net/640/cme/cuteness_data/s3fs-public/diy_blog/Teach-A-Dog-How-To-Give-a-High-Five.jpg
            break
          case 9:
            this.message = ''
            // Awesome work, high five
            this.image = 'http://s2.quickmeme.com/img/a8/a8400200b15766f638790dd94df2ff84bc52e24b6c5d67059cfeb01a4929f1c8.jpg'
            break
          case 10:
            this.message = 'Chuck Norris is impressed'
            this.image = 'https://images02.military.com/sites/default/files/styles/full/public/media/veteran-jobs/content-images/2016/03/chucknorris.jpg'
            break
          // case 11:
          //   this.message = ''
          //   // Animated "celebration" gif
          //   this.image = 'https://media.giphy.com/media/pa83tvcKjgQUM/giphy.gif'
        }
      }
      if (colId === 3) {
        // In progress
        let r = this.getRandomInt(1, 20)
        this.icon = false

        // TODO: if ((numInProgress > 6) && (r >=10)) // 'There are X cards in progress already... why not help with one of them before starting something new?'

        switch (r) {
          case 1:
            this.message = 'Don\'t forget: get a different perspective from someone else'
            break
          case 2: // Tweetable
            this.message = 'Not clear what\'s required? Conversation beats documentation'
            break
          case 3:
            this.message = 'Face-to-face conversation helps :)'
            break
          // case 3:
          //   this.message = 'Big changes start with small steps'
          //   break
          case 4: // Tweetable
            this.message = 'Collaborating can give you superpowers &#x26A1;'
            break
          case 5: // Tweetable
            this.message = 'Is it clear what the desired outcome is?'
            break
          case 6:
            this.message = 'How can you get customer feedback for this?'
            // this.image = 'https://media.giphy.com/media/KP0rpRSE9lJi8/giphy.gif'
            break
          case 7:
            this.message = 'Will this need to be maintained?'
            break
          case 8:
            this.message = 'Any security concerns for this?'
            break
          case 9:
            this.message = 'Go for it!'
            break
          case 10:
            this.message = 'Knock it out of the park!'
            break
          case 11:
            // Not sure about this one, implies gargantuan project :(
            this.message = 'Will this be your Sistine Chapel?'
            break
          case 12:
            this.message = 'Use the force, Luke'
            break
          case 13: // Tweetable
            this.message = 'Try some self-compassion'
            break
          case 14: // Tweetable
            this.message = 'Start simple :)'
            break
          // case 15:
          //   // TODO:
          //   this.message = 'There are already 6 cards in progress.<br><br>Should you help with one before starting this card?'
          //   break
          case 16:
            this.message = 'I\'ve got a good feeling about this'
            break
        }
      }
    },
    initMessageForCardCreated: function () {
      console.log('Entering initMessageForCardCreated')
      let r = this.getRandomInt(1, 15)
      this.icon = false
      switch (r) {
        case 1: // Tweetable
          this.message = '"Less, but better." ~ Dieter Rams'
          break
        case 2: // Tweetable
          this.message = '"Innovation is saying no to 1000 things" ~ Steve Jobs'
          this.image = 'https://www.nowyouknowfacts.com/wp-content/uploads/2015/01/SteveJobsCloseUp.jpeg'
          break
        case 3:
          this.message = 'Is it clear what the desired outcome is?'
          break
        case 4:
          this.message = 'How can you get user feedback for this?'
          break
        case 5:
          this.message = 'A specific title makes it easier for people to pick up a card'
          break
        // case 6:
        //   // TODO: Check card title for danger words
        //   this.message = 'Tip: Don\t make card titles overly-technical'
        //   break
        case 7:
          this.message = '"Build, Measure, Learn" ~ Lean Startup'
          break
        case 8:
          this.message = '"Experiment & Learn Rapidly" (quote from Modern Agile)'
          break
        case 9: // Tweetable
          this.message = '"Make your users awesome" ~ Kathy Sierra'
          break
        case 10:
          this.message = 'What\'s the biggest assumption for this piece of work?'
          break
        case 11:
          this.message = 'Is there a way to get user feedback sooner for this?'
          break
      }
    },
    getRandomInt: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min
    },
    getRandomAvatar: function () {
      let i = this.getRandomInt(0, 3)
      let names = ['fox', 'cat', 'lion', 'panda']
      return names[i] + '.svg'
    }
  }
}
</script>

<!--
Animal avatars
https://www.freepik.com/free-vector/variety-of-animal-avatars_766787.htm
-->
<style>
  .zbr-nudge {
    margin-top: 6px;
    margin-bottom: 6px;
  }

  .znu-content {
    min-height: 43px; /* So avatar doesn't overflow shallow cards */
  }

  .znu-avatar {
    float: left;      /* For avatar left */
  }

  .znu-message {
    background-color: #2260c5;
    padding: 3px 5px 5px 6px;
    color: white;
    font-family: 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 15px;

    /* For avatar left */
    margin-left: 60px; /* Includes width of avatar */
    border-radius: 3px;

    min-height: 22px; /* So that left arrow looks good */
  }

  .znu-message-wide {
    margin-left: 0px;
  }

  .znu-img {
    width: 100%;
    margin-bottom: -8px;
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

  .znu-arrow-left {
    float: left;

    width: 0px;
    height: 0px;
    margin-left: 2px;
    margin-top: 8px;

    border-right: 9px solid #2260c5;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
  }
</style>
