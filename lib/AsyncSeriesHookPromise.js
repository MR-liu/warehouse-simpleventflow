class AsyncSeriesHook {
  constructor(...args){
    this.args = args;
    this.tasks = [];
  }
  tapPromise(name, task) {
    this.tasks.push(task);
  }
  promise(...args) {
    const [first, ...others] = this.tasks;

    return others.reduce((p, n) => {
      return p.then(() => n(...args), () => ( console.log('error')))
    }, first(...args))
  }
}

module.exports = { AsyncSeriesHook }