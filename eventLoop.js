import path from "path"
import fs from "fs"
const currentDir = path.resolve()

// process.nextTick(() => {
//     console.log('Next tick callback');
//     setTimeout(() => {
//         console.log('Timer callback 1');
//     }, 0);

//     // setImmediate is specifically designed to execute the callback function in the next iteration of the event loop, immediately after the current operation completes. It is prioritized over I/O events and timers. So, if you have both a setTimeout and a setImmediate scheduled, the setImmediate callback will always execute before the setTimeout callback, regardless of the delay specified in setTimeout.
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

//     process.nextTick(() => console.log("process.nextTick executed"))
// })

// process.nextTick(() => {
//     console.log('Next tick callback');
//     process.nextTick(() => console.log("process.nextTick executed"))
//     Promise.resolve().then(() => console.log("Promise.resolve()"))
// });

// process.nextTick(() => console.log("process.nextTick executed"))
// Promise.resolve().then(() => console.log("Promise.resolve()"))

// const readFilePath = path.join(currentDir,".env")
// setTimeout(() => {
//     console.log('Timer callback 1');
// }, 0);

// fs.readFile(readFilePath,(error,text) => {
//     console.log("readFile")
// })

// process.nextTick(() => console.log("process.nextTick executed"))
// Promise.resolve().then(() => console.log("Promise.resolve()"))


// setTimeout(() => {
//     console.log('Timer callback 1');
// }, 0);

// const readFilePath = path.join(currentDir,".env")

// process.nextTick(() => {
//     console.log('process.nextTick');

//     fs.readFile(readFilePath,(error,text) => {
//         console.log("readFile")
//     })
// });

// setImmediate(() => {
//     console.log('setImmediate task executed');
// });

// for(let i =0; i< 200000000;i++) {}