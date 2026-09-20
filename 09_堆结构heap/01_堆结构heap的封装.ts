class Heap<T>{
    data:T[] = []
    private length = 0

    private swap(i:number,i2:number) {
        const temp = this.data[i]
        this.data[i] = this.data[i2]
        this.data[i2] = temp
    }

}

export {}