class SyncHook{
  constructor(args) {
    this.args = args;
    this.tasks = [];
  }
  tap(name, task) {
    this.tasks.push(task)
  }
  call(...args) {
    this.tasks.forEach(task => task(...args))
  }
}

module.exports = { SyncHook };