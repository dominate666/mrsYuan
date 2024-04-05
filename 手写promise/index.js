// 手写promise-构造器的实现
// resolve不要写在实例方法上，一个函数的this是谁取决于函数的调用方式
{
  const PENDING = "pending";
  const FULFILLED = "fulfilled";
  const REJECTED = "rejected";
  class MyPromise {
    #state = PENDING;
    #result = undefined;
    #handlers = [];
    constructor(promiseExecutor) {
      const resolve = (data) => {
        this.#changeState(FULFILLED, data);
      };
      const reject = (reason) => {
        this.#changeState(REJECTED, reason);
      };
      //   只能捕获同步错误
      try {
        promiseExecutor(resolve, reject);
      } catch (error) {
        // 捕获promise抛出的错误（throw 123）
        reject(error);
      }
    }
    // resolve(){
    //     this 最后调用这个函数是在外部调用的，此时this是window，需要绑定this
    // }
    #changeState(state, result) {
      if (this.#state !== PENDING) return;
      this.#state = state;
      this.#result = result;
      this.#run();
    }
    #run() {
      if (this.#state === PENDING) return;
      while (this.#handlers.length) {
        const { onfulfilled, onrejected, resolve, reject } =
          this.#handlers.shift();
        if (this.#state === FULFILLED) {
          if (typeof onfulfilled === "function") {
            onfulfilled(this.#result);
          }
        } else {
          if (typeof onrejected === "function") {
            onrejected(this.#result);
          }
        }
      }
    }
    /**
     * 2个问题：
     *  1.onfulfilled和onrejected的调用时机
     *  2.promise什么时候是完成的，什么时候是拒绝的
     */
    then(onfulfilled, onrejected) {
      return new MyPromise((resolve, reject) => {
        this.#handlers.push({
          onfulfilled,
          onrejected,
          resolve,
          reject,
        });
        this.#run();
      });
    }
  }

  const p = new MyPromise((resolve, reject) => {
    /**
     * 4种情况
     * 1.resolve
     * 2.reject
     * 3.报错    throw 123;
     * 4.异步
     *     setTimeout(() => {
                throw 123;
            }, 0);
     */
    setTimeout(() => {
      reject(123);
    }, 1000);
  });
  p.then(
    (res) => {
      console.log("promise完成1", res);
    },
    (err) => {
      console.log("promise失败1", err);
    }
  );
  p.then(
    (res) => {
      console.log("promise完成2", res);
    },
    (err) => {
      console.log("promise失败2", err);
    }
  );
}

// then方法的实现
