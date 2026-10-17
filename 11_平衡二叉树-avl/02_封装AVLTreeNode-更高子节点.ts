import BSTree from './00_搜索二叉树bstree'
class AVLTreeNode<T> extends BSTree<T> {
    left: AVLTreeNode<T> | null = null
    right: AVLTreeNode<T> | null = null
    parent: AVLTreeNode<T> | null = null

    height:number = 1

    getHeight():number {
        const leftHeight = this.left ? this.left.getHeight() : 0
        const rightHeight = this.right ? this.right.getHeight() : 0 
        return Math.max(leftHeight,rightHeight) + 1//递归是去询问左右子树各自有多高；拿到左右子树高度后，**当前节点不管有没有子节点，都要给自己这一层 + 1**。
        // 没有子节点的时候，左右高度都是 0，+1 就是自己这一层；有子节点，拿到子树的高度，再加当前自己这一层
        // 所以只要执行了this.getHeigth就会+1，不就达到了计算高度的目的
        // 你的目的就是获取高度吗
    }

    private getBalanceFactor():number {
        const leftHeight = this.left ? this.left.getHeight() : 0
        const rightHeight = this.right ? this.right.getHeight() : 0 
        return leftHeight - rightHeight
    }
    
    isBanlance():boolean {
        const num = this.getBalanceFactor()
        return num >= -1 && num <=1
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
}
const avlt = new AVLTreeNode(10)
avlt.left = new AVLTreeNode(14)
avlt.left.left = new AVLTreeNode(15)

console.log(avlt.heightChild());
console.log(avlt.left.heightChild());
console.log(avlt.left.left.heightChild());


