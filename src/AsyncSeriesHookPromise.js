//start.js(原生的异步钩子)
// let { AsyncSeriesHook } = require('tapable');
let { AsyncSeriesHook } = require('../lib/AsyncSeriesHookPromise');

// 异步的钩子
// 同时发送多个请求
// 注册方法分为tap和tapAsync（同步和异步）


// 这里3个时间同时触发了 等到3个事件都完成了 才触发done时间
// 异步并发
class Lesson {
  constructor() {
    this.index = 0;
    this.hooks = {
      arch: new AsyncSeriesHook(['name']) //此处的“name”,只是为了方便开发者阅读，语义化
    };
  }
  tap() {
    //注册监听事件
    this.hooks.arch.tapPromise('react', (name) => {
      //因为是异步， 注册方法就不能使用tap了，转而使用tapAsync
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('react', name);
          resolve();  // 此处的cb是必须的，为了告诉后边的事件序列，“我完成了”
        }, 6000);
      })
    });
    this.hooks.arch.tapPromise('node', (name, cb) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('node', name);
          resolve();  // 此处的cb是必须的，为了告诉后边的事件序列，“我完成了”
        }, 1000);
      })
    });

    this.hooks.arch.tapPromise('vue', (name, cb) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('vue', name);
          resolve();  // 此处的cb是必须的，为了告诉后边的事件序列，“我完成了”
        }, 2000);
      })
    });
  }
  start() {
    this.hooks.arch.promise('ll').then(function() {
      //这里也就不能用call了，使用callAsync done事件
      console.log("end");
    });
  }
}

let l = new Lesson();
l.tap(); // 注册这两个事件
l.start(); // 启动钩子