class SyncLoopHook{
  constructor(args) {
    this.args = args;
    this.tasks = [];
  }
  tap(name, task) {
    this.tasks.push(task)
  }
  call(...args) {
    console.log(this.tasks, args)
    this.tasks.forEach(fn => {
      let ret;
      do {
        ret = fn(...args)
      } while (ret != undefined);
    })
  }
}

module.exports = { SyncLoopHook };