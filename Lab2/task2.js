function convertCSVto2DArr(csv){
    return csv.trim().split('\n').map((row) => row.split(','))
}

const CSV = `
MEME, coolness
DOGE,10
troll face,5
`

console.log(convertCSVto2DArr(CSV));