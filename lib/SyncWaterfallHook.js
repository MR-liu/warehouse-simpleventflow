class SyncWaterfallHook{
  constructor(args) {
    this.args = args;
    this.tasks = [];
  }
  tap(name, task) {
    this.tasks.push(task)
  }
  call(...args) {
    args = args.slice(0, this.args.length);

    const [first, ...others] = this.tasks;

    others.reduce((prams, fn) => {
      return fn(prams)
    }, first(...args));
  }
}

module.exports = { SyncWaterfallHook };