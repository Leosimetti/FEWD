function getRandomHex(){
    return "#" + parseInt(Math.random()*16**6).toString(16)
}

console.log(getRandomHex());