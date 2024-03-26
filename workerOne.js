import { parentPort, isMainThread} from 'worker_threads';
import myEmitter from "./nodeLogic/eventEmiter.js"
// console.log(process.pid,"finish")


parentPort.on('message', async (time) => {
    let result = 0
    const startTimestamp = performance.now();
    for (let index = 0; index < time.loop; index++) {
        result += index
    }
    const elapsedMilliseconds = performance.now() - startTimestamp;

    
    console.log('Elapsed time:', elapsedMilliseconds, 'ms');

    parentPort.postMessage({elapsedMilliseconds,result});
});













// parentPort.postMessage("worker 1")
// console.log(`isMainThread => ${isMainThread}`,' worker 1')


// Buffer represent Hexademical number for each charachter
// const buffer = new Buffer.from("Vishvas");
// console.log(buffer) /**this represent hexademical number */
// console.log(buffer.toJSON())  /**this represent binary number */