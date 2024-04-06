function method(a, b) {
  console.log("args", a, b);
  console.log("this", this);
}

// method.call(1, 2, 3);

Function.prototype.myCall = function (ctx, ...args) {
  /**
   * 3种情况
   * 1.null
   * 2.undefined
   * 3.{}
   */
  ctx = ctx === null || ctx === undefined ? globalThis : Object(ctx);
  const key = Symbol();
  //   ctx[key] = this;
  Object.defineProperty(ctx, key, {
    value: this,
    enumerable: false,
  });
  const r = ctx[key](...args);
  delete ctx[key];
  return r;
};

method.myCall(
  {
    fn() {},
  },
  2,
  3
);
