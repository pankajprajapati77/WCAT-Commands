//Commands 1) node wcat.js filepath => displays the contents of a file in terminal
//Command 2) node wcat.js filepath1 filepath2 => displays the contents of all files in terminal
//in concatinated form in given order
//Command 3) node wcat.js -s filepath1 or node wcat.js filepath1 filepath2 => removes the extra line 
//space and leave only single line space   

const fs = require("fs");
let inputarr = process.argv.slice(2);
//console.log(inputarr);

let filesarr = [];
let optionsarr = [];
//===============>placed files path in filesarr<==================
for(let i = 0; i < inputarr.length; i++){
    let firstchar = inputarr[i].charAt(0);
    if(firstchar == "-"){
        optionsarr.push(inputarr[i]);
    }
     else{
        filesarr.push(inputarr[i]);
}
}

//console.log("Files to be read one" + filesarr);

//===============>check if all the files are present<===============
for(let i = 0; i < filesarr.length; i++){
    let doesExist = fs.existsSync(filesarr[i]);
    if(!doesExist){
        console.log("Files does not exist");
        return;
        
    }
}
//===============>content read and appending starts<===============

let content = "";
for(let i = 0; i < filesarr.length; i++){
    let filecontent = fs.readFileSync(filesarr[i]);
     content = content + filecontent + "\r\n";
}
console.log(content);

let contentarr = content.split("\r\n");
console.log(contentarr);

//check is -s is present or not
let isSpresent = optionsarr.includes("-s");
if(isSpresent){
    for(let i = 1; i < contentarr.length; i++){
        if(contentarr[i] == "" && contentarr[i - 1] == ""){  
        contentarr[i] = null;
    }
    else if(contentarr[i] == "" && contentarr[i - 1] == null){
        contentarr[i] = null;
    }
}
console.table(contentarr);
let temparr = [];
//push everything in temp except null
for(let i = 0; i < contentarr.length; i++){
    if(contentarr[i] != null){
        temparr.push(contentarr[i]);
    }
}
console.log("data after removing extra lines\n", temparr);
}

