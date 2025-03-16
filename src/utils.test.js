import { describe, it, expect } from 'vitest';
import { shuffle, searchTree, commafy } from './utils.js';

describe('shuffle', () => {
  it('应该返回一个新数组', () => {
    const original = [1, 2, 3, 4, 5];
    const shuffled = shuffle(original);
    console.log('shuffled 1: ', shuffled);
    expect(shuffled).not.toBe(original);
    expect(shuffled).toHaveLength(original.length);
  });

  it('应该包含原数组的所有元素', () => {
    const original = [1, 2, 3, 4, 5];
    const shuffled = shuffle(original);
    console.log('shuffled 2: ', shuffled);
    expect(shuffled.sort()).toEqual(original.sort());
  });
});

describe('searchTree', () => {
  it('应该找到满足条件的值', () => {
    const obj = { a: 1, b: { c: 2, d: { e: 3 } }, f: [4, 5] };
    const result = searchTree(obj, value => value === 3);
    expect(result).toBe(3);
  });

  it('当没有值满足条件时应该返回undefined', () => {
    const obj = { a: 1, b: { c: 2 } };
    const result = searchTree(obj, value => value > 10);
    expect(result).toBeUndefined();
  });

  it('应该能搜索数组中的值', () => {
    const arr = [1, [2, 3], { a: 4 }];
    const result = searchTree(arr, value => value === 4);
    expect(result).toBe(4);
  });

  it('应该抛出类型错误当predicate不是函数时', () => {
    const obj = { a: 1 };
    expect(() => searchTree(obj, 'not a function')).toThrow(TypeError);
    expect(() => searchTree(obj, 123)).toThrow(TypeError);
  });

  it('应该能处理复杂的搜索条件', () => {
    const obj = {
      users: [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' }
      ]
    };
    const result = searchTree(obj, value => 
      value && typeof value === 'object' && value.name === 'Bob'
    );
    expect(result).toEqual({ id: 2, name: 'Bob' });
  });
});

describe('commafy', () => {
  it('应该正确格式化整数', () => {
    expect(commafy(1234)).toBe('1,234');
    expect(commafy(1234567)).toBe('1,234,567');
    expect(commafy(123)).toBe('123');
  });

  it('应该正确格式化小数', () => {
    expect(commafy(1234.56)).toBe('1,234.56');
    expect(commafy(1234567.89)).toBe('1,234,567.89');
  });

  it('应该处理边界情况', () => {
    expect(commafy(0)).toBe('0');
    expect(commafy('')).toBe('');
    expect(commafy(null)).toBe('');
    expect(commafy(undefined)).toBe('');
  });
}); 