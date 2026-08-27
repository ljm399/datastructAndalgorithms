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