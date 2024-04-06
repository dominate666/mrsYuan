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
    #isPromiseLike(value) {
      return false;
    }
    #runMicroTask(func) {
      setTimeout(func, 0);
    }
    /**
     * 1.对应的回调不是函数
     * 2.回调是函数
     * 3.返回结果是promise
     */
    #runOne(callback, resolve, reject) {
      this.#runMicroTask(() => {
        if (typeof callback !== "function") {
          const settled = this.#state === FULFILLED ? resolve : reject;
          settled(this.#result);
          return;
        }
        try {
          const data = callback(this.#result);
          if (this.#isPromiseLike(data)) {
            data.then(resolve, reject);
          } else {
            resolve(data);
          }
        } catch (error) {
          reject(error);
        }
      });
    }
    #run() {
      if (this.#state === PENDING) return;
      while (this.#handlers.length) {
        const { onfulfilled, onrejected, resolve, reject } =
          this.#handlers.shift();
        if (this.#state === FULFILLED) {
          this.#runOne(onfulfilled, resolve, reject);
        } else {
          this.#runOne(onrejected, resolve, reject);
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
  p.then(null, (err) => {
    // console.log("promise失败1", err);
    return 456;
  }).then((data) => {
    // console.log("ok", data);
  });
}

// 手写promise.all
{
  /**
   * 1.静态函数
   * 2.有一个参数，不简单的是一个数组，是一个可迭代的对象
   * 3.返回值是一个promise
   *
   */
  Promise.myAll = function (proms) {
    let res, rej;
    let p = new Promise((resolve, reject) => {
      res = resolve;
      rej = reject;
    });
    let i = 0; // 统计promise的数量，不能直接用length（set->是size）
    let fulfilled = 0; // 是否全部完成
    let result = [];
    for (let prom of proms) {
      let index = i;
      i++;
      // 传入的不一定是promise([1,2,3])
      Promise.resolve(prom).then((data) => {
        // 1.把完成的数组汇总到最终结果
        result[index] = data;
        // 2.判定是否全部完成
        fulfilled++;
        if (fulfilled === i) {
          res(result);
        }
      }, rej);
    }
    if (i === 0) {
      res([]);
    }
    return p;
  };
  Promise.myAll([1, 2, 3, Promise.resolve(456)]).then(
    (res) => {
      console.log(res);
    },
    (err) => {
      console.log("err", err);
    }
  );
}
