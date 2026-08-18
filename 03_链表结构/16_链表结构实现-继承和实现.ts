import linkedlist from "./16_链表实现-链表接口"
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
class linkList<T> implements linkedlist<T>{
    head: node<T> | null = null 
    private length:number = 0 // 添加private，让外面访问不到，内部可以

    get size(){
        return this.length
    }

    private getNodePosition(position:number):node<T> | null {
        let index = 0
        let current = this.head
        while(index++<position && current) { //这个包括index=0吗，还是从index=1开始；从index=0开始
            current = current?.Next
        }
        return current
    }

    peek():T|undefined {
        return this.head?.value
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

        this.length++
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
        if(position<0 || position>this.length) return false

        // 插入头部节点
        if(position === 0) {
            newNode.Next = this.head
            this.head = newNode
        } else {
            // 随意位置插入节点
            // let index = 0
            // let current = this.head            
            // let previous : node<T> | null = null // 这里没有复制就使用
            // let newnode = new node(element)
            // while(index++ < position && current) {
            //     previous = current
            //     current = current.Next
            // }

            // 重构
            const previous = this.getNodePosition(position-1)

            // 类型保护：此处 previous 确实存在
            if (previous === null) return false // 这里不需要，因为previous绝对不可能是null
            newNode.Next = previous?.Next ?? null // 这里需要？？null是因为previous要是为null，则previous?.Next为undefined，则会导致报错，所以？？null意思是当previous?.Next为undefined时，则转为null
            previous.Next = newNode
        }
        this.length++
        return true
    }

    // 删除节点
    removeat(position:number): T | null {
        // 1.边缘判断，不同于上面的插入节点，这里position>=this.length
        if(position<0 || position>=this.length) return null

        // 删除元素的值
        let deleteValue: T | null= null//=null的作用是防止赋值前使用变量

        // 2.删除节点
        if(position===0) { // 删除头节点
            deleteValue = this.head?.value ?? null
            this.head = this.head?.Next ?? null
        } else{ // 删除其他位置节点
            const previous = this.getNodePosition(position-1)


            deleteValue = previous?.Next?.value ?? null
            previous!.Next = previous?.Next?.Next ?? null // previous不会是null，所以让！强行使得编译通过
        }
        this.length--
        console.log(this.length,'this.length');
        
        return deleteValue
    }

    // 通过输入元素删除
    remove(element:T): boolean{
        const index = this.indexof(element)
        if(index === -1) return false
        this.removeat(index)
        return true
    }


    // 获取某个位置的节点
    get(position:number):T | null {
        // 边缘判断
        if(position<0 || position>=this.length) return null

        let getValue : T | null = null

        getValue = this.getNodePosition(position)?.value ?? null
        return getValue
    }

    // 更新节点
    update(element:T,position:number):boolean {
        // 边缘判断
        if(position<0 || position>=this.length) return false

        const current = this.getNodePosition(position)
        current!.value = element
        return true
    }

    //获取元素索引位置
    indexof(element:T):number {
        let current = this.head
        let index = 0
        while(current) {
            if(current.value === element) {
                return index
            }
            index++
            current = current.Next
        }
        return -1
    }

    isempty():boolean {
        return this.length === 0
    }
}
