import sequentSearch from "./01_算法-从头开始找"
import binarySearch from "./02_算法-二分法"

const MAXLENGTH = 100000
const nums = new Array(MAXLENGTH).fill(0).map((_,index)=>index)
const num = MAXLENGTH / 2

// 测试性能用performance
const startTime = performance.now()
const index = sequentSearch(nums,num)
const endTime = performance.now()
console.log("索引位置",index,'squentSearch消耗时间',(endTime-startTime));

const startTim = performance.now()
const index2 = binarySearch(nums,num)
const endTim = performance.now()
console.log("索引位置",index2,'消耗时间',(endTim-startTim));



