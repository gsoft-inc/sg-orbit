function sum(a, b) {
    return a + b;
}

class SumService {
    current = 0;

    add(value) {
        this.current += value;
    }

    getTotal() {
        return this.current;
    }
}

test("adds 1 + 2 to equal 3", () => {
    const service = new SumService();

    service.add(5);
    service.add(3);

    expect(service.getTotal()).toBe(8);
});
