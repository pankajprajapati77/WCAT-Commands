//Commands 1) node wcat.js filepath => displays the contents of a file in terminal
//Command 2) node wcat.js filepath1 filepath2 => displays the contents of all files in terminal
//in concatinated form in given order
//Command 3) node wcat.js -s filepath1 or node wcat.js -s filepath1 filepath2 => removes the extra line 
//space and leave only single line space  
//Command 4) node wcat.js -n filepath1 or node wcat.js -n filepath1 filepath2 => numbering to all lines
//Command 5) node wcat.js -b filepath1 or node wcat.js -b filepath1 filepath2 => numbering to non-empty lines

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
        //return;
        process.exit();
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
//console.log(contentarr);

//===============>check is -s is present or not<===============
let temparr = [];
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

//===============>push everything in temp except null<===============
for(let i = 0; i < contentarr.length; i++){
    if(contentarr[i] != null){
        temparr.push(contentarr[i]);
    }
}
console.log("data after removing extra lines\n", temparr);
contentarr = temparr;
}

let indexofN = optionsarr.indexOf("-n");
let indexofB = optionsarr.indexOf("-b");
//===============>if -n or -b is not found, -1 is returned<===============

let finaloption = "";
//===============>if both -n and -b are present<===============
if(indexofN != -1 && indexofB != -1){
    if(indexofN < indexofB){
        finaloption = "-n";
    }
    else{
        finaloption = "-b";
    }
}

//===============>either -n is present or -b is present<===============
else{
    if(indexofN != -1){
        finaloption = "-n";
    }
    else if(indexofB != -1){
        finaloption = "-b";
    }
}

//===============>calling of functions by evaluating finaloption<===============
if(finaloption == "-n"){
    modifyContentbyN();
}
else if(finaloption == "-b"){
    modifyContentbyB();
}

function modifyContentbyN(){
    for(let i = 0; i < contentarr.length; i++){
        contentarr[i] = (i + 1) + ") " + contentarr[i];
    }
}
function modifyContentbyB(){
    let count = 1;
    for(let i = 0; i < contentarr.length; i++){
        if(contentarr[i] != ""){
            contentarr[i] = count + ") " + contentarr[i];
            count++;
        }
    }
}
console.log(contentarr);
