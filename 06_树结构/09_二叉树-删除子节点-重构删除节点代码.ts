import {Node} from "../types/树接口";

import { btPrint } from "hy-algokit"

class treeNode<T> extends Node<T> {
    left: treeNode<T> | null = null
    right: treeNode<T> | null = null

    parent: treeNode<T> | null = null
    
    get isLeft ():boolean{
        return !!(this.parent && this.parent.left === this) 
    }

    get isRigtht():boolean{
        return !!(this.parent && this.parent.right === this) 
    }

    get value() {
        return ''
    }
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
        const current = this.searchnode(value)
        return !!current
    }


    remove(value:T): boolean {
        // 获取当前的节点
        let current = this.searchnode(value)
        if(!current) { return false}

        let replaceNode:treeNode<T> | null = null
        if(current?.left ===null && current?.right ===null) {
            replaceNode = null
        }
        else if(current.right === null) {
            replaceNode = current.left
        }
        else if(current.left === null) {
            replaceNode = current.right
        }
        else {
            const successor = this.getSuccessor(current)
            replaceNode = successor
        }


        if(current===this.root) {
            this.root = replaceNode
        } 
        else if(current.isLeft) {
            current!.parent!.left = replaceNode
        }
        else if(current.isRigtht) {
            current!.parent!.right = replaceNode
        }
        return true
    }

    // 搜索传入值的节点
    private searchnode(value: T): treeNode<T> | null {
        let current = this.root
        let parent: treeNode<T> | null = null

        while (current) {
            if (current.data === value) {
                current.parent = parent
                return current
            }

            parent = current
            current = current.data > value ? current.left : current.right
        }

        return null
    }

    // 拿到后继节点-作用删除有两个子节点的节点
    private getSuccessor(delNode:treeNode<T>):treeNode<T> |null{
        let current = delNode.right
        let successor : treeNode<T> | null = null
        while(current) {
            successor = current
            current = current.left
            if(current) {
                current.parent = successor
            }
        }

        // 疑问：做完问ai：后继节点的右子树直接充当后继节点父节点的左子树，不会出现该右子树大于父节点吗
        // 解答：不会因为后继节点是其父节点的左子树，所以该后继节点整棵树包括右子树都小于其父节点

        // 将删除节点的左边接到后继节点的左边
        successor!.left = delNode.left

        // 将删除节点的右边接到后继节点的右边
        if(successor !== delNode.right) {
            successor!.parent!.left = successor!.right
            successor!.right = delNode.right
        }

        return successor
    }
}

const hybt = new bstree()
hybt.inserted(12)
hybt.inserted(10)
hybt.inserted(11)
hybt.inserted(13)
hybt.inserted(14)
hybt.inserted(12)
hybt.inserted(9)
hybt.inserted(8)
hybt.inserted(16)
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

// 删除叶子节点
console.log(hybt.remove(15));
console.log(hybt.remove(9));
console.log(hybt.remove(11));

// 删除节点-只有一个子节点

hybt.remove(14)

// 删除两个节点的节点
hybt.print()
hybt.remove(12)
// hybt.remove(10)
// hybt.remove(13)
hybt.print()

