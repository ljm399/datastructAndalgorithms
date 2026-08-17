// 因为栈和队列都有共同方法，所以使用接口的继承就行
export default interface ilist<T> {
    peek(): T | undefined // 这个也可以叫front，返回第一个元素，栈是最后一个
    get size(): number
    isempty():boolean
}