/**
 * 打乱数组顺序
 * @param {Array} array 要打乱的数组
 * @returns {Array} 打乱后的新数组
 */
export function shuffle(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * 递归搜索对象中的值
 * @param {Object} obj 要搜索的对象
 * @param {Function} predicate 谓词函数，接受一个值并返回布尔值
 * @returns {*} 找到的值，如果没找到返回undefined
 */
export function searchTree(obj, predicate) {
  if (typeof predicate !== 'function') {
    throw new TypeError('predicate must be a function');
  }

  // 检查当前值是否满足条件
  if (predicate(obj)) {
    return obj;
  }
  
  // 处理数组
  if (Array.isArray(obj)) {
    for (const item of obj) {
      const result = searchTree(item, predicate);
      if (result !== undefined) {
        return result;
      }
    }
  }
  
  // 处理对象
  if (obj !== null && typeof obj === 'object') {
    for (const value of Object.values(obj)) {
      const result = searchTree(value, predicate);
      if (result !== undefined) {
        return result;
      }
    }
  }
  
  return undefined;
}

/**
 * 数字千分位格式化
 * @param {number|string} num 要格式化的数字
 * @returns {string} 格式化后的字符串
 */
export function commafy(num) {
  if (num === null || num === undefined) return '';
  
  const str = num.toString();
  const parts = str.split('.');
  const integerPart = parts[0];
  const decimalPart = parts[1];
  
  // 正则表达式解析：虽然正则是从左向右匹配，但通过巧妙的设计实现了从右向左添加逗号
  // 1. \B: 匹配非单词边界。这确保不会在数字最开始添加逗号
  // 2. (?=pattern): 正向前瞻，匹配一个位置，这个位置后面的内容要匹配pattern
  // 3. (\d{3})+: 匹配一个或多个三位数字组
  // 4. (?!\d): 否定前瞻，确保这个位置后面没有更多数字
  //
  // 工作原理举例：对于数字 "123456789"
  // - 首先尝试匹配位置 1|23456789，不满足条件（后面不是完整的三位数字组）
  // - 然后尝试匹配位置 12|3456789，不满足条件
  // - 接着尝试位置 123|456789，满足条件（后面是两组三位数）
  // - 最后尝试位置 123456|789，满足条件（后面是一组三位数）
  // 最终结果：123,456,789
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
  return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
} 