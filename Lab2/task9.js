class Calculator {

    OperatorsMap = {
        "+": (a,b) =>  a + b,
        "-": (a,b) =>  a - b
    }

    calculate(str){
        let [a, op, b , ...rest] = str.split(' ')

        if (rest.length > 0)
            throw new Error("Wrong str format")
        
        if (!this.OperatorsMap[op])
            throw new Error("No such operator")
        else
            return this.OperatorsMap[op](Number(a),Number(b))
    }

    addMethod(name, func){
        this.OperatorsMap[name] = func
    }
}

let calc = new Calculator();
console.log(calc.calculate("3 + 7")); // 10

let powerCalc = new Calculator();
powerCalc.addMethod("*", (a, b) => a * b);
powerCalc.addMethod("/", (a, b) => a / b);
powerCalc.addMethod("**", (a, b) => a ** b);

for (op of ["**", "*", "/", "."]){
    let result = powerCalc.calculate("4 "+op+" 2");
    console.log(result); // 16 8 2 "No such operator"
}
