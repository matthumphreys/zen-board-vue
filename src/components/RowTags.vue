<!--
Row tags. An example row tag is, "Goal: +5% revenue"
-->
<template>
    <!-- 
    Having separate "name" and "val" columns is neater but less flexible. Flexible wins. 
    Could try having val on a new line.
    -->
    <div v-if="description" class="zro-tags">
      <div v-for="(item, index) in rowProps" class="zro-tag" :key="index"><!-- index is an appropriate key in this scenario -->
        <span :class="{'zrt-value-archive': isRowArchived}"><span v-if="item.name" :class="{'zrt-name': true, 'zrt-archive': isRowArchived}">{{item.name}}</span>
        {{item.val}}</span>
      </div>
    </div>
</template>

<script>
export default {
  name: 'RowTags',
  props: {description: String, isRowArchived: Boolean},
  computed: {
    rowProps: function () {
      const NUM_JUNK_CHARS = 3
      let result = []
      let lines = this.description.split('\n')
      for (let line of lines) {
        let item = false

        /* XXX: Make more flexible */
        if (line.startsWith('* Goal:')) {
          item = this.lineToNameVal(line, 'Goal', NUM_JUNK_CHARS)
        }
        if (line.startsWith('* ETA:')) {
          item = this.lineToNameVal(line, 'ETA', NUM_JUNK_CHARS)
        }
        if (line.startsWith('* Ongoing')) {
          item = {name: 'Ongoing'}
        }
        if (line.startsWith('* Start:')) {
          item = this.lineToNameVal(line, 'Start', NUM_JUNK_CHARS)
        }
        if (line.startsWith('* End:')) {
          item = this.lineToNameVal(line, 'End', NUM_JUNK_CHARS)
        }
        if (line.startsWith('* Impact:')) {
          item = this.lineToNameVal(line, 'Impact', NUM_JUNK_CHARS)
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
  div.zro-tags {
    margin-left: 3px;
    font-size: 15px;
  }
  div.zro-tag {
    padding-top: 12px;
    font-family: 'HelveticaNeue-Light', 'Helvetica Neue Light','Helvetica Neue', Helvetica, Arial, sans-serif;
  }
  .zrt-name {
    display: inline;
    background-color: #2260c5; /* Alternate values: #1088d6, #2568d6 */
    padding: 1px 0px 2px;
    box-shadow: 5px 0 0 #2260c5, -4px 0 0 #2260c5;

    font-weight: bold;
    margin-right: 5px;
  }
  .zrt-name-archive {
    background-color: rgba(34, 96, 197, 0.7);
    box-shadow: 5px 0 0 rgba(34, 96, 197, 0.7), -4px 0 0 rgba(34, 96, 197, 0.7);
    color: rgba(255, 255, 255, 0.7);
  }

  .zrt-value-archive {
    color: rgba(255, 255, 255, 0.7);
  } 

</style>
