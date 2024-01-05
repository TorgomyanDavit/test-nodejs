import { parentPort,isMainThread } from 'worker_threads';


for(let i = 0; i < 10; i++) {
    console.log("worker 2")
}




// console.log(isMainThread,'worker 2')
// parentPort.postMessage("worker 2")