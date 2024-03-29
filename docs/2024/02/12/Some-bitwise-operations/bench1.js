const cases = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]

const math_pow = (n) => {
    return Math.pow(2, n)
}

const starstar = (n) => {
    return 2 ** n
}

const bitwise_shift = (n) => {
    return 1 << n
}

const bench = (fn) => {
    performance.mark('start')
    for (let i = 0; i < 1_000_000; i++) {
        cases.forEach(fn)
    }
    performance.mark('end')
    performance.measure(fn.name, 'start', 'end')
    console.log(`${fn.name}: ${performance.getEntriesByName(fn.name)[0].duration}ms`)
    performance.clearMarks()
}

bench(math_pow)
bench(starstar)
bench(bitwise_shift)
// math_pow: 626.2185997962952ms
// starstar: 624.5796999931335ms
// bitwise_shift: 45.28470039367676ms