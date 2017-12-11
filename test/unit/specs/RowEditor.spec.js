import Vue from 'vue'
import RowEditor from '@/components/modals/RowEditor'

describe('RowEditor.vue', () => {
  let vm = null

  beforeEach(function () {
    const Constructor = Vue.extend(RowEditor)
    vm = new Constructor().$mount()
  })

  it('for a new row, should show full numRows+1 options in position dropdown', () => {
    // vm.allRows = [
    //     {"id":1, "title":"Example row", "position":1},
    //     {"id":2, "title":"New requests, issues, etc", "position":2}
    // ]

    vm.row = {
      isNew: true, position: 1, isArchived: false
    }
    expect(vm.showOption(1)).to.equal(true)
    expect(vm.showOption(2)).to.equal(true)
  })

  it('for an existing row, should show full numRows+1 options in position dropdown', () => {
    vm.row = {
      id: 1, position: 1, isArchived: false
    }
    expect(vm.showOption(1)).to.equal(false)
    expect(vm.showOption(2)).to.equal(true)

    vm.row = {
      id: 1, position: 2, isArchived: false
    }
    expect(vm.showOption(1)).to.equal(true)
    expect(vm.showOption(2)).to.equal(false)
  })
})
