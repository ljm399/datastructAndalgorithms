interface IComparator {
    (n1:number,n2:number):boolean
}
class Person {
    comparator:IComparator|null = null
    constructor(comparator:IComparator|null){
        this.comparator = comparator
    }       
}
const p1 = new Person((c1,c2)=>c1 === c2)
console.log(p1.comparator?.(1, 2))
console.log(p1.comparator?.(2, 1))
console.log(p1.comparator?.(1, 1))
export {}