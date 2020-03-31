class AsyncParallelHook{
  constructor(...args) {
    this.args = args;
    this.tasks = [];
  }
  tapAsync(name, task){
    this.tasks.push(task)
  }
  callAsync(...args) {
    const finnally = args.pop(); // 把最后要执行的先取出来
    let index = 0;

    const done = () => {
      index++
      if (index == this.tasks.length) {
        finnally();
      }
    }

    this.tasks.forEach(task => {
      task(...args, done)
    })
  }
}

export default AsyncParallelHook;