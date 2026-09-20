import ilist from "../types/线性表接口"
export default interface linkedlist<T> extends ilist<T> {
    append(value:T):void
    traverse():void
    inserted(element:T,position:number):boolean
    remove(element:T): boolean
    get(position:number):T | null
    update(element:T,position:number):boolean
    indexof(element:T):number 
}