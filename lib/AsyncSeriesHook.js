class AsyncSeriesHook {
  constructor(...args){
    this.args = args;
    this.tasks = [];
  }
  tapAsync(name, task) {
    this.tasks.push(task);
  }
  callAsync(...args) {
    const finnly = args.pop(); // 先把最后一个取出来
    let index = 0;
    const next = () => {// 递归传递下一个执行
      if (index === this.tasks.length) {
        return finnly()
      }
      const task = this.tasks[index++]
      task(...args, next)
    }
    next();
  }
}

export default AsyncSeriesHook;