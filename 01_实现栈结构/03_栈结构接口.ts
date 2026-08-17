// 数组栈和链表栈对外暴露的方法是一致的，但底层存储和实现细节不同，
// 因此更适合使用接口来约束统一的行为规范，再由不同的类分别实现。
// 这样既能保证 API 一致，又能保留各自实现的灵活性。
// 如果使用继承，通常适用于多个实现之间存在明确的公共代码复用；
// 而这里只是“功能约定相同”，不一定有合适的公共父类实现。
import ilist from '../types/线性表接口'
interface stack<T> extends ilist<T>{ // 是interface 而不是class
    push(element:T): void  // 接口没有{}
    pop(): void 
    // peek(): T | undefined // 这里是接口，所以函数体里面没有return，那T|undefined则不能写，怎么办
    // isEmpty() : boolean
    // size(): number
}
export default stack