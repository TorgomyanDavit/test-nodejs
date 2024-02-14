import express from "express"
import session from "express-session"
import EventEmitter from "node:events"
import path from "path"
import fs from "fs"
import { Worker,isMainThread } from 'worker_threads';
import cluster from "cluster";
import os from "os"
import fetch from 'node-fetch';
import { createPool } from "mysql2/promise";
const currentDir = path.resolve()
import sharp from 'sharp';
import axios from "axios";
import { load } from 'cheerio';
import myEmitter from "./nodeLogic/eventEmiter.js"
import greet from "log-greet"
import crypto from "crypto"
import jwt from 'jsonwebtoken';
import cors from "cors";



// // export const pool = createPool({
// //     host: process.env.db_host, // Replace with your host name
// //     user: process.env.db_user, // Replace with your root name
// //     password: process.env.db_password, // Replace with your database password
// //     database: process.env.db_name, // Replace with your database Name
// //     multipleStatements: true
// // });

const app = express()
app.use(session({
    secret:process.env.SECRET,
    // cookie: { expires : new Date(Date.now() + 3600000) },
    // cookie:{maxAge:60000},
    saveUninitialized:true,
    resave:false
}))


app.use(cors({
    origin: [
      'http://localhost:3000',// test url
      'http://localhost:3001'// test url
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials:true,
    optionsSuccessStatus: 200
}));

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))

// // Thread
// const Worker1 = new Worker("./workerOne.js");
// Worker1.on("message",({elapsedMilliseconds,result}) => {
//     console.log(`worker 1 Work after ${elapsedMilliseconds} second when run Thread and resuls is ${result}`);
// })

app.get("/openia",async (req,res) => {
    // this is not free
    // try {
    //     const chatCompletion = await openai.createImage({
    //         prompt:"a white cat",
    //         n:1,
    //         size:"1024x1024"
    //     });
    
    //     // console.log(chatCompletion,"chatCompletion")
    //     res.send({message:chatCompletion})
    // } catch(err) {
    //     console.log("err")
    // }
    // const response = await openai.createCompletion({
    //     model: "text-davinci-003",
    //     prompt: "You: How do I combine arrays?\nJavaScript chatbot: You can use the concat() method.\nYou: How do you make an alert appear after 10 seconds?\nJavaScript chatbot",
    //     temperature: 0,
    //     max_tokens: 150,
    //     top_p: 1.0,
    //     frequency_penalty: 0.5,
    //     presence_penalty: 0.0,
    //     stop: ["You:"],
    // });
    // console.log(response,"response")
    res.send({message:"this route about Event openAi"})
})

app.get('/LoadHtmlData', (req, res) => {
    axios.get('https://www.pinterest.com/')
    .then(response => {
      const html = response.data;
      const $ = load(html);
      // Use jQuery-like selectors to extract data
      const title = $('title').text();
      const pinTitles = $('.itemTitle').map((index, element) => $(element).text()).get();
      // Print the extracted data
      console.log('Title:', title);
      console.log('Pin Titles:', pinTitles);
    })
    .catch(error => {
      console.error('Error fetching HTML:', error);
    });
    res.send({data:"Hello World"});
});

app.get('/getOs', async(req, res) => {
    console.log("os.platform()",os.platform())
    console.log("os.arch()",os.arch())
    console.log("os.cpus()",os.cpus())
    console.log("os.freemem()",os.freemem())
    console.log("os.totalmem()",os.totalmem())
    console.log("os.homedir()",os.homedir())
    console.log("os.networkInterfaces()",os.networkInterfaces())
    console.log("os.networkInterfaces()",os.userInfo())
    console.log("os.homedir()",os.hostname())

    res.send({data:" this route about Event << os >> package"});
});

app.get('/eventEmitter', async(req, res) => {
    myEmitter.emit('myEvent', 'bomba');
    res.send({data:"event emiter"});
});

app.get('/threed', async(req, res) => {
    // myEmitter.emit('myEvent', 'bomba');
    Worker1.postMessage({ loop:1000000 });
    
    console.log("this first step")
    res.send({data:"this route about Event threed Worker"});
});

app.get('/buffer', async(req, res) => {
    const bufferalloc = Buffer.alloc(1);
    const bufferfrom = Buffer.from("Vishvas");
    console.log(bufferfrom,"buffer") 
    console.log(bufferfrom.toJSON(),"buffer")  // This give me charCode whish equal Ascii
    console.log("V".charCodeAt(),"buffer")  

    res.send({data:"this route about buffer"});
});

app.get('/resize/:image/:width/:height', (req, res) => {
    const { image, width, height } = req.params;
  
    // Path to the original image (replace with your actual image path)
    const imagePath = path.resolve('images', image);
  
    sharp(imagePath)
        .resize(Number(width), Number(height), { fit: 'inside' })
        .toBuffer()
        .then((data) => {
            res.set('Content-Type', 'image/jpeg'); // Set the appropriate content type
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send('Error resizing image');
        });

    res.send({data:"this route about /resize/:image/:width/:height"});

});

app.get('/rapid', async (req, res) => {
    res.send({data:"response.data"});
});
  
app.get('/stream', async (req, res) => {
    const readableStream = fs.createReadStream('./file.txt', {
        encoding: 'utf-8'
    });

    const writableStream = fs.createWriteStream('./file2.txt', { // Fix: createWriteStream instead of createReadStream
        encoding: 'utf-8'
    });

    readableStream.on('data', (chunk) => {
        console.log(chunk, 'chunk');
        writableStream.write(chunk);
    });

    readableStream.on('end', () => {
        writableStream.end();
        console.log('Stream completed');
    });

    res.send({ data: 'this route about stream' });
});

app.get('/crypto', async (req, res) => {
    const start = Date.now()
    crypto.pbkdf2("hello","salt",100000, 512,'sha512',() => {
        console.log('hash', Date.now() - start);
    })
    crypto.pbkdf2("hello","salt",100000, 512,'sha512',() => {
        console.log('hash', Date.now() - start);
    })
    crypto.pbkdf2("hello","salt",100000, 512,'sha512',() => {
        console.log('hash', Date.now() - start);
    })
    crypto.pbkdf2("hello","salt",100000, 512,'sha512',() => {
        console.log('hash', Date.now() - start);
    })
    crypto.pbkdf2("hello","salt",100000, 512,'sha512',() => {
        console.log('hash', Date.now() - start);
    })

    const cpuCount = os.cpus().length;
    console.log(process.env.UV_THREADPOOL_SIZE, Date.now() - start);

    console.log(crypto.getHashes())
    crypto.randomBytes(1,(err,buf) => {
        console.log(buf)
    })

    res.send({ data: 'this route about crypto' });
});

app.get('/jsonwebtoken', async (req, res) => {
    // Data to be included in the token
    const payload = {
        user_id: 123,
        username: 'example_user',
    };

    const options = {
        expiresIn: '1h', // Token expires in 1 hour
    };
      
    // Sign the JWT
    const secretKey = "12sdadadd5dhgf5646s4fsd4g64g6d46g460fdagfdgh5d5d6dfsd444agdfggd"
    const token = jwt.sign(payload, secretKey, options);
    
    const decoded = jwt.decode(token);
    // Verify and decode the token
    const verif = jwt.verify(token, secretKey);

    res.send({ data:"this route about jsonwebtoken" });
});

app.get('/eventLoop', async(req, res) => {
    /** test 1 first work nextTick */ 
    process.nextTick(() => console.log('nextTick')); // արաջինը տպումա սա console.log(`nextTick`)) route _ի մեջ
    Promise.resolve().then(() => console.log(`Promise`)); 
    setImmediate(() => console.log('setImmediate'));


    // Log when the event loop is about to start.
    process.on('beforeExit', () => {
        console.log('Before exit event loop');rs
    });

    // Log when the event loop has finished processing all tasks and is about to exit.
    process.on('exit', () => {
        console.log('Exit event loop');
    });

    // Log when the event loop is idle (no more tasks to process).
    process.on('idle', () => {
        console.log('Idle event loop');
    });

    // Log when there is a rejected promise.
    process.on('unhandledRejection', (reason, promise) => {
        console.error('Unhandled Rejection:', reason);
    });

    // Log when an uncaught exception occurs.
    process.on('uncaughtException', (error) => {
        console.error('Uncaught Exception:', error);
    });

    // Log when a promise is rejected and no 'unhandledRejection' event handler is registered.
    process.on('rejectionHandled', (promise) => {
        console.log('Rejection handled:', promise);
    });

    // Log when a new task is about to be executed in the event loop.
    process.on('beforeEach', () => {
        console.log('Before each event loop iteration');
    });

    // Log when a new task has just been executed in the event loop.
    process.on('afterEach', () => {
        console.log('After each event loop iteration');
    });

    // Log when an uncaught exception is about to cause the process to exit.
    process.on('warning', (warning) => {
        console.warn('Warning:', warning);
    });

    // Trigger some asynchronous tasks to see the event loop in action.
    setTimeout(() => {
        console.log('setTimeout task executed');
    }, 0);

    setImmediate(() => {
        console.log('setImmediate task executed');
    });

    Promise.resolve().then(() => {
        console.log('Promise resolution task executed');
    });

    process.nextTick(() => {
        console.log('nextTick 2')
        process.nextTick(() => console.log('nextTick 3')); 
        Promise.resolve().then(() => console.log(`Promise 2`)); 
    });

    process.nextTick(() => console.log('nextTick 1')); 
    Promise.resolve().then(() => console.log(`Promise 1`)); 

    res.send({data:"this route about Event loop"});
});

// (async function() {
//     const resp = await fetch("http://localhost:5000/jsonwebtoken").then((res) => res.json())
//     console.log(resp,"respresp")
// })()

app.get('/getToken', async (req, res) => {
    res.cookie('_csrf', "newCsrfToken", {
      secure: true, // It means that the cookie will only be sent over HTTPS
      httpOnly: false, // inaccessible to JavaScript on the client side.
      sameSite: 'strict', // send cookie when open  browser's in address bar.
    });


    res.send({name:'Hello, TypeScript Express App!'});
});


/** Event Loop bug */
// process.nextTick(() => {
//     process.nextTick(() => console.log('nextTick 1')); // առաջինը տպումա console.log(`nextTick`);
//     Promise.resolve().then(() => console.log(`Promise 2`)); 
// });
// process.nextTick(() => console.log('nextTick 1')); 
// Promise.resolve().then(() => console.log(`Promise 1`)); // առաջինը տպումա console.log(`Promise`);


app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});



/** Workers */
// const Worker2 = new Worker("./workerTwo.js");
// Worker2.on("message",(msg) => {
//     console.log(`Message from Thread ${msg}`);
// })

// const openIaModel = new Worker("./openIaModel.js");
// openIaModel.on("message",(msg) => {
//     console.log(`Message from openIaModel Thread ${msg}`);
// })

// const readFilePath = path.join(currentDir,".env")
// fs.readFile(readFilePath,"utf-8",((error,text) => {
//     console.log(`2`);
// }))

// const baz = ;
// const foo = () => console.log('foo');
// const zoo = () => console.log('zoo');
// const start = () => {
//   console.log('start');
//   setImmediate(baz);
//   new Promise((resolve, reject) => {
//     resolve('bar');
//   }).then((resolve) => {
//     console.log(resolve);
//     process.nextTick(zoo);
//   });
//   process.nextTick(foo);
// };
// start();

// const readFilePath = path.join(currentDir,".env")
// fs.readFile(readFilePath,"utf-8",((error,text) => {
//     console.log(`readFile 1`);
// }))

// experiment 1
// console.log('1')
// process.nextTick(() => console.log('process Next tick 1'));
// console.log('2')

// experiment 2
// process.nextTick(() => console.log('process Next tick 1'));
// Promise.resolve().then(() => console.log(`Promise.resolve().then() 1`));
// experiment 2


//  NextTick
// process.nextTick(() => {
//     console.log('process Next tick 1') // 3
//     process.nextTick(() => console.log('process Next tick 2')); // 6
// });
// process.nextTick(() => console.log('process Next tick 3')); // 4

// // Promise
// Promise.resolve().then(() => {
//     console.log(`Promise.resolve().then() 1`) // 1
//     process.nextTick(() => console.log('Promise Next tick 2')); // 5
// });
// Promise.resolve().then(() => console.log(`Promise.resolve().then() 3`)); // 2

// experiment 3

// //  I/O Queue
// const readFilePath = path.join(currentDir,".env")
// fs.readFile(readFilePath,"utf-8",(error,text) => {
//     console.log(`readFile 1`);
// })

// //  NextTick
// process.nextTick(() => console.log('process Next tick 1')); 

// // Promise
// Promise.resolve().then(() => console.log(`Promise.resolve().then() 1`)); 


// experiment 4


// //  I/O Queue
// const readFilePath = path.join(currentDir,".env")
// fs.readFile(readFilePath,() => {
//     console.log(`fs.readFile`);
// })

// setTimeout(() => console.log('setTimeout'),0); 

// //  NextTick
// process.nextTick(() => console.log('process Next tick 1')); 

// // Promise
// Promise.resolve().then(() => console.log(`Promise.resolve().then() 1`)); 

// for (let index = 0; index < 2000; index++) {
//     console.log(index)
// }
 
// experiment 5
//  I/O Queue
// const readFilePath = path.join(currentDir,".env")
// fs.readFile(readFilePath,"utf-8",() => { console.log(`fs.readFile`) }) 
/**Node js Event loop */
/**this code first console setImmadiate becouse I/O queue have Polliing ; Polliing mean that I/O operation callback yet not finish his work */
// Check Queue
// setImmediate(() => console.log('setImmediate')); 

// Timeout Queue
// setTimeout(() => console.log('setTimeout'),0); 

// nextTick Queue
// process.nextTick(() => console.log('nextTick'));

// Promise Queue
// Promise.resolve().then(() => console.log(`Promise`)); 

// for (let index = 0; index < 200; index++) {
//     console.log(index)
// }

// experiment 6
// this work wrong inner ReadFile but why i didnt now yet not expected 
//  I/O Queue
// const readFilePath = path.join(currentDir,".env")
// fs.readFile(readFilePath,"utf-8",() => {
//     console.log(`fs.readFile`);
//     // Check Queue
//     setImmediate(() => console.log('inner setImmediate'));
//     // Timer Queue
//     setTimeout(() => console.log('inner setTimeout'),0); 
//     // nextTick Queue
//     process.nextTick(() => console.log('inner nextTick'));
//     // Promise Queue
//     Promise.resolve().then(() => console.log(`inner Promise`)); 
// }) 

// // nextTick Queue
// process.nextTick(() => console.log('inner nextTick'));
// // Promise Queue
// Promise.resolve().then(() => console.log(`inner Promise`)); 


// // Timer Queue
// setTimeout(() => console.log('setTimeout'),0); 
// // Check Queue
// setImmediate(() => console.log('setImmediate'));
// process.nextTick(() => console.log('inner nextTick'));


// // nextTick Queue
// process.nextTick(() => console.log('nextTick'));


// // Promise Queue
// Promise.resolve().then(() => console.log(`Promise`)); 


// experiment 7
// setImmediate(() => console.log('setImmediate 1'));
// setImmediate(() => {
//     console.log('setImmediate 2');
//     // check queue
//     setImmediate(() => console.log('inner setImmediate'));
//     // Timer Queue
//     setTimeout(() => console.log('inner setTimeout'),0); 
//     // nextTick Queue
//     process.nextTick(() => console.log('inner nextTick'));
//     // Promise Queue
//     Promise.resolve().then(() => console.log(`inner Promise`)); 
// });
// setImmediate(() => console.log('setImmediate 3'));


// experiment 8
// when running setTimeout with delay 0ms and setImmediate method, the order of execution can never be guaranted 
// for(let i = 0; i < 100;i ++) {
//     setTimeout(() => console.log('inner setTimeout'),0); 
//     setImmediate(() => console.log('setImmediate 1'));
// }


// experiment 9
//  case inner Read file 
// const readFilePath = path.join(currentDir,".env")
// fs.readFile(readFilePath,"utf-8",() => {
//     console.log('readFile')
//     // Check Queue
//     process.nextTick(() => console.log('inner nextTick readFile'));
//     // Promise Queue
//     Promise.resolve().then(() => console.log(`inner Promise readFile`)); 
// }) 

// setImmediate(() => {
//     console.log('setImmediate')
//     // Check Queue
//     process.nextTick(() => console.log('inner nextTick setImmediate'));
//     // Promise Queue
//     Promise.resolve().then(() => console.log(`inner Promise setImmediate`)); 
// });

// setTimeout(() => {
//     console.log('setTimeout')
//     // Check Queue
//     process.nextTick(() => console.log('inner nextTick setTimeout'));
//     // Promise Queue
//     Promise.resolve().then(() => console.log(`inner Promise setTimeout`)); 
// },0);

// // Check Queue
// process.nextTick(() => console.log('nextTick'));
// // Promise Queue
// Promise.resolve().then(() => console.log(`Promise`)); 




// experiment 10
// Create a readable stream
// const readFilePath = path.join(currentDir,".env")
// const readableStream = fs.createReadStream(readFilePath, 'utf8');
// readableStream.close()

// // Handle Close
// readableStream.on('close', () => { console.log('Stream close') });
    
// setImmediate(() => console.log('setImmediate'));
// setTimeout(() => console.log('setTimeout'),0); 
// Promise.resolve().then(() => console.log(`Promise`)); 
// process.nextTick(() => console.log('nextTick'));



// experiment 11
// const readFilePath = path.join(currentDir,".env")
// fs.readFile(readFilePath,"utf-8",() => {
//     console.log('readFilePath')
//     setTimeout(() => console.log('setTimeout readFilePath'),0); 
//     setImmediate(() => console.log('setImmediate readFilePath'));
// }) 

// setTimeout(() => {
//     console.log('setTimeout origin')
//     setTimeout(() => console.log('setTimeout setTimeout'),0); 
//     setImmediate(() => console.log('setTimeout setImmediate'));
// },0);

// setImmediate(() => {
//     console.log('setImmediate origin')
//     setTimeout(() => console.log('setImmediate setTimeout'),0); 
//     setImmediate(() => console.log('setImmediate setImmediate'));
// });

// setTimeout(() => console.log('setTimeout +'),0); 
// setImmediate(() => console.log('setImmediate +'));


// experiment 12

// let racer = function() {
//     setTimeout(() => console.log("timeout"), 0);
//     setImmediate(() => console.log("immediate"));
//     process.nextTick(() => console.log("nextTick"));
// }
// racer()

// experiment 13
// const readFilePath = path.join(currentDir,".env")
// fs.readFile(readFilePath,"utf-8",() => {
//     process.nextTick(() => console.log('nextTick 1'));
//     Promise.resolve().then(() => console.log(`Promise 1`)); 
//     process.nextTick(() => console.log('nextTick 2'));
//     Promise.resolve().then(() => console.log(`Promise 2`)); 
//     process.nextTick(() => console.log('nextTick 3'));
//     Promise.resolve().then(() => console.log(`Promise 3`)); 
// }) 


// process.nextTick(() => console.log('nextTick 1'));
// Promise.resolve().then(() => console.log(`Promise 1`)); 
// process.nextTick(() => console.log('nextTick 2'));
// Promise.resolve().then(() => console.log(`Promise 2`)); 
// process.nextTick(() => console.log('nextTick 3'));
// Promise.resolve().then(() => console.log(`Promise 3`)); 


// // experiment 14
// process.nextTick(() => {
//     console.log('nextTick 1')
//     process.nextTick(() => {
//         console.log('nextTick 2')
//         process.nextTick(() => console.log('nextTick 3'));
//         process.nextTick(() => console.log('nextTick 4'));
//     });
// });

// process.nextTick(() => {
//     console.log('nextTick 5')

//     process.nextTick(() => {
//         console.log('nextTick 6')
//         process.nextTick(() => console.log('nextTick 7'));
//         process.nextTick(() => console.log('nextTick 8'));
//     });
// });

// experiment 15
// process.nextTick(() => {
//     console.log('nextTick 1')
//     process.nextTick(() => {
//         console.log('nextTick 2')
//         process.nextTick(() => console.log('nextTick 3'));
//         Promise.resolve().then(() => console.log(`Promise 1`)); 
//     });
// });

// process.nextTick(() => {
//     console.log('nextTick 5')
//     process.nextTick(() => {
//         console.log('nextTick 6')
//         process.nextTick(() => console.log('nextTick 7'));
//         Promise.resolve().then(() => console.log(`Promise 2`)); 
//     });
// });

// experiment 16
// setInterval(() => console.log("setInterval"),2000)
// const readFilePath = path.join(currentDir,".env")
// fs.readFile(readFilePath,"utf-8",() => {
//     console.log("readFile")
// }) 



// app.listen(5000,() => {
//     console.log(`app run on ${5000} port`);
// })

// Queue 
// () => console.log(`Promise.resolve().then() 1`)
// () => console.log('process Next tick 1')
// () => console.log('setTimeout'),0
// () => { console.log(`fs.readFile`)}
// () => console.log('setImmediate')


// export function greet(data) {
//     console.log(data + " this is bomb")
// }


// // Log when the event loop is about to start.
// process.on('beforeExit', () => {
//     console.log('Before exit event loop');
// });

// // Log when the event loop has finished processing all tasks and is about to exit.
// process.on('exit', () => {
//     console.log('Exit event loop');
// });

// // Log when the event loop is idle (no more tasks to process).
// process.on('idle', () => {
//     console.log('Idle event loop');
// });

// // Log when there is a rejected promise.
// process.on('unhandledRejection', (reason, promise) => {
//     console.error('Unhandled Rejection:', reason);
// });

// // Log when an uncaught exception occurs.
// process.on('uncaughtException', (error) => {
//     console.error('Uncaught Exception:', error);
// });

// // Log when a promise is rejected and no 'unhandledRejection' event handler is registered.
// process.on('rejectionHandled', (promise) => {
//     console.log('Rejection handled:', promise);
// });

// // Log when a new task is about to be executed in the event loop.
// process.on('beforeEach', () => {
//     console.log('Before each event loop iteration');
// });

// // Log when a new task has just been executed in the event loop.
// process.on('afterEach', () => {
//     console.log('After each event loop iteration');
// });

// // Log when an uncaught exception is about to cause the process to exit.
// process.on('warning', (warning) => {
//     console.warn('Warning:', warning);
// });

// // Trigger some asynchronous tasks to see the event loop in action.
// setTimeout(() => {
//     console.log('setTimeout task executed');
// }, 0);

// setImmediate(() => {
//     console.log('setImmediate task executed');
// });

// Promise.resolve().then(() => {
//     console.log('Promise resolution task executed');
// });



// process.nextTick(() => {
//     console.log('nextTick 2')
//     process.nextTick(() => console.log('nextTick 3')); 
//     Promise.resolve().then(() => console.log(`Promise 2`)); 
// });

// process.nextTick(() => console.log('nextTick 1')); 
// Promise.resolve().then(() => console.log(`Promise 1`)); 
