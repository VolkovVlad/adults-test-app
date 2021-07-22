export interface Task<T> {
  fn: () => unknown;
  resolve: (value: T | PromiseLike<T>) => void;
  reject: () => void;
}

export class Queue<A = unknown> {
  private isRunning = false;
  private queue: Task<A>[] = [];

  add<T extends A>(fn: () => Promise<T> | T): Promise<A> {
    return new Promise<A>((resolve, reject) => {
      this.pushQueue({fn, resolve, reject});
    });
  }

  private pushQueue(task: Task<A>) {
    this.queue.push(task);
    if (!this.isRunning) {
      this.run();
    }
  }

  private run() {
    if (this.isRunning || !this.queue.length) return;
    this.isRunning = true;

    const {fn, resolve, reject} = this.queue.shift();
    try {
      const result = fn();

      if (result instanceof Promise) {
        result.then(result => this.emit(result, resolve)).catch(err => this.emit(err, reject));
      } else {
        this.emit(result, resolve);
      }
    } catch (err) {
      this.emit(err, reject)
    }

  }

  private emit(result: unknown, resolve: Function) {
    resolve(result);
    this.isRunning = false;
    this.run();
  }

  static wrapWithQueue<T extends Object>(source: T, queue: Queue = new Queue()): T {
    return new Proxy<T>(source, {
      get(target, key) {
        if (typeof target[key] === 'function') {
          return (...args) => queue.add(() => target[key](...args));
        }

        return target[key];
      }
    });
  }
}

