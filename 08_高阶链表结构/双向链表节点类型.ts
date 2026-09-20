class Node<T>{
    Next:Node<T>|null = null
    value:T
    constructor(value:T) {
        this.value = value
    }
}

export class doubleNode<T> extends Node<T>{
    prev:doubleNode<T>|null = null
    Next:doubleNode<T>|null = null
}