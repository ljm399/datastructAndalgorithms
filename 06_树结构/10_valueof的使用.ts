class Person {
    constructor(public name:string,public price:number){}    
    valueOf(){
        return this.price
    }
}
const p1 = new Person('cao',520)
const p2 = new Person('li',521)
console.log(p1>p2);
console.log(p1<p2);
console.log(p1===p2);
export {}