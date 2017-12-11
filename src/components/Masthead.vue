<template>
  <header>
    <h1 class="zbr-heading">
      Acme Dev Team
    </h1>
    <nav class="zbr-nav">
      <ul>
        <li class="zbr-nav-item" @click="onAddRow">+ Add row</li>
        <li v-if="hasRows" class="zbr-nav-item" @click="onAddCard">+ Add card</li>
      </ul>
    </nav>
  </header>
</template>

<script>
import EventBus from './EventBus'

export default {
  name: 'masthead',
  props: ['hasRows'],
  methods: {
    onAddCard: function () {
      EventBus.$emit('masthead-add-card', true)
    },
    onAddRow: function () {
      EventBus.$emit('row-edit-details', 'new-row')
    }
  }
}
</script>

<style>
  .zbr-heading {
    background-color: black;
    color: white;
    font-size: 26px;
    padding: 5px 8px 4px;
    font-weight: bold;
    display: inline-block;
    margin: 0px 0 15px;
  }
  .zbr-nav {
    display: inline;
    position: relative;
    top: -13px;
  }
  .zbr-nav ul {
    display: inline;
    padding: 0;
  }
  li.zbr-nav-item {
    display: inline;
  }
  .zbr-nav-item {
    background-color: #CCC;   /* Alternate values: #209cee, #ccc */
    padding: 4px 5px 4px 4px;
    font-size: 13px;
    cursor: pointer;
    margin-left: 3px;
    border-radius: 2px;
    color: #000;
  }
  .zbr-nav-item:hover {
    background-color: #BBB;
  }
</style>
