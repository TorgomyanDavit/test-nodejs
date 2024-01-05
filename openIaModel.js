import { parentPort,isMainThread } from 'worker_threads';

for(let i = 0; i < 10; i++) {
    console.log("open ai")
}

// console.log(isMainThread,'open ai thread')
// parentPort.postMessage("work open IA model")

// (async function() {
//     const items = await pool.query(`SELECT * FROM church.Persons;`);
//     console.log(items)
// })()

// import { Configuration, OpenAIApi } from "openai"
// const configuration = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

// //  alll country api
// (async function() {
//     const response = await fetch('https://restcountries.com/v3.1/name/armenia?fields=name,flags,idd');
//     // const response = await fetch('https://suggest-maps.yandex.com/suggest-geo?fullpath=1&lang=en_RU&outformat=json&v=9&part=Armenia');
//     const body = await response.json();
//     console.log(body);
// })()