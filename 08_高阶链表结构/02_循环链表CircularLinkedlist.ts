import linkedlist from './01-高阶链表结构LinkedList'
class CircularLinkedlist<T> extends linkedlist<T> {
    // 什么时候要在子类再补充，不大幅度修改父类方法时用
    // 比如父类单链表时用不到tail属性的，所以父类使用tail属性时都要放在if判断里面或者在子类里面实现
    append(value: T): void {
        super.append(value)
        this.tail!.Next = this.head
    }

    inserted(element: T, position: number): boolean {
        let isTrue = super.inserted(element,position)
        this.tail!.Next = this.head // 要是只有一个节点就
        return isTrue
    }

    removeat(position: number): T | null {
        const node = super.removeat(position) 
        this.tail!.Next = this.head
        return node
    }
}
const node1 = new CircularLinkedlist<string>()
node1.append('cao')
node1.append('mjl')
node1.append('code')
node1.append('code2')
node1.traverse()

console.log("insert--------");
node1.inserted("newinserted2",0)
node1.traverse()
node1.inserted("newinserted2newnew22",4)
node1.traverse()
node1.inserted("ANANNANAN",6)
node1.traverse()


console.log("remove---------");
console.log(node1.removeat(0));
node1.traverse()
console.log(node1.removeat(1));
node1.traverse()
console.log(node1.removeat(4));
node1.traverse()

// console.log("get---------");
// console.log(node1.get(0),'node1.get(0)');
// node1.traverse()

// console.log("---update---");
// node1.update('caomzs',2)
// node1.update('caomzsya',0)
// node1.traverse()

console.log("----indexof----");
console.log(node1.indexof("caomzs"));
console.log(node1.indexof("cao"));
console.log(node1.indexof("code2"));
console.log(node1.indexof("code"));

// console.log("----remove---");
// console.log(node1.remove('caoa'));
// node1.traverse()
// console.log(node1.remove('caomzs'));
// node1.traverse()

// console.log("---empty----");
// console.log(node1.isempty());
// node1.traverse()

// console.log(node1.removeat(1));
// node1.traverse()
// console.log(node1.removeat(0));
// console.log(node1.removeat(0));
// console.log(node1.removeat(0));
// console.log(node1.removeat(0));
// console.log(node1.isempty());
// node1.traverse()

export {}  