import Vue from 'vue'
import Board from '@/components/Board'

// XXX: 'should' should be available already http://vuejs-templates.github.io/webpack/unit.html
var should = require('chai').should()

describe('Board.vue', () => {
  let vm = null

  beforeEach(function () {
    const Constructor = Vue.extend(Board)
    vm = new Constructor({disableFetch: true}).$mount()
  })

  it('should render column headings', () => {
    // const Constructor = Vue.extend(Board)
    // const vm = new Constructor({disableFetch: true}).$mount()
    expect(vm.$el.querySelector('div table.main tr th.col-todo').textContent)
      .to.have.string('To do')
  })

  it('should render "no rows" message when there\'s no rows', () => {
    // const Constructor = Vue.extend(Board)
    // const vm = new Constructor({disableFetch: true}).$mount()
    expect(vm.$el.querySelector('.no-rows').textContent)
      .to.have.string('To create a row')
  })

  it('should NOT render "no rows" message when there rows exist', done => {
    // const Constructor = Vue.extend(Board)
    // const vm = new Constructor({disableFetch: true}).$mount()
    vm.rows = [{
      id: 1, title: 'Foo', position: 1
    }]
    Vue.nextTick(() => {
      should.not.exist(vm.$el.querySelector('.no-rows'))
      done()
    })
  })
})
