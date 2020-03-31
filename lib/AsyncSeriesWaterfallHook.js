class AsyncSeriesWaterfallHook{
  constructor(...args) {
    this.args = args;
    this.tasks = [];
  }
  tapAsync(name, task) {
    this.tasks.push(task)
  }
  callAsync(...args){
    const finallycb = args.pop();
    let index = 0;
    const next = (err, data) => {
      let task = this.tasks[index];
      if (!task) {
        return finallycb(...args)
      }
      if (index === 0) {
        task(...args, next)
      } else {
        task(data, next)
      }
      index++
    }
    next()
  }
}

module.exports = { AsyncSeriesWaterfallHook };