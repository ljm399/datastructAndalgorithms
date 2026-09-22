import treeNode, { bstree } from "./00_搜索二叉树bstree";
import AVLTreeNode from "./03_封装AVLTreeNode-右旋转操作和左选择操作";

class AVLTree<T> extends bstree<T> {
    // 删除节点调整信息主要在bstree里面

    protected createNode(value: T): treeNode<T> {
        return new AVLTreeNode(value)
    }


    protected checkBalance(treeNode: AVLTreeNode<T>,isAdd=true): void {
        let current = treeNode.parent
        while(current) {
            if(!current.isBanlance()) {
                this.rebalance(current)
                if(isAdd) break
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

        if(!resultNode?.parent) {
            this.root = resultNode
        }
    }
}
const Avlt = new AVLTree()
console.log('-------------');

const delArr = []
for(let i=1;i<=20;i++) {
    let random = Math.floor(Math.random()*200)
    Avlt.inserted(random)
    if(random % 2===0 && delArr.length<=8) {
        delArr.push(random)
    }
}
Avlt.print()
console.log(delArr);

for(let i of delArr) {
    Avlt.remove(i)
}
Avlt.print()

