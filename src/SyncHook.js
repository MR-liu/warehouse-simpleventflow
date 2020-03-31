// const { SyncHook } = require('tapable');
// const { SyncHook } = require('../lib/SyncHook');
import { SyncHook } from '../lib/SyncHook';

class leason {
  constructor() {
    this.hooks = {
      arch: new SyncHook(['name'])
    }
  }
  tap() {
    this.hooks.arch.tap('node', (name) => {
      console.log('node', name)
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