/**
 * 发出请求，返回promise
 * @param {string} url 请求地址
 * @param {number} maxCount 最大重试次数
 */

function request(url, maxCount = 5) {
  return fetch(url).catch((err) =>
    maxCount <= 0 ? Promise.reject(err) : request(url, maxCount - 1)
  );
}
// let url = "http://my-json-server.typicode.com/typicode/demo/profile";
let url = "http://my-json-server.assdfg.com/typicode/demo/profile";
request(url)
  .then((res) => {
    console.log(res);
  })
  .catch((error) => {
    console.log(error, "错误");
  });
