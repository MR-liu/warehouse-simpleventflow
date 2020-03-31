// const { SyncBailHook } = require('tapable');
const { SyncLoopHook } = require('../lib/SyncLoopHook');

class leason {
  constructor() {
    this.total = 0;
    this.hooks = {
      arch: new SyncLoopHook(['name'])
    }
  }
  tap() {
    this.hooks.arch.tap('node', (name) => {
      console.log('node', name)
      return ++this.total === 3 ? undefined: 'node';
    })
    this.hooks.arch.tap('react', (data) => {
      console.log('react', data)
    })

    this.hooks.arch.tap('vue', (data) => {
      console.log('vue', data)
    })
  }
  start() {
    this.hooks.arch.call('mine');
  }
}

let l = new leason;

l.tap();

l.start();