// const { SyncBailHook } = require('tapable');
// const { SyncBailHook } = require('../lib/SyncBailHook');
import { SyncBailHook } from '../lib/SyncBailHook';

class leason {
  constructor() {
    this.hooks = {
      arch: new SyncBailHook(['name'])
    }
  }
  tap() {
    this.hooks.arch.tap('node', (name) => {
      console.log('node', name)
      // return 1
    })
    this.hooks.arch.tap('react', (name) => {
      console.log('react', name)
    })
  }
  start() {
    this.hooks.arch.call('mine');
  }
}

let l = new leason;

l.tap();

l.start();