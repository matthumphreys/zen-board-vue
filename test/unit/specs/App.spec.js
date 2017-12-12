import Vue from 'vue'
import App from '@/App'

describe('App.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(App)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.zfo-logo-dark').textContent)
      .to.equal('Zen')
    expect(vm.$el.querySelector('.zfo-logo-light').textContent)
        .to.equal('board')
  })
})
