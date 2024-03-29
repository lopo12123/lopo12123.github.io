const judge_check = (n) => {
    return Math.log2(n) % 1 === 0
}

const judge_bitwise = (n) => {
    return n & (n - 1) === 0
}

const CASES = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 2 ** 7 + 1, 2 ** 8 + 1, 2 ** 9 + 1 ]
const bench = (fn) => {
    performance.mark('start')
    for (let i = 0; i < 1_000_000; i++) {
        for (let j = 0; j < CASES.length; j++) {
            fn(CASES[j])
        }
    }
    performance.mark('end')
    performance.measure(fn.name, 'start', 'end')
    console.log(`${fn.name}: ${performance.getEntriesByName(fn.name)[0].duration}ms`)
    performance.clearMarks()
}

bench(judge_check)
bench(judge_bitwise)
// judge_check: 6.1921000480651855ms
// judge_bitwise: 43.538100242614746ms