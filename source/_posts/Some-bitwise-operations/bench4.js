const judge_if = (x, y) => {
    return x > 0 && y > 0 || x < 0 && y < 0;
}

const judge_bitwise = (x, y) => {
    return (x ^ y) >= 0;
}

const CASES = [ [ 1, 1 ], [ 1, -1 ], [ -1, 1 ], [ -1, -1 ] ]
const bench = (fn) => {
    performance.mark('start')
    for (let i = 0; i < 1_000_000; i++) {
        for (let j = 0; j < CASES.length; j++) {
            fn(...CASES[j])
        }
    }
    performance.mark('end')
    performance.measure(fn.name, 'start', 'end')
    console.log(`${fn.name}: ${performance.getEntriesByName(fn.name)[0].duration}ms`)
    performance.clearMarks()
}

bench(judge_if)
bench(judge_bitwise)
// judge_if: 36.61649990081787ms
// judge_bitwise: 36.661499977111816ms