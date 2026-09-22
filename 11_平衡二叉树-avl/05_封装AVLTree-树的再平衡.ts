import { bstree } from "./00_搜索二叉树bstree";
import AVLTreeNode from "./03_封装AVLTreeNode-右旋转操作和左选择操作";

class AVLTree<T> extends bstree<T> {
    // 问题：为什么这里不用super呢
    // 当你要子类里面调用父类里面的方法时才用super

    // 然后去找到不平衡的节点？ 先不管
    
    // 假设已经找到了，那么我们如何让这个节点变得平衡
    /**
     * 根据不平衡的节点的情况（LL/RR/LR/RL)让子树平衡
     * @param root 找到的不平衡的节点
     */
    // ai解释这个root是什么
    rebalance(root:AVLTreeNode<T>){ // 不需要:AVLTreeNode<T> | null
        const pivot = root.heightChild()!
        const current = pivot.heightChild()

        let resultNode:AVLTreeNode<T>|null = null
        if(pivot.isLeft) {
            if(current?.isLeft) { // l l
                resultNode = root.rightRotation()
            } else { // l r
                pivot.leftRotation()
                resultNode = root.rightRotation()
            }
        } else {
            if(current?.isRigtht) { // r r
                resultNode = root.leftRotation()
            } else { // r l
                pivot.rightRotation()
                resultNode = root.leftRotation()
            }
        }

        // 问题：旋转时要时root不存在怎么办
        if(!resultNode?.parent) {
            this.root = resultNode
        }
    }
}
const Avlt = new AVLTree()
Avlt.inserted(10)
Avlt.inserted(12)
Avlt.inserted(14)
Avlt.inserted(5)
Avlt.inserted(7)
Avlt.print()