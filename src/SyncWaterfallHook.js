// const { SyncBailHook } = require('tapable');
const { SyncWaterfallHook } = require('../lib/SyncWaterfallHook');

class leason {
  constructor() {
    this.hooks = {
      arch: new SyncWaterfallHook(['name'])
    }
  }
  tap() {
    this.hooks.arch.tap('node', (name) => {
      console.log('node', name)
      return 'node';
    })
    this.hooks.arch.tap('react', (data) => {
      console.log('react', data)
      return 'react';
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