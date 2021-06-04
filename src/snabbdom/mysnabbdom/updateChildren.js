import patchVnode from "./patchVnode";
import createElement from "./createElement";
// 判断是否是同一个虚拟节点
function checkSameVnode(a, b) {
	return a.sel === b.sel && a.key === b.key;
}

export default function updateChildren(parentEl, oldCh, newCh) {
	// 旧前
	let oldStartIdx = 0;
	// 新前
	let newStartIdx = 0;
	// 旧后
	let oldEndIdx = oldCh.length - 1;
	// 新后
	let newEndIdx = newCh.length - 1;
	// 旧前节点
	let oldStartVnode = oldCh[oldStartIdx];
	// 旧后节点
	let oldEndVnode = oldCh[oldEndIdx];
	// 新前节点
	let newStartVnode = newCh[newStartIdx];
	// 新后节点
	let newEndVnode = newCh[newEndIdx];

	let keyMap = null;

	while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
		if (oldStartVnode === undefined) {
			oldStartVnode = oldCh[++oldStartIdx];
			continue;
		} else if (oldEndVnode === undefined) {
			oldEndVnode = oldCh[--oldEndIdx];
			continue;
		}
		// 旧前与新前
		if (checkSameVnode(oldStartVnode, newStartVnode)) {
			console.log("命中①");
			patchVnode(oldStartVnode, newStartVnode);
			oldStartVnode = oldCh[++oldStartIdx];
			newStartVnode = newCh[++newStartIdx];
		} else if (checkSameVnode(oldEndVnode, newEndVnode)) {
			// 旧后与新后
			console.log("命中②");
			patchVnode(oldEndVnode, newEndVnode);
			oldEndVnode = oldCh[--oldEndIdx];
			newEndVnode = newCh[--newEndIdx];
		} else if (checkSameVnode(oldStartVnode, newEndVnode)) {
			// 旧前与新后(移动新后指向的节点到旧后后面)
			console.log("命中③");
			patchVnode(oldStartVnode, newEndVnode);
			// insertBefore会将oldStartVnode.elm对应的节点移动到oldEndVnode.elm后面，不用先removeChild
			parentEl.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling);
			oldStartVnode = oldCh[++oldStartIdx];
			newEndVnode = newCh[--newEndIdx];
		} else if (checkSameVnode(oldEndVnode, newStartVnode)) {
			// 旧后和新前(移动旧后指向的节点到旧前前面)
			console.log("命中④");
			patchVnode(oldEndVnode, newStartVnode);
			parentEl.insertBefore(oldEndVnode.elm, oldStartVnode.elm);
			oldEndVnode = oldCh[--oldEndIdx];
			newStartVnode = newCh[++newStartIdx];
		} else {
			// 四种命中都没有命中
			// 制作key的map，这样旧不用每次都遍历老对象了
			if (!keyMap) {
				keyMap = {};
				for (let i = oldStartIdx; i <= oldEndIdx; i++) {
					const key = oldCh[i].key;
					if (key != undefined) {
						keyMap[key] = i;
					}
				}
			}
			console.log(keyMap);
			// 寻找当前这项(newStartIdx)这项在keyMap中的映射的位置序号
			const idxInOld = keyMap[newStartVnode.key];
			console.log(idxInOld);
			// 判断
			if (idxInOld === undefined) {
				// 如果idxInOld是undefined表示它是全新的项
				parentEl.insertBefore(createElement(newStartVnode), oldStartVnode.elm);
			} else {
				// 如果不是undefined，不是全新的项，而是要移动
				const elmToMove = oldCh[idxInOld];
				patchVnode(elmToMove, newStartVnode);
				// 把这项设置为undefined
				oldCh[idxInOld] = undefined;
				// 移动到旧前之前
				parentEl.insertBefore(elmToMove.elm, oldStartVnode.elm);
			}
			// 指针下移
			newStartVnode = newCh[++newStartIdx];
		}
	}
	// 循环结束后剩余节点的处理
	if (oldStartIdx <= oldEndIdx) {
		// 删除处理
		for (let i = oldStartIdx; i <= oldEndIdx; i++) {
			if (oldCh[i]) {
				parentEl.removeChild(oldCh[i].elm);
			}
		}
	} else if (newStartIdx <= newEndIdx) {
		// 新增处理
		// 插入的标杆（精彩）
		debugger;
		const before = newCh[newEndIdx + 1] && newCh[newEndIdx + 1].elm;
		for (let i = newStartIdx; i <= newEndIdx; i++) {
			const newEl = createElement(newCh[i]);
			// 当insertBefore的第二个参数为undefined时，相当于appendChild
			parentEl.insertBefore(newEl, before);
		}
	}
}
