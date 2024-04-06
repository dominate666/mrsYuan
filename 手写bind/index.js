function fn(a, b, c, d) {
  console.log(a, b, c, d);
  console.log("this", this);
  return 123;
}

/* let newfn = fn.bind("ctx", 1, 2);
console.log(new newfn(3, 4)); */

Function.prototype.myBind = function (ctx, ...args) {
  let fn = this;
  return function (...subArgs) {
    const allArgs = [...args, ...subArgs];
    if (new.target) {
      return new fn(...allArgs);
    }
    return fn.apply(ctx, allArgs);
  };
};
let newfn = fn.myBind("ctx", 1, 2);
console.log(new newfn(3, 4));
