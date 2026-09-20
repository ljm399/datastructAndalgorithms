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

    // 因为btPrint需要value，但是你这里先用了data保存数据，所以要设置个value混淆过去就行
    get value() {
        return this.data
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

        // 删除叶子节点
        if(current?.left ===null && current?.right ===null) {
            // 3.通过上面的if判断，说明这是叶子节点
            // 3.1先判断这个是不是root
            if (current === this.root) {
                this.root = null
                return true
            }

            // 3.2 不是root，则通过其父节点设置为null来删除，但要先判断这个node是左，还是右，然后才能parent.left/right = null来删除
            // 问题：怎么判断这个node是左还是右呢
            if(current.isLeft) {
                current.parent!.left = null
                return true
            }

            if(current.isRigtht) {
                current.parent!.right = null
                return true
            }
        }

        // 删除节点-只有一个子节点
        // 只有左子节点
        if(current.right === null) {
            if(current===this.root) {
                this.root = current.left
            } 
            else if(current.isLeft) {
                current.parent!.left = current.left
            }else if(current.isRigtht) {
                current.parent!.right = current.left               
            }
        }
        // 只有右子节点
        if(current.left === null) {
            if(current===this.root) {
                this.root = current.right
            } 
            else if(current.isLeft) {
                current.parent!.left = current.right
            }else if(current.isRigtht) {
                current.parent!.right = current.right               
            }
        }

        // 前面每个if判断都要return true或false，太模仿，自己想看成功与否，自己打印结果看看
        return true
    }

    // 重构删除叶子节点代码和搜索代码
    // 这段代码有逻辑问题，导致remove冲突导致parent不对
    // private searchnode(value: T):treeNode<T> | null {
    //     let current = this.root
    //     while(current) {
    //         if(current.value === value) return current
    //         if(current.value > value) {
                // 问题原因
                // 就是你这里是A.p=A,这是错的
                // 应该是B.p = A
                // 解决办法：
                //  写下所有逻辑，然后瞪眼出来
                //  就是那一个变量记录parent
    //             current.parent = current
    //             current = current.left
    //         } else {
    //             current.parent = current
    //             current = current.right
    //         }
    //     }
    //     return null
    // }
    // 修复和优化代码
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

// 删除叶子节点
// console.log(hybt.remove(15));
// console.log(hybt.remove(9));
// console.log(hybt.remove(11));

// 删除节点-只有一个子节点
hybt.remove(9)
hybt.remove(14)

hybt.print()


