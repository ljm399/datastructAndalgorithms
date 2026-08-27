import {Node} from "../types/树接口";

import { btPrint } from "hy-algokit"

class treeNode<T> extends Node<T> {
    left: treeNode<T> | null = null
    right: treeNode<T> | null = null
}

class bstree<T> {
    private root:treeNode<T> | null = null
    
    // 由于root是私有的，在外面无法访问，所以在类里面访问就行了
    print() {
        btPrint(this.root)
    }

    // 插入
    inserted(value:T) {
        // const newNode = value 
        const newNode = new treeNode(value)
        if(!this.root) {
            this.root = newNode // 这里报错：不能将类型“T”分配给类型“treeNode<T> | null”。原因是你前面const newNode = value 错了
        } else {
            this.insertNode(this.root, newNode)    
        }
    }
    private insertNode(rNode:treeNode<T>, newNode:treeNode<T>) {
        // 插入左边
        if(newNode.value <= rNode.value) {
            if (!rNode.left?.value) {
                rNode.left = newNode
            }else {
                this.insertNode(rNode.left, newNode)
            }
        } else { // 插入右边
            if (!rNode.right?.value) {
                rNode.right = newNode
            }else {
                this.insertNode(rNode.right, newNode)
            }
        }
    }

    // 遍历
    // 先序遍历
    // 问题：preOrderTraverse这个方法需要个参数来递归，但这个方法是外部调用，然后传入的参数是root，这个root是私有的，外界无法访问
    // 解决：定义私有函数，然后再这个函数递归就行
    preOrderTraverse() {
        this.preOrderTraverseNode(this.root)
    }
    private preOrderTraverseNode(node:treeNode<T> | null) {
        if(node) {
            console.log(node.value);
            this.preOrderTraverseNode(node.left)
            this.preOrderTraverseNode(node.right)
        }
    }

    // 中序遍历
    inOrderTraverse() {
        this.inOrderTraverseNode(this.root)
    }
    private inOrderTraverseNode(node:treeNode<T> | null) {
        if(node) {
            this.inOrderTraverseNode(node.left)
            console.log(node.value);
            this.inOrderTraverseNode(node.right)
        }
    }

    // 后序遍历
    lastOrderTraverse() {
        this.lastOrderTraverseNode(this.root)
    }
    private lastOrderTraverseNode(node:treeNode<T> | null) {
        if(node) {
            this.lastOrderTraverseNode(node.left)
            this.lastOrderTraverseNode(node.right)
            console.log(node.value);
        }
    }

    // 层序遍历（使用队列）
    levelOrderTraverse() {
        const queueArr: treeNode<T>[] =  []
        if(this.root) {
            queueArr.push(this.root)
        }
        while(queueArr.length!==0) {
            const current = queueArr.shift()
            console.log(current?.value);
            
            // 将当前节点的左子树放入队列
            if(current?.left) {
                queueArr.push(current.left)
            }

            // 将当前节点的右子树放入队列
            if(current?.right) {
                queueArr.push(current.right)
            }
        }
    }


    // 获取最大值
    getMax(): T | null {
        let node = this.root
        while(node && node.right) {
            node = node.right
        }
        return node?.value ?? null
    }

    // 获取最小值
    getMin(): T | null {
        let node = this.root
        while(node && node.left) {
            node = node.left
        }
        return node?.value ?? null
    }

    // 搜索
    search(value:T):boolean {
        let node = this.root
        while(node) {
            if(node.value === value) return true
            if(node.value > value) {
                node = node.left
            } else {
                node = node.right
            }
        }
        return false
    }

    // 删除叶子节点
    remove(value:T): boolean {
        // 1. 先判断该二叉树里面是否有这个值
        let node = this.root
        let parent:treeNode<T> | null = null
        while(node) {
            if(node.value === value) break
            if(node.value > value) {
                parent = node
                node = node.left
            } else {
                parent = node
                node = node.right
            }    
        }

        // 2.通过上面的while循环，说明里面有对应的值
        // 由于是叶子节点，还要判断当前节点是否有左右子节点
        if(node?.left ===null && node?.right ===null) {
            // 3.通过上面的if判断，说明这是叶子节点
            // 3.1先判断这个是不是root
            if (node === this.root) {
                this.root = null
                return true
            }

            // 3.2 不是root，则通过其父节点设置为null来删除，但要先判断这个node是左，还是右，然后才能parent.left/right = null来删除
            // 问题：怎么判断这个node是左还是右呢
            if(parent?.left === node) {
                parent.left = null
                return true
            }

            if(parent?.right === node) {
                parent.right = null
                return true
            }
        }
        return false
    }
}

const hybt = new bstree()
hybt.inserted(12)
hybt.inserted(10)
hybt.inserted(11)
hybt.inserted(13)
hybt.inserted(14)
hybt.inserted(9)
hybt.inserted(8)
hybt.inserted(15)

hybt.print()
// 遍历 
// hybt.preOrderTraverse()
// hybt.inOrderTraverse()
// hybt.lastOrderTraverse()
// hybt.levelOrderTraverse()

// 最值
// console.log(hybt.getMax());
// console.log(hybt.getMin());

// 搜索
// console.log(hybt.search(10));
// console.log(hybt.search(14));
// console.log(hybt.search(17));
// console.log(hybt.search(6));

// 删除
console.log(hybt.remove(15));
console.log(hybt.remove(9));
console.log(hybt.remove(11));
