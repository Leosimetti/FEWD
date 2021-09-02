function convertObj2CSV(obj) {
    return obj.map(subarr => subarr.join(',')).join('\n')
}

const obj = [
    ['MEME', ' coolness'],
    ['DOGE', '10'],
    ['troll face', '5']
]

console.log(convertObj2CSV(obj));