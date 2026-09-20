import BSTree from './00_搜索二叉树bstree'
import {btPrint} from 'hy-algokit'
export default class AVLTreeNode<T> extends BSTree<T> {
    left: AVLTreeNode<T> | null = null
    right: AVLTreeNode<T> | null = null
    parent: AVLTreeNode<T> | null = null

    height:number = 1

    getHeight():number {
        const leftHeight = this.left ? this.left.getHeight() : 0
        const rightHeight = this.right ? this.right.getHeight() : 0 
        return Math.max(leftHeight,rightHeight) + 1
    }

    private getBalanceFactor():number {
        const leftHeight = this.left ? this.left.getHeight() : 0
        const rightHeight = this.right ? this.right.getHeight() : 0 
        return leftHeight - rightHeight
    }
    
    isBanlance():boolean {
        const num = this.getBalanceFactor()
        // return num >= -1 && num <=1 
        // 或
        return Math.abs(num) <= 1
    }

    // 拿到当前节点更高子节点
    heightChild():AVLTreeNode<T> | null {
        const leftHeight = this.left ? this.left.getHeight() : 0
        const rightHeight = this.right ? this.right.getHeight() : 0 
        if(leftHeight>rightHeight) return this.left
        if(leftHeight<rightHeight) return this.right

        // 未成文的规矩：要是到这一步则当前节点是左节点则返回其左节点，右子节点同理
        return this.isLeft ? this.left : this.right
    }

    // 右旋转（明确下面4条思路就知道）：处理left left
    rightRotation():AVLTreeNode<T> | null {
        const isLeft = this.isLeft
        const isRight = this.isRigtht

        // 1.处理pivot（枢/轴）
        const pivot = this.left!// 左边都不平衡了，所以左边一定存在
        pivot.parent = this.parent// 为什么this是root，不一定是root，第4步有区分；那为什么是this,因为处理核心就是先拿到不平衡点在处理，然后不平衡就是从pivot.parnet出发

        // 2.处理pivot的右子节点
        this.left = pivot.right
        if(pivot.right) {
            pivot.right.parent = this
        }


        // 3.处理this，即root或pivot.parent
        pivot.right = this
        this.parent = pivot


        // 4.pivot挂载在哪
        if(!pivot.parent) {//要是是整棵树的根节点
            return pivot
        }else if(isLeft) {//要是节点的左子树
            pivot.parent.left = pivot
        } 
        else if(isRight) {// 要是右子树
            pivot.parent.right = pivot
        }
        return pivot
    }

    // 左旋转：处理right right --- 对应代码要配合图片来看，可以问ai让其生产给你
    leftRotation():AVLTreeNode<T> | null {
        const isleft = this.isLeft
        const isRight = this.isRigtht
        // 1.处理pivot
        const pivot = this.right!
        pivot.parent = this.parent

        // 2.处理pivot的左子节点
        this.right = pivot.left
        if(pivot.left) {
            pivot.left.parent = this
        }

        // 3.处理root（this）-- 处理谁就把谁放到等式右边
        pivot.left = this
        this.parent = pivot

        // 4.pivot挂载
        if(!pivot.parent) {
            return pivot
        }else if(isleft) {
            pivot.parent.left = pivot
        }else if(isRight){
            pivot.parent.right = pivot
        }
        return pivot
    }

}

// 测试右旋转（处理left left情况）
// const avlt = new AVLTreeNode(10)
// avlt.left = new AVLTreeNode(14)
// avlt.left.parent = avlt
// avlt.left.left = new AVLTreeNode(15)
// avlt.left.left.parent = avlt.left

// const avltPrt = new AVLTreeNode(9)
// avltPrt.right = avlt
// avlt.parent = avltPrt

// btPrint(avltPrt)

// avlt.rightRotation()
// btPrint(avltPrt)

// 测试左旋转（right right）
const avlt = new AVLTreeNode(10)
avlt.right = new AVLTreeNode(14)
avlt.right.parent = avlt
avlt.right.right = new AVLTreeNode(15)
avlt.right.right.parent = avlt.right

const avltPrt = new AVLTreeNode(9)
avltPrt.right = avlt
avlt.parent = avltPrt

btPrint(avltPrt)

avlt.leftRotation()
btPrint(avltPrt)