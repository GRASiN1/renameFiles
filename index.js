const fs = require('fs');
const path = require('path')
let replaceThis = ""
let replaceWith = ""
let folder = __dirname
let choice = 1
let preview = false

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

readline.question("enter the word you want to replace : ", (word)=>{
    replaceThis = word;
    readline.question(`enter the word you want to replace ${replaceThis} with : `, (word)=>{
        replaceWith = word;
        readline.question(`enter 1 to preview or 2 to commit the changes : `, (word)=>{
            choice = parseInt(word);

            if(choice == 1){
                preview = true
            }
            else if(choice == 2){
                preview = false
            }
            
            try {
            fs.readdir(folder, (err, data)=> {
                for(index= 0; index < data.length; index++){
                    const item = data[index]
                    let oldFIle = path.join(folder, item)
                    let newFile = path.join(folder, item.replaceAll(replaceThis, replaceWith))
                    if(!preview){
                        if(oldFIle !== newFile){
                            fs.rename(oldFIle, newFile, ()=>{
                                console.log(`Rename success for : ${oldFIle}`)
                            })
                        }
                    }
                    else{
                        if(oldFIle !== newFile){
                            console.log(`${oldFIle} will be renamed to ${newFile}`)
                        }
                    }
                }
              })
            } catch (err) {
              console.error(err);
            }
            
        })
    })
})

