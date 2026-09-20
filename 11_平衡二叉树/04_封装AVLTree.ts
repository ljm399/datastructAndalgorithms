import { bstree } from "./00_搜索二叉树bstree";
class AVLTree<T> extends bstree<T> {}
const Avlt = new AVLTree()
Avlt.inserted(10)
Avlt.inserted(12)
Avlt.inserted(14)
Avlt.inserted(5)
Avlt.inserted(7)
Avlt.print()