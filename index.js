// 使用代理拦截动态属性
{
  //   一个对象的属性是动态的，代理
  const createProxy = (value = 0) => {
    const toPrimive = () => value;
    return new Proxy(
      {},
      {
        get(target, key) {
          if (key === Symbol.toPrimitive) {
            return toPrimive;
          }
          return createProxy(value + Number(key));
        },
      }
    );
  };
  /**
   * 分析
   * a:add[1] //1
   * b:a[2]   //1+2=3
   * c:b[3]   //3+3=6
   * 每个代理要对应到一个数字，add 0
   * 一个对象要和数字相加，涉及到对象转原始
   * 对象转原始:
   *          1.调用这个对象本身的add[Symbol.toPrimitive]()拿到原始值
   */
  let add = createProxy();
  let r1 = add[1][2][3] + 4; //10
  let r2 = add[100][200][300] + 400; //1000
  console.log(r1, r2);
}
