const toggle = (n) => {
    return n === 0 ? 1 : 0
}

const bitwise_toggle = (n) => {
    return n ^ 1
}

const bench = (fn) => {
    performance.mark('start')
    let num = 0;
    for (let i = 0; i < 1_000_000; i++) {
        num = fn(num)
    }
    performance.mark('end')
    performance.measure(fn.name, 'start', 'end')
    console.log(`${fn.name}: ${performance.getEntriesByName(fn.name)[0].duration}ms`)
    performance.clearMarks()
}

bench(toggle)
bench(bitwise_toggle)
// toggle: 1.700000286102295ms
// bitwise_toggle: 4.515900135040283ms