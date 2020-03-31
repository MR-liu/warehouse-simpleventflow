class SyncBailHook{
  constructor(args) {
    this.args = args;
    this.tasks = [];
  }
  tap(name, task) {
    this.tasks.push(task)
  }
  call(...args) {
    args = args.slice(0, this.args.length);

    let i = 0, ret;

    do {
      ret = this.tasks[i++](...args)
    } while (!ret && i < this.tasks.length);
  }
}

export default SyncBailHook;