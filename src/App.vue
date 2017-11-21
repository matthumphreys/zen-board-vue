<template>
  <div id="app">
    <board/>
  </div>
</template>

<script>
import board from './components/Board'

export default {
  name: 'app',
  components: {
    board
  }
}
</script>

<style>
  html {
    /**
     * Copied from normalize.css: Prevent iOS and IE text size adjust after
     * device orientation change, without disabling user zoom.
     */
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;

  	font-family: 'HelveticaNeue-Light', 'Helvetica Neue', sans-serif;

    /**
     * Stock videos :))
     * https://www.pond5.com/stock-footage/306387/highlands-008-loop.html
     * https://www.pond5.com/stock-footage/72632228/miners-beach-windy-day-loop.html
     * https://www.shutterstock.com/video/clip-12518906-stock-footage-cinemagraph-loop-clouds-move-passed-the-sun-and-through-forest-motion-photo.html?src=search/kTmTxBVgebz5F_PGINyHaw:1:40/3p
     * https://www.shutterstock.com/video/clip-14868547-stock-footage-cinemagraph-loop-lofoten-beach-in-norway-motion-photo.html?src=search/eXBcS-TBy1YEFzvr-IhYMA:1:19/gg
     */

    /*background: url(assets/photo-1499162526249-f5b8b9ba9923.jpg) no-repeat center center fixed;
      -webkit-background-size: cover;
      -moz-background-size: cover;
      -o-background-size: cover;
      background-size: cover;
      padding: 10px 10px;*/
  }
  body {
    margin: 0;
  }
</style>
