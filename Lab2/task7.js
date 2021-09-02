let calculator = {
    read() {
        this.a = Number(prompt("Enter first value"))
        this.b = Number(prompt("Enter second value"))
    },

    sum() {
        return this.a + this.b
    },

    mul() {
        return this.a * this.b
    }
};

calculator.read();
alert(calculator.sum());
alert(calculator.mul());