//Commands 1).node wcat.js filepath => displays the contents of a file in terminal
//Command 2). node wcat.js filepath1 filepath2 => displays the contents of all files in terminal
     //in concatinated form in given order

const fs = require("fs");
let inputarr = process.argv.slice(2);
//console.log(inputarr);

let filesarr = []
//placed files path in filesarr
for(let i = 0; i < inputarr.length; i++){
    filesarr.push(inputarr[i]);
}
console.log("Files to be read one" + filesarr);

//check if all the files are present
for(let i = 0; i < filesarr.length; i++){
    let doesExist = fs.existsSync(filesarr[i]);
    if(!doesExist){
        console.log("Files does not exist");
        //return;
        break;
    }
}
//content read and appending starts

let content = "";
for(let i = 0; i < filesarr.length; i++){
    let filecontent = fs.readFileSync(filesarr[i]);
    content += filecontent + "\n";
}
console.log(content);
