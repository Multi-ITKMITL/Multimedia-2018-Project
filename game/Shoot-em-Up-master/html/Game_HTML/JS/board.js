// function main() {
//     input();
//     sort();
//     updateBoard();
//
//     // var txt = loadStrings("../DATA/board.txt");
//     // console.log(txt);
// };
//
// function updateBoard() {
//     theName_1.innerHTML = board[0].name;
//     theName_2.innerHTML = board[1].name;
//     theName_3.innerHTML = board[2].name;
//     theName_4.innerHTML = board[3].name;
//     theName_5.innerHTML = board[4].name;
//     theName_6.innerHTML = board[5].name;
//     theName_7.innerHTML = board[6].name;
//     theName_8.innerHTML = board[7].name;
//     theName_9.innerHTML = board[8].name;
//     theName_10.innerHTML = board[9].name;
//
//     thePoint_1.innerHTML = board[0].point;
//     thePoint_2.innerHTML = board[1].point;
//     thePoint_3.innerHTML = board[2].point;
//     thePoint_4.innerHTML = board[3].point;
//     thePoint_5.innerHTML = board[4].point;
//     thePoint_6.innerHTML = board[5].point;
//     thePoint_7.innerHTML = board[6].point;
//     thePoint_8.innerHTML = board[7].point;
//     thePoint_9.innerHTML = board[8].point;
//     thePoint_10.innerHTML = board[9].point;
// };
//
// function sort() {
//     for (var i = 0; i < 10; ++i) {
//         if (board[i].point < board[i+1].point) {
//
//             var savePointChange = board[i].point;
//             board[i].point = board[i+1].point;
//             board[i+1].point = savePointChange;
//
//             var saveNameChange = board[i].name;
//             board[i].name = board[i+1].name;
//             board[i+1].name = saveNameChange;
//             i = -1;
//         }
//     };
// }
//
// function input() {
//     var nameFormHTML = prompt("Please enter your name:", );
//     board[9].name = name;
//     var pointFormHTML = prompt("Please enter your point:", );
//     board[9].point = point;
// }
// main();






// var nameFormHTML = prompt("Please enter your name:", );
// var pointFormHTML = prompt("Please enter your point:", );

let nameInput = "test_re";
let pointInput = 99999;

// let nameInput = "test_550";
// let pointInput = 550;


let fs = require('fs');
let data = fs.readFileSync('date.json');
let board = JSON.parse(data);

board[10]["name"] = nameInput;
board[10]["point"] = pointInput;

for (let i = 0; i < 10; ++i) {
    if (board[i].point < board[i+1].point) {

        let savePointChange = board[i].point;
        board[i].point = board[i+1].point;
        board[i+1].point = savePointChange;

        let saveNameChange = board[i].name;
        board[i].name = board[i+1].name;
        board[i+1].name = saveNameChange;
        i = -1;
    }
}

let saveData = JSON.stringify(board, null, 2);
fs.writeFile('date.json', saveData, finish);

function finish() {
    // let data = fs.readFileSync('date.json');
    // let board = JSON.parse(data);

    // theName_1.innerHTML = board[0].name;
    // theName_2.innerHTML = board[1].name;
    // theName_3.innerHTML = board[2].name;
    // theName_4.innerHTML = board[3].name;
    // theName_5.innerHTML = board[4].name;
    // theName_6.innerHTML = board[5].name;
    // theName_7.innerHTML = board[6].name;
    // theName_8.innerHTML = board[7].name;
    // theName_9.innerHTML = board[8].name;
    // theName_10.innerHTML = board[9].name;
    //
    // thePoint_1.innerHTML = board[0].point;
    // thePoint_2.innerHTML = board[1].point;
    // thePoint_3.innerHTML = board[2].point;
    // thePoint_4.innerHTML = board[3].point;
    // thePoint_5.innerHTML = board[4].point;
    // thePoint_6.innerHTML = board[5].point;
    // thePoint_7.innerHTML = board[6].point;
    // thePoint_8.innerHTML = board[7].point;
    // thePoint_9.innerHTML = board[8].point;
    // thePoint_10.innerHTML = board[9].point;
    console.log("--- finished ---");
}
