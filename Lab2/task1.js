const obj1 = {
    a: 1,
    b: 2
}

const obj2 = {
    s: 22,
    d: 12
}

const obj3 = {
    a: 12,
    b: 23
}

const obj4 = {
    a: 1,
    b: 2,
    c: 4
}

function compareProperties(obj1, obj2) {

    if (Object.keys(obj1).length !== Object.keys(obj2).length) {
        return false
    }

    for (const k in obj1) {
        if (obj1[k] !== obj2[k]) {
            return false;
        }
    }
    return true;
}

console.log(compareProperties(obj1, obj1)); // True
console.log(compareProperties(obj2, obj2)); // True
console.log(compareProperties(obj1, obj2)); // False
console.log(compareProperties(obj1, obj3)); // False
console.log(compareProperties(obj1, obj4)); // False
