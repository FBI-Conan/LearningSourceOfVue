/**
 * 用意返回对象obj中的str变量，且当str为a.b.c的形式时也可以准确返回
 * @param {object} obj 
 * @param {string} str 
 * @returns {any}
 */
export default function lookup(obj, str) {
  if(!str.includes(".")){
    return obj[str]
  } else {
    // 将每个.分隔的变量找出来
    const variateArr = str.split(".");
    // 创建一个接受每次循环得到的值
    let val = obj;
    variateArr.forEach(variate => {
      val = val[variate]
    });
    return val
  }
}