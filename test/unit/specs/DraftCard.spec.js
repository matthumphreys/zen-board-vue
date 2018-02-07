import Vue from 'vue'
import DraftCard from '@/components/DraftCard'
import EventBus from '@/components/EventBus'

describe('DraftCard.vue', () => {
  let vm = null

  beforeEach(function () {
    const Constructor = Vue.extend(DraftCard)
    let props = {rowId: 1, colId: 2, numCards: 1}
    vm = new Constructor({propsData: props}).$mount()
  })

  it('should fire cancel event', done => {
    EventBus.$on('draft-card-cancel', function (xy) {
      expect(xy.rowId.toString()).to.equal('1')
      expect(xy.colId.toString()).to.equal('2')
      done()
    })
    vm.onCancel({})
  })
})
