/**
 * 并发请求
 * @param {string[]} urls  待请求的url数组
 * @return {number} maxNum  最大并发数
 * urls:[A,B,C，D,E]
 * results[A的结果，B的结果，C的结果]
 * 一个请求完成了，后面的请求补位,所有的请求结束，Promise请求结束
 */

function concurRequest(urls, maxNum) {
  if (urls.length === 0) {
    return Promise.resolve([]);
  }
  return new Promise((resolve) => {
    let result = []; // 保存所有请求的结果
    let index = 0; //指向下一次请求的url对应的下标
    let count = 0; // 当前完成的请求的数量
    async function _request() {
      let i = index;
      let url = urls[index];
      index++;

      try {
        const resp = await fetch(url);
        result[i] = resp;
      } catch (error) {
        result[i] = error;
      } finally {
        count++;
        if (count === urls.length) {
          resolve(result);
        }
        if (index < urls.length) {
          _request();
        }
      }
      //   console.log(result);
    }
    for (let i = 0; i < Math.min(urls.length, maxNum); i++) {
      _request();
    }
  });
}
