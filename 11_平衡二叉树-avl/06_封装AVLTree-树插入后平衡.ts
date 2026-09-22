import treeNode, { bstree } from "./00_搜索二叉树bstree";
import AVLTreeNode from "./03_封装AVLTreeNode-右旋转操作和左选择操作";

class AVLTree<T> extends bstree<T> {
    // 插入后平衡
    // 问题：为什么这里不用super呢
    // 当你要子类里面调用父类里面的方法时才用super

    // 问题1：插入时的新类不是AVLTreeNode而是bstnode
    // 解决：重构父类里面的createNode（设计模式：
    protected createNode(value: T): treeNode<T> { // 这里返回的treeNode但实际时AVLTreeNode不会有问题：当父子类型不同，子类可以赋值给父类，但父类不可以赋值给子类
        return new AVLTreeNode(value)
    }

    // 问题2：无论时AVLTree还是红黑树都需要用到parent，但bstree类里面没有用到parent，导致旋转时parent的缺失（已解决：bstree父类里面的inserted)


    // 问题3：插入后怎么自动化调用rebalance呢
    protected checkBalance(treeNode: AVLTreeNode<T>): void {
        let current = treeNode.parent
        while(current) {
            if(!current.isBanlance()) {
                this.rebalance(current)
            }
            current = current.parent
        }
    }

    /**
     * 根据不平衡的节点的情况（LL/RR/LR/RL)让子树平衡
     * @param root 找到的不平衡的节点
     */
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
console.log('-------------');

for(let i=1;i<=20;i++) {
    Avlt.inserted(Math.floor(Math.random()*200))
}
Avlt.print()