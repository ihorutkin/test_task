const colors = require('colors')

const fs = require('fs');

const fileContent = fs.readFileSync(process.argv[2], "utf-8");

// Getting first string with number of discs and stacks

const str1 = fs.readFileSync(process.argv[2], "utf-8")
const firstStr = str1.split('\n')[0]
let firstStrArr = []
firstStrArr = firstStr.split('')
firstStrArr.push('\n')

// _________________________________________________________

let numOfStack = 0    // variable for getting number of stacks
let numOfDiscs = 0    // variable for getting number of discs

numOfStack = Number(firstStrArr[2])    // getting number of stacks
numOfDiscs = Number(firstStrArr[0])    // getting number of discs

let arrFromInput = []                  // array for data from input file
let arrFromHannoiTower = []            // array for our data from hanoi tower function
let str = ''                           // variable for addind our strings to array

arrFromInput = Array.from(fileContent)    // getting data from input file

// Cleaning the array of string from \n and \r

if((arrFromInput.join('')).indexOf('\n') !== -1){
    arrFromInput = arrFromInput.join('').split('\n')
}

if((arrFromInput.join('')).indexOf('\r') !== -1){
    arrFromInput = arrFromInput.join('').split('\r')
}

// ________________________________________________________

arrFromInput.shift()

// Hanoi Tower function

if(numOfStack === 3){                                      // hanoi tower functions 3
    function hanoiTower3(n, fromRoad, toRoad, usingRoad){
        str = `${n} 3`
        if(n === 1){
            str = `${fromRoad} ${toRoad}\n`
            arrFromHannoiTower.push(str)
            return
        }
        hanoiTower3(n-1, fromRoad, usingRoad, toRoad)
        str = `${fromRoad} ${toRoad}\n`
        arrFromHannoiTower.push(str)
        hanoiTower3(n-1, usingRoad, toRoad, fromRoad)
    }
    
    hanoiTower3(numOfDiscs, '1', '3', '2')
}
else if(numOfStack === 4){                                 // hanoi tower functions 4
    function hanoiTower4(n, fromRoad, usingRoad1, usingRoad2, toRoad) {
        if (n === 1) {
            str = `${fromRoad} ${toRoad}\n`
            arrFromHannoiTower.push(str)
            return;
        }
        
        hanoiTower4(n - 2, fromRoad, toRoad, usingRoad2, usingRoad1);
        str = `${fromRoad} ${usingRoad2}\n`
        arrFromHannoiTower.push(str)
        str = `${fromRoad} ${toRoad}\n`
        arrFromHannoiTower.push(str)
        str = `${usingRoad2} ${toRoad}\n`
        arrFromHannoiTower.push(str)
        hanoiTower4(n - 2, usingRoad1, fromRoad, usingRoad2, toRoad);
      }
      
      hanoiTower4(numOfDiscs, '1', '2', '3', '4');
}

// ________________________________________________________________

// Work with output array

arrFromHannoiTower = arrFromHannoiTower.join('').split('\n')             // eliminate all of commas, transform string to array 
arrFromHannoiTower.pop()                                               // eliminate the last element of our array '\n'
// let arrFromHannoiTower1 = firstStrArr.concat(arrFromHannoiTower)

// ___________________________________________________________________

// Checking moves for correctnes

const isEqual = JSON.stringify(arrFromInput) === JSON.stringify(arrFromHannoiTower)

isEqual ? console.log(colors.bgGreen.black('Your moves are correct, you win')) : console.log(colors.bgRed.black('Your moves are not correct, you lose'))

// ________________________________________________________