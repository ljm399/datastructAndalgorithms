// 
function convert(s: string, numRows: number): string {
    if(numRows===1 || numRows>=s.length) {
        return s
    }

    const arr = new Array<String>(numRows).fill('')
    let direction = 1
    let currentRow = 0
    for(let char of s) {
        arr[currentRow] +=char
        if(currentRow === 0) {
            direction = 1 // 让其不断向下，直到currentRow为numRows-1
        } else if(currentRow === numRows-1) {
            direction = -1 // 让其不断向上，直到currentRow为0
        }
        currentRow += direction
    }
    return arr.join('')
};
export {}

console.log(convert('ABC',2));
