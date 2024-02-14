const wave_wave = (n) => {
    return ~~n
}

const shift1 = (n) => {
    return n >> 0
}

const shift2 = (n) => {
    return n << 0
}

const bit_or = (n) => {
    return n | 0
}

const math_floor = (n) => {
    return Math.floor(n)
}

const CASES = [ 3.14, 10.28, 11.11, 3.33333, 1.010101, 0.0000001 ]

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

bench(wave_wave)
bench(shift1)
bench(shift2)
bench(bit_or)
bench(math_floor)
// wave_wave: 4.019800186157227ms
// shift1: 35.5169997215271ms
// shift2: 31.15059995651245ms
// bit_or: 31.71410036087036ms
// math_floor: 35.86259984970093ms