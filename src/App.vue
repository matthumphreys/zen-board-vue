<template>
  <div id="app">
    <board/>
    <!-- <hello></hello> -->
    <!-- <HelloWorld/> -->
  </div>
</template>

<script>
import board from './components/Board'
// Vue-cli example: import HelloWorld from './components/HelloWorld'
// Draggable full example: import Hello from './components/Hello'

export default {
  name: 'app',
  components: {
    board
    // Hello
    // HelloWorld
  }
}
</script>

<style>
  html {
    -ms-text-size-adjust: 100%; /* 2 */
    -webkit-text-size-adjust: 100%; /* 2 */
  }

  html {
  	font-family: 'HelveticaNeue-Light', 'Helvetica Neue', sans-serif;
  }
</style>
