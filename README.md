# JavaScript 实用函数库

这个项目包含了一些常用的 JavaScript 工具函数，并使用 Vitest 进行单元测试。

## 功能函数

1. `shuffle(array)`: 随机打乱数组顺序
2. `searchTree(obj, predicate)`: 递归搜索对象中满足条件的值
3. `commafy(num)`: 数字千分位格式化（使用正则表达式实现）
4. `commafy2(num)`: 数字千分位格式化（基础字符串操作实现）

## 安装

```bash
pnpm install
```

## 运行测试

```bash
pnpm test
```

## 测试覆盖率报告

```bash
pnpm test:coverage
```

## 使用示例

```javascript
import { shuffle, searchTree, commafy, commafy2 } from './src/utils.js';

// 打乱数组
const arr = [1, 2, 3, 4, 5];
console.log(shuffle(arr)); // [3, 1, 5, 2, 4]（随机顺序）

// 搜索对象中满足条件的值
const obj = { 
  users: [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
  ]
};
console.log(searchTree(obj, value => value?.name === 'Bob')); // { id: 2, name: 'Bob' }

// 数字格式化（两种实现方式）
console.log(commafy(1234567.89));  // "1,234,567.89"
console.log(commafy2(1234567.89)); // "1,234,567.89"
```

## 实现说明

### commafy vs commafy2

- `commafy`: 使用正则表达式实现，代码更简洁，性能在大多数场景下较好
- `commafy2`: 使用基础字符串操作实现，更直观易懂，不依赖正则表达式 