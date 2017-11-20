<template>
  <div class="masthead">
      <div class="heading">
          Acme Dev Team
      </div>
      <div class="nav">
          <!--<span class="nav-item nav-row-new">+ Add row</span>-->
          <span class="nav-item nav-task-new action-task-new" @click="onClick">+ Add card</span>
      </div>
  </div>
</template>

<script>
import EventBus from './EventBus'

export default {
  name: 'masthead',
  methods: {
    onClick: function () {
      EventBus.$emit('masthead-add-card', true)
    }
  }
}
</script>

<style scoped>
  .masthead {
      width: 302px; /*248px; /* 299px; /* 229px if there is only 1 button */;
  }
  .heading {
      background-color: black;
      color: white;
      font-size: 26px;
      padding: 5px 8px 4px;
      font-weight: bold;
      display: inline-block;
      margin: 0px 0 15px;
  }
  .nav {
      padding-top: 2px;
      float: right;
  }
  .nav-item {
      background-color: #ddd;
      padding: 4px;
      font-size: 13px;
      cursor: pointer;
      margin-left: 3px;
  }
  .nav-item:hover {
      background-color: #eee; /*rgba(221, 221, 221, 0.7)*/
  }
</style>
