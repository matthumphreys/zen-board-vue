<!--
Row properties. An example property is, "Goal: +5% revenue"
-->
<template>
    <!-- Having separate "name" and "val" columns is neater but less flexible. Flexible wins. -->
    <div v-if="description" class="zro-props">
      <div v-for="(item) in rowProps" class="zro-prop">
        <span v-if="item.name" class="zro-prop-name">{{item.name}}:</span>
        {{item.val}}
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
          item = {val: 'Ongoing'}
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
  .zro-props {
    margin-top: 4px;
    margin-left: 3px;
    font-size: 14px;
  }
  .zro-prop {
    padding-top: 12px;
    font-family: 'HelveticaNeue-Light', sans-serif;
  }
  .zro-prop-name {
    font-weight: bold;
  }
</style>
