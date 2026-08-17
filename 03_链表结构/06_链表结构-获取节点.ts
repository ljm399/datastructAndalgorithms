// 封装两个类
// 第一个类：每个节点的类型
class node<T> {
    Next: node<T> | null = null

    value: T
    constructor(value: T) {
        this.value = value
    } // 也可以时用js语法，如下注释内容
    // constructor(public value:T) {}
}

// 第二个类：创建每个节点连接的类
class linkList<T> {
    head: node<T> | null = null 
    private size:number = 0 // 添加private，让外面访问不到，内部可以

    get length(){
        return this.size
    }

    // 追加节点（核心要创建个临时变量）
    append(value:T) {
        // 首先创建节点
        const newnode = new node(value) // 不用new node<T>(value) 因为ts会自动类型推断T是什么
        //详细解释：constructor(public value: T)；你传进去的 value 是 T，所以它就自动推出这个 node 的泛型参数也是 T。

        // 追加节点，引入临时变量
        if(!this.head) {
            this.head = newnode
        } else {
            let current =  this.head
            while(current.Next) {
                current = current.Next
            }
            current.Next = newnode
        }

        this.size++
    }

    // 遍历节点
    traverse() {
        const arr: T[] = []
        let current = this.head
        while(current) { // 不是current.next而是current，否则就少打印一个元素；因为前者时下一个节点存在，后者是当前元素
            arr.push(current.value)
            current = current.Next
        }
        console.log(arr.join("->")); 
    }

    // 插入节点
    inserted(element:T,position:number):boolean {
        const newNode = new node(element)
        // 边缘判断
        if(position<0 || position>this.size) return false

        // 插入头部节点
        if(position === 0) {
            newNode.Next = this.head
            this.head = newNode
        } else {
            // 随意位置插入节点
            let index = 0
            let current = this.head            
            let previous : node<T> | null = null // 这里没有复制就使用
            let newnode = new node(element)
            while(index++ < position && current) {
                previous = current
                current = current.Next
            }
            // 类型保护：此处 previous 确实存在
            if (previous === null) return false
            previous.Next = newnode
            newnode.Next = current
        }
        this.size++
        return true
    }

    // 删除节点
    removeat(position:number): T | null {
        // 1.边缘判断，不同于上面的插入节点，这里position>=this.size
        if(position<0 || position>=this.size) return null

        // 删除元素的值
        let deleteValue: T | null= null//=null的作用是防止赋值前使用变量

        // 2.删除节点
        if(position===0) { // 删除头节点
            deleteValue = this.head?.value ?? null
            this.head = this.head?.Next ?? null
        } else{ // 删除其他位置节点
            let index = 0
            let current = this.head
            let previous : node<T> | null = null
            while(index++<position && current) { //这个包括index=0吗，还是从index=1开始；从index=0开始
                previous = current
                current = current?.Next
            }
            previous!.Next = current?.Next ?? null // previous不会是null，所以让！强行使得编译通过
            deleteValue = current?.value ?? null
        }
        this.size--
        return deleteValue
    }

    // 获取某个位置的节点
    get(position:number):T | null {
        // 边缘判断
        if(position<0 || position>=this.size) return null

        let getValue : T | null = null
        let index = 0
        let current = this.head
        while(index++<position && current) { //这个包括index=0吗，还是从index=1开始；从index=0开始
            current = current?.Next
        }
        getValue = current?.value ?? null
        return getValue
    }
}

const node1 = new linkList<string>()
node1.append('cao')
node1.append('mjl')
node1.append('code')
node1.append('code2')

node1.inserted("newinserted",0)
node1.inserted("newinserted222",0)

node1.inserted("newinserted2newnew",3)
node1.inserted("newinserted2newnew22",7)

// console.log(node1.removeat(0));

console.log(node1.removeat(1));

console.log(node1.get(3),'node1.get(0)');


node1.traverse()


export {}   