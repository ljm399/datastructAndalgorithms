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
// hybt.preOrderTraverse()
// hybt.inOrderTraverse()
// hybt.lastOrderTraverse()
// hybt.levelOrderTraverse()
console.log(hybt.getMax());
console.log(hybt.getMin());
