//start.js(原生的异步钩子)
// let { AsyncParallelHook } = require('tapable');
let { AsyncParallelHook } = require('../lib/AsyncParallelHook');

// 异步的钩子
// 同时发送多个请求
// 注册方法分为tap和tapAsync（同步和异步）


// 这里3个时间同时触发了 等到3个事件都完成了 才触发done时间
// 异步并发
class Lesson {
  constructor() {
    this.index = 0;
    this.hooks = {
      arch: new AsyncParallelHook(['name']) //此处的“name”,只是为了方便开发者阅读，语义化
    };
  }
  tap() {
    //注册监听事件
    this.hooks.arch.tapAsync('react', (name, cb) => {
      //因为是异步， 注册方法就不能使用tap了，转而使用tapAsync
      setTimeout(() => {
        console.log('react', name);
        cb();  // 此处的cb是必须的，为了告诉后边的事件序列，“我完成了”
      }, 1000);
    });
    this.hooks.arch.tapAsync('node', (name, cb) => {
      setTimeout(() => {
        console.log('node', name);
        cb();  // 如果某个异步没有执行cb，那么永远不会执行后边的end
      }, 1000);
    });

    this.hooks.arch.tapAsync('vue', (name, cb) => {
      setTimeout(() => {
        console.log('vue', name);
        cb();  // 如果某个异步没有执行cb，那么永远不会执行后边的end
      }, 2000);
    });
  }
  start() {
    this.hooks.arch.callAsync('ll', function() {
      //这里也就不能用call了，使用callAsync done事件
      console.log("end");
    });
  }
}

let l = new Lesson();
l.tap(); // 注册这两个事件
l.start(); // 启动钩子