<!--
Row properties. An example property is, "Goal: +5% revenue"
-->
<template>
    <!-- Having separate "name" and "val" columns is neater but less flexible. Flexible wins. -->
    <div v-if="description" class="zro-props">
      <div v-for="(item) in rowProps" class="zro-prop">
        <span class="vro-label"><span v-if="item.name" class="zro-prop-name">{{item.name}}</span>
        {{item.val}}</span>
      </div>
    </div>
</template>

<script>
export default {
  name: 'row-props',
  props: ['description'],
  computed: {
    rowProps: function () {
      let result = []
      let lines = this.description.split('\n')
      for (let line of lines) {
        let item = false

        /* TODO: Make more flexible */
        if (line.startsWith('* Goal:')) {
          item = this.lineToNameVal(line, 'Goal', 3)
        }
        if (line.startsWith('* ETA:')) {
          item = this.lineToNameVal(line, 'ETA', 3)
        }
        if (line.startsWith('* Ongoing')) {
          item = {name: 'Ongoing'}
        }

        if (item) {
          result.push(item)
        }
      }
      return result
    }
  },
  methods: {
    lineToNameVal: function (line, name, numJunkChars) {
      let startPos = name.length + numJunkChars
      let val = line.substr(startPos).trim()
      if (val.length > 60) {
        val = val.substr(0, 60) + '...' // Truncate
      }
      return val ? {'name': name, 'val': val} /* else... */ : false
    }
  }
}
</script>

<style>
  div.zro-props {
    /*margin-top: 4px;*/
    margin-left: 3px;
    font-size: 15px;
  }
  div.zro-prop {
    padding-top: 12px;
    font-family: 'HelveticaNeue-Light', 'Helvetica Neue Light','Helvetica Neue', Helvetica, Arial, sans-serif;
  }
  .zro-prop-name {
    display: inline;
    background-color: #2260c5; /* Alternate values: #1088d6, #2568d6 */
    padding: 1px 0px 2px;
    box-shadow: 5px 0 0 #2260c5, -4px 0 0 #2260c5;

    font-weight: bold;
    margin-right: 5px;
  }

  /*ul.zro-props {
    margin-top: 4px;
    margin-left: 3px;
    font-size: 14px;
  }
  li.zro-prop {
    padding-top: 12px;
    font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, sans-serif;
  }*/
</style>
