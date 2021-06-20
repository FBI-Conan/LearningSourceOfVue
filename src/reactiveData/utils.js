/**
 * @method def 创建一个是否可枚举的对象属性
 * @param obj 对象
 * @param key 属性
 * @param value 值
 * @param enumerable 是否可被枚举
 */
export const def = function (obj, key, value, enumerable) {
	Object.defineProperty(obj, key, {
		value,
		enumerable,
		writable: true,
		configurable: true,
	});
};
