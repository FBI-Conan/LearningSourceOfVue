/**
 * 弱化版的h函数，考虑的情况较少，为以下三种情况：
 *  h(sel, data, text)
 *  h(sel, data, [])
 *  h(sel, data, h())
 */
import { vnode } from "./vnode";

export default function (sel, data, c) {
	if (arguments.length !== 3) {
		throw Error("该版本的h函数必须传入3个参数！");
	}
	switch (typeof c) {
		case "string":
		case "number":
			return vnode(sel, data, undefined, c, undefined);

		case "object":
			if (Array.isArray(c)) {
				const children = [];
				for (let child of c) {
					if (typeof child !== "object" || !child.hasOwnProperty("sel")) {
						throw Error("第三个数组参数的某项中不是虚拟节点对象！");
					}
					children.push(child);
				}
				return vnode(sel, data, children, undefined, undefined);
			} else if (c.hasOwnProperty("sel")) {
				return vnode(sel, data, [c], undefined, undefined);
			} else {
				throw Error("第3个参数必须为虚拟节点对象！");
			}
		default:
			throw Error("传入参数的类型错误！");
	}
}
