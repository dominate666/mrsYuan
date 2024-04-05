/**
 * 函数.apply(x,[y,z])===x.函数(y,z)=>x调用了函数，那么函数中的this就是x
apply的作用就是以x作为this指向，[y,z]作为参数传给函数
 */
// console.log.call.call.call.call.call.call
// let m = function.prototype.call.apply((a) => a, [1, 2])
const fn = (a) => a;
fn.call(1, 2); // fn(2)
console.log(m);
