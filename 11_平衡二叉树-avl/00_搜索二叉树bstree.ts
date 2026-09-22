import {Node} from "../types/平衡二叉树接口-和树接口区分";
import {btPrint} from "hy-algokit"

export default class treeNode<T> extends Node<T> {
    left: treeNode<T> | null = null
    right: treeNode<T> | null = null

    parent: treeNode<T> | null = null
    
    get isLeft ():boolean{
        return !!(this.parent && this.parent.left === this) 
    }

    get isRigtht():boolean{
        return !!(this.parent && this.parent.right === this) 
    } 
}

export class bstree<T> {
    protected root:treeNode<T> | null = null
    
    // 由于root是私有的，在外面无法访问，所以在类里面访问就行了
    print() {
        btPrint(this.root)
    }

    protected createNode(value:T):treeNode<T> {
        return new treeNode(value)
    }

    protected checkBalance(node:treeNode<T>,isAdd=true) {
    } // 这个就是设计模板，只是为了让父类调用子类方法不报错

    // 插入
    inserted(value:T) {
        // const newNode = value 
        const newNode = this.createNode(value)
        if(!this.root) {
            this.root = newNode 
        } else {
            this.insertNode(this.root, newNode)    
        }
        this.checkBalance(newNode)
    }

    private insertNode(rNode:treeNode<T>, newNode:treeNode<T>) { //rNode是rootNode的意思
        // 插入左边
        if(newNode.value <= rNode.value) {
            if (!rNode.left) {
                rNode.left = newNode
                newNode.parent = rNode
            }else {
                this.insertNode(rNode.left, newNode)
            }
        } else { // 插入右边
            if (!rNode.right) {
                rNode.right = newNode
                newNode.parent = rNode
            }else {
                this.insertNode(rNode.right, newNode)
            }
        }
    }

    // 遍历
    // 先序遍历
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


    // 删除节点的调整
    // 首先明确remove的目的
    // 1.删除节点
    //      明确删除节点parent指向问题
    //      删除有两个节点的节点要重构：直接删除节点.value = 后继节点.value

    // 2.删除后再平衡
    remove(value:T): boolean {
        // 获取当前的节点
        let current = this.searchnode(value) 
        if(!current) { return false}
        let replaceNode:treeNode<T> | null = null
        if(current?.left ===null && current?.right ===null) {
            replaceNode = null // 问题：要是为叶子节点则下面三条条件判断会出现null.parent则报错
            // 解决：下面三条判断都加了if(replaceNode)  
        }


        else if(current.right === null) {
            replaceNode = current.left
        }
        else if(current.left === null) {
            replaceNode = current.right
        }

        // 删除有两个子节点
        else {
            const successor = this.getSuccessor(current)!
            current.value = successor!.value
            this.checkBalance(successor,false)
            return true
        }


        if(current===this.root) {
            this.root = replaceNode
            if(replaceNode) replaceNode.parent = null//不能是this.root,因为此时 this.root === replaceNode，会导致根节点的 parent 指向自己。根节点的 parent 必须是 null。
        } 
        else if(current.isLeft) {
            current!.parent!.left = replaceNode
            if(replaceNode)  replaceNode.parent = current.parent
        }
        else if(current.isRigtht) {
            current!.parent!.right = replaceNode
            if(replaceNode)  replaceNode.parent = current.parent
        }

        // this.checkBalance(replaceNode) // 问题this.checkBalance(replaceNode)的replaceNode可能为null，因为要是current为root
        // 解决：下面代码
        this.checkBalance(current,false)// 问题：要是为current则 replaceNode!.parent = current.parent中父节点都没有指向current了
        // 解决：但是current.parent有值
        return true

    }

    // 搜索传入值的节点
    private searchnode(value: T): treeNode<T> | null {
        let current = this.root
        let parent: treeNode<T> | null = null

        while (current) {
            if (current.value === value) {
                current.parent = parent
                return current
            }

            parent = current
            current = current.value > value ? current.left : current.right
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

        // 重构改动了什么，你对照之前没改动的代码就知道
        
        // successor!.left = delNode.left 

        // 将删除节点的右边接到后继节点的右边
        if(successor !== delNode.right) {
            successor!.parent!.left = successor!.right
            if(successor!.right) successor!.right!.parent = successor!.parent
            // successor!.right = delNode.right 
        } 
        else{
            // if(successor!.right) {
            //     successor!.parent!.right = successor!.right
            //     if(successor!.right) successor!.right.parent = successor!.parent
            // }
            // successor!.parent!.right = null
            // 优化
            delNode.right = successor!.right
            if(successor!.right) {
                successor!.right.parent = delNode
            }
            
        }

        return successor
    }
}