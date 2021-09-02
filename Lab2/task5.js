function rand(min, max) {
    return min + Math.round(Math.random()*(max-min))
}


for (let index = 0; index < 10; index++) {
    console.log(rand(1, 10));    
}