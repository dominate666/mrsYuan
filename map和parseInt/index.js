let arr = ["1", "2", "3"].map(parseInt);
console.log(arr);
/**
 * map回调函数有3个参数
 * 1.item,index,数组本身
 * 2.进制范围2-36(10个数字+26个字母)
 * parseInt第2个参数有3种取值情况
 *         1.无效的进制范围：NaN
 *         2.0，undefined，没传使用的进制是自动，自动看第一个参数的格式
 *           (1)0x:16进制
 *           (2)0:(es5之前)8进制/10进制  先用8进制转换，在用10进制转换,
 *                (es5之后)全部表示10进制转换
 *           (3)10进制
 */
console.log(parseInt("1", 0));
console.log(parseInt("2", 1));
console.log(parseInt("3", 2));
console.log(018); //18,不是一个有效的8进制，会转换成10进制
console.log(017); //15 是一个有效的8进制
