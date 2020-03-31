class AsyncParallelHook{
  constructor(...args) {
    this.args = args;
    this.tasks = [];
  }
  tapPromise(name, task){
    this.tasks.push(task)
  }
  promise(...args) {
    const tasks = this.tasks.map(task => task(...args))
    return Promise.all(tasks);
  }
}

module.exports = { AsyncParallelHook }