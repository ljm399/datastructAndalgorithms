import BSTree from './00_搜索二叉树bstree'
class AVLTreeNode<T> extends BSTree<T> {
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
        return num >= -1 && num <=1
    }
}
const avlt = new AVLTreeNode(10)
avlt.left = new AVLTreeNode(14)
avlt.left.left = new AVLTreeNode(15)
console.log(avlt.getHeight());
console.log(avlt.isBanlance());
console.log(avlt.left.left.getHeight());
console.log(avlt.left.isBanlance());// 这里求的是avlt.left.left.getHeight()而不是avlt.left

