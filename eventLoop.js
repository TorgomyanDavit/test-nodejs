import path from "path"
import fs from "fs"
const currentDir = path.resolve()


console.log('Script start');


// process.nextTick(() => {
//     console.log('Next tick callback');
//     setTimeout(() => {
//         console.log('Timer callback 1');
//     }, 0);

//     setImmediate(() => {
//         console.log('setImmediate task executed');
//     });
// });

// const readFilePath = path.join(currentDir,".env")
// fs.readFile(readFilePath,(error,text) => {
//     console.log("readFile")

//     setImmediate(() => {
//         console.log('setImmediate task executed');
//     });

//     setTimeout(() => {
//         console.log('Timer callback 1');
//     }, 0);
// })

for(let i = 0;i < 10;i++) {
    setImmediate(() => {
        console.log('setImmediate task executed');
    });
    
    setTimeout(() => {
        console.log('Timer callback 1');
    }, 0);
}



console.log('Script end');