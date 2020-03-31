//start.js(原生的异步钩子)
// let { AsyncParallelHook } = require('tapable');
let { AsyncParallelHook } = require('../lib/AsyncParallelHookPromise');

// 异步的钩子
// 同时发送多个请求
// 注册方法分为tap和tapAsync（同步和异步）


// 这里3个时间同时触发了 等到3个事件都完成了 才触发done时间
// 异步并发

// tap库中3种注册方法 tap 同步注册
// tapAsync 异步注册
// tapPromise 异步Promise注册

// 对应事件触发
// call
// callAsync
// promise


// AsyncParallelBailHook
// 在promise情况下 只要有一个是reject 就无法执行promise.all
// 这时候就变成一个带保险的异步并发钩子

class Lesson {
  constructor() {
    this.index = 0;
    this.hooks = {
      arch: new AsyncParallelHook(['name']) //此处的“name”,只是为了方便开发者阅读，语义化
    };
  }
  tap() {
    //注册监听事件
    this.hooks.arch.tapPromise('react', (name) => {
      //因为是异步， 注册方法就不能使用tap了，转而使用tapAsync
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('react', name);
          // reject() 这时候就出现end情况下的error 模拟出AsyncParallelBailHook的效果
          reject();  // 此处的cb是必须的，为了告诉后边的事件序列，“我完成了”
        }, 1000);
      })
    });
    this.hooks.arch.tapPromise('node', (name) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('node', name);
          resolve();  // 此处的cb是必须的，为了告诉后边的事件序列，“我完成了”
        }, 2000);
      })
    });

    this.hooks.arch.tapPromise('vue', (name) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('vue', name);
          resolve();  // 此处的cb是必须的，为了告诉后边的事件序列，“我完成了”
        }, 3000);
      })
    });
  }
  start() {
    this.hooks.arch.promise('ll').then(function() {
      //这里也就不能用call了，使用callAsync done事件
      console.log("end");
    }, () => {
      console.log('error')
    });
  }
}

let l = new Lesson();
l.tap(); // 注册这两个事件
l.start(); // 启动钩子