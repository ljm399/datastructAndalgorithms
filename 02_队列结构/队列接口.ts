import ilist from '../types/线性表接口'
export default interface queue<T> extends ilist<T>{
    enqueue(element:T):void 
    dequeue(): T | undefined

}
