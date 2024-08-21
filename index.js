import express from "express"
import session from "express-session"
import { exec } from 'child_process';
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
import esprima from "esprima"
import TelegramBot from 'node-telegram-bot-api';
// import pkg from 'express-validator';
// const { sanitizeQuery, sanitizeBody } = pkg;
import helmet from "helmet";
import hpp from "hpp"
import { ConstructQuote } from "./thirdPartFunction/index.js";
import util from "util"
import Decimal from 'decimal.js';
// import transliteration from 'transliteration';
// const { transliterate, createCustomTransliterator } = transliteration;
import * as tf from '@tensorflow/tfjs';
import * as use from '@tensorflow-models/universal-sentence-encoder';





// const armenianToEnglishMapping = {
//     'ա': 'a', 'բ': 'b', 'գ': 'g', 'դ': 'd', 'ե': 'e', 'զ': 'z', 'է': 'e', 'ը': 'ë', 'թ': 't', 'ժ': 'zh',
//     'ի': 'i', 'լ': 'l', 'խ': 'x', 'ծ': 'c', 'կ': 'k', 'հ': 'h', 'ձ': 'dz', 'ղ': 'gh', 'ճ': 'tch', 'մ': 'm',
//     'յ': 'y', 'ն': 'n', 'շ': 'sh', 'ո': 'o', 'չ': 'ch', 'պ': 'p', 'ջ': 'j', 'ռ': 'r', 'ս': 's', 'վ': 'v',
//     'տ': 't', 'ր': 'r', 'ց': 'c', 'ու': 'u', 'փ': 'p', 'ք': 'q', 'և': 'ev', 'օ': 'o', 'ֆ': 'f'
// };

// const englishToRussianMapping = {
//     'a': 'а', 'b': 'б', 'v': 'в', 'g': 'г', 'd': 'д', 'e': 'е', 'yo': 'ё', 'zh': 'ж', 'z': 'з', 'i': 'и',
//     'y': 'й', 'k': 'к', 'l': 'л', 'm': 'м', 'n': 'н', 'o': 'о', 'p': 'п', 'r': 'р', 's': 'с', 't': 'т',
//     'u': 'у', 'f': 'ф', 'h': 'х', 'ts': 'ц', 'ch': 'ч', 'sh': 'ш', 'sch': 'щ', '': 'ъ', 'y': 'ы', '': 'ь',
//     'e': 'э', 'yu': 'ю', 'ya': 'я'
// };

// const russianToEnglishMapping = {
//     'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'zh', 'з': 'z', 'и': 'i',
//     'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't',
//     'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch', 'ъ': '', 'ы': 'y', 'ь': '',
//     'э': 'e', 'ю': 'yu', 'я': 'ya'
// };

// const russianToArmenianMapping = {
//     'а': 'ա', 'б': 'բ', 'в': 'վ', 'г': 'գ', 'д': 'դ', 'е': 'ե', 'ё': 'յո', 'ж': 'ժ', 'з': 'զ', 'и': 'ի',
//     'й': 'յ', 'к': 'կ', 'л': 'լ', 'м': 'մ', 'н': 'ն', 'о': 'ո', 'п': 'պ', 'р': 'ռ', 'с': 'ս', 'т': 'տ',
//     'у': 'ու', 'ф': 'ֆ', 'х': 'խ', 'ц': 'ծ', 'ч': 'չ', 'ш': 'շ', 'щ': 'շչ', 'ъ': '', 'ы': 'ը', 'ь': '',
//     'э': 'է', 'ю': 'յու', 'я': 'յա'
// };

// const armenianToRussianMapping = {
//     'ա': 'а', 'բ': 'б', 'գ': 'г', 'դ': 'д', 'ե': 'е', 'զ': 'з', 'է': 'э', 'ը': 'ы', 'թ': 'т', 'ժ': 'ж',
//     'ի': 'и', 'լ': 'л', 'խ': 'х', 'ծ': 'ц', 'կ': 'к', 'հ': 'х', 'ձ': 'дз', 'ղ': 'г', 'ճ': 'ч', 'մ': 'м',
//     'յ': 'й', 'ն': 'н', 'շ': 'ш', 'ո': 'о', 'չ': 'ч', 'պ': 'п', 'ջ': 'дж', 'ռ': 'р', 'ս': 'с', 'վ': 'в',
//     'տ': 'т', 'ր': 'р', 'ց': 'ц', 'ու': 'у', 'փ': 'п', 'ք': 'к', 'և': 'ев', 'օ': 'о', 'ֆ': 'ф'
// };

// const transliterateCustom = (text, mapping) => {
//     let result = '';
//     for (let i = 0; i < text.length; i++) {
//         const currentChar = text[i];
//         const nextChar = text[i + 1]; // Get the next character
//         const pair = currentChar + nextChar; // Form a pair of characters
        
//         if (mapping[pair]) { // Check if the pair exists in the mapping
//             result += mapping[pair]; // Transliterate the pair
//             i++; // Move to the next character
//         } else {
            
//             const mappedChar = mapping[currentChar] || currentChar; // Transliterate the current character individually
//             result += mappedChar;
//         }
//     }
//     return result;
// };

// const transliterateText = (text) => {
//     let inputLang;
//     if (armenianToEnglishMapping[text[0]]) {
//         inputLang = 'am';
//     } else if (russianToEnglishMapping[text[0]]) {
//         inputLang = 'ru';
//     } else {
//         inputLang = 'en';
//     }

//     if (inputLang === 'am') {
//         let transliteratedTextEn = transliterateCustom(text, armenianToEnglishMapping);
//         let transliteratedTextRu = transliterateCustom(text, armenianToRussianMapping);
//         return `${text}, ${transliteratedTextEn}, ${transliteratedTextRu}`;
//     } else if (inputLang === 'ru') {
//         let transliteratedTextEn = transliterateCustom(text, russianToArmenianMapping);
//         let transliteratedTextRu = transliterateCustom(text, russianToEnglishMapping);
//         return `${text}, ${transliteratedTextEn}, ${transliteratedTextRu}`;
//     } else {
//         let transliteratedTextAm = transliterateCustom(text, englishToArmenianMapping);
//         let transliteratedTextRu = transliterateCustom(text, englishToRussianMapping);
//         return `${text}, ${transliteratedTextAm}, ${transliteratedTextRu}`;
//     }
// };

// const text = 'xачапури';

// try {
//     const transliteratedText = transliterateText(text);
//     console.log(transliteratedText); // Output the transliterated text
// } catch (error) {
//     console.error(error.message);
// }



export const pool = createPool({
    host: process.env.db_host, // Replace with your host name
    user: process.env.db_user, // Replace with your root name
    password: process.env.db_password, // Replace with your database password
    database: process.env.db_name, // Replace with your database Name
    multipleStatements: true
});

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
    //   'http://localhost:3000',// test url
    //   'http://localhost:3001',// test url
    //   "https://www.holtrinity.com"
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials:true,
    optionsSuccessStatus: 200
}));

app.use(helmet()); 
app.use(hpp());

// app.use(sanitizeQuery('*').escape());
// app.use(sanitizeBody('*').escape());

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))

app.set('view engine', 'ejs');
app.set('views', './src/views'); 

const happyFlowerTags = [
    "joy", "celebration", "congratulations", "cheer", "delight", "happiness",
    "joyful", "bright blooms", "cheerful bouquet", "festive", "happy vibes",
    "love", "romance", "friendship", "thank you", "appreciation", "gratitude",
    "birthday", "anniversary", "wedding", "engagement", "new baby", 
    "bright", "vibrant", "radiant", "colorful", "sunny", "smile",
    "yellow", "orange", "pink", "red", "purple", "blue", "white", "green",
    "daisy", "sunflower", "tulip", "lily", "rose", "daffodil", "gerbera",
    "orchid", "marigold", "peony", "zinnia", "chrysanthemum", "carnation",
    "hibiscus", "lilac", "freesia", "magnolia", "ranunculus", "snapdragon",
    "anemone", "New Year's Day", "Valentine's Day", "Easter", "Mother's Day",
    "Father's Day", "Thanksgiving", "Christmas", "Hanukkah", "Graduation",
    "Promotion", "Housewarming", "Baby Shower", "Retirement", "March 8", "April 8"
];

const happyFlowerTagsAm = [
    "ուրախություն", "տոնակատարություն", "շնորհավորանքներ", "ուրախություն", "հրճվանք", "երջանկություն",
    "ուրախ", "վառ ծաղիկներ", "ուրախ բուկետ", "տոնական", "երջանիկ տրամադրություններ",
    "սեր", "ռոմանտիկա", "ընկերություն", "շնորհակալություն", "գնահատում", "երախտագիտություն",
    "ծննդյան օր", "ամուսնության տարեդարձ", "հարսանիք", "նշանադրություն", "նորածին", 
    "վառ", "վառվռուն", "շողշողուն", "գունավոր", "արևոտ", "ժպիտ",
    "դեղին", "նարնջագույն", "վարդագույն", "կարմիր", "մանուշակագույն", "կապույտ", "սպիտակ", "կանաչ",
    "մարգարիտ", "արևածաղիկ", "կակաչ", "շուշան", "վարդ", "նարգիզ", "գերբերա",
    "խոլորձ", "մարգարիտ", "փիոն", "ցինիա", "քրիզանթեմ", "կարնացիա",
    "հիբիսկուս", "մանուշակ", "ֆրեզիա", "մագնոլիա", "համբույր ծաղիկ", "շնաձուկ ծաղիկ",
    "անեմոն", "Նոր տարվա օր", "Սիրո օրը", "Զատիկ", "Մայրիկի օր",
    "Հայրիկի օր", "Շնորհակալություն", "Ծնունդ", "Հանուկա", "Ավարտ",
    "Խթանում", "Տանուտ", "Նորածնի ցնցում", "Թոշակառուություն", "Մարտի 8", "Ապրիլի 8"
];

const happyFlowerTagsRu = [
    "радость", "празднование", "поздравления", "веселье", "восторг", "счастье",
    "радостный", "яркие цветы", "веселый букет", "праздничный", "счастливые настроения",
    "любовь", "романтика", "дружба", "спасибо", "признательность", "благодарность",
    "день рождения", "годовщина", "свадьба", "помолвка", "новорожденный", 
    "яркий", "жизнерадостный", "сияющий", "цветной", "солнечный", "улыбка",
    "желтый", "оранжевый", "розовый", "красный", "фиолетовый", "синий", "белый", "зеленый",
    "маргаритка", "подсолнух", "тюльпан", "лилия", "роза", "нарцисс", "гербера",
    "орхидея", "мариголд", "пион", "цинния", "хризантема", "гвоздика",
    "гибискус", "сирень", "фрезия", "магнолия", "ранункулюс", "анютины глазки",
    "анемон", "Новый год", "День Святого Валентина", "Пасха", "День матери",
    "День отца", "День благодарения", "Рождество", "Ханука", "Выпускной",
    "Повышение", "Новоселье", "Детский душ", "Выход на пенсию", "8 марта", "8 апреля"
];

const imageUrl = 'https://cdn.pixabay.com/photo/2020/07/08/08/07/daisy-5383056_1280.jpg';
const tagType = 1;

app.get('/insertTags', async (req, res) => {
    const values = happyFlowerTags.map(tag => [tag, tagType, imageUrl]);
    const valuesTranslation = happyFlowerTagsRu.map((tag,index) => [index + 1, "ru", tag]); 


    console.log(values.length)
    console.log(valuesTranslation.length)

    // try {
    //     const [result] = await pool.query(`INSERT INTO flowers.tags (tag_name, tag_type, image_url) VALUES ?`, [values]);
    //     console.log('Data inserted successfully:', result);
    //     res.send({ data: "Hello World" });
    // } catch (err) {
    //     console.error('Error inserting data:', err);
    //     res.status(500).send({ error: 'Error inserting data' });
    // }

    // try {
    //     const [result] = await pool.query('INSERT INTO flowers.tags_translation (tags_id, language_code, translated_tag_name) VALUES ?', [valuesTranslation]);
    //     console.log('Translations inserted successfully:', result);
    //     res.send({ data: "Translations inserted successfully" });
    // } catch (err) {
    //     console.error('Error inserting translations:', err);
    //     res.status(500).send({ error: 'Error inserting translations' });
    // }

    // res.status(500).send({ error: 'Error inserting translations' });
});

// Telegram bot
app.get('/TelegramBot', (req, res) => {
    const bot = new TelegramBot(process.env.TELEGRAMTOKEN, { polling: true });


    // Listen for any kind of message. There are different kinds of messages.
    bot.on('message', (msg) => {
        const chatId = msg.chat.id;
        const text = msg.text;
    
        // Send a reply message
        bot.sendMessage(chatId, `You said: ${text}`);
    });
  
    // Listen for /start command
    bot.onText(/\/start/, (msg) => {
        const chatId = msg.chat.id;
        bot.sendMessage(chatId, 'Welcome to my bot! How can I help you?');
    });

    
    res.send({data:"Hello World"});
});

// Thread /** Workers */
const Worker1 = new Worker("./workerOne.js");
Worker1.on("message",({elapsedMilliseconds,result}) => {
    console.log(`worker 1 Work after ${elapsedMilliseconds} second when run Thread and resuls is ${result}`);
})

// const Worker2 = new Worker("./workerTwo.js");
// Worker2.on("message",(msg) => {
//     console.log(`Message from Thread ${msg}`);
// })

// const openIaModel = new Worker("./openIaModel.js");
// openIaModel.on("message",(msg) => {
//     console.log(`Message from openIaModel Thread ${msg}`);
// })

let model;

let tags = [
    // **Flower Types and Bouquets**
    // Specific flower types and bouquet-related terms
    "rose",          // Classic symbol of love and beauty
    "bouquet",       // General term for a collection of flowers
    "lily",          // Elegant and popular flower often used in arrangements
    "orchid",        // Exotic and beautiful flower for sophisticated bouquets
    "daisy",         // Cheerful and simple flower symbolizing innocence
    "tulip",         // Bright and vibrant flower often associated with spring
    "sunflower",     // Large, cheerful flower symbolizing happiness
    "peony",         // Romantic and lush flower often used in celebrations
    "daffodil",      // Spring flower symbolizing new beginnings
    "hydrangea",     // Full and beautiful flower often used in elegant bouquets
    "chrysanthemum", // Flower symbolizing optimism and joy
    "carnation",     // Versatile flower used in a variety of bouquets
    "lavender",      // Fragrant flower associated with calm and peace
    "poppy",         // Bright and attractive flower symbolizing remembrance
    "iris",          // Elegant flower often associated with faith and hope
    "marigold",      // Bright flower symbolizing positive energy
    "jasmine",       // Fragrant flower symbolizing love and beauty
    "geranium",      // Cheerful flower often used in garden bouquets
    "freesia",       // Fragrant and colorful flower used in elegant arrangements
    "hibiscus",      // Tropical flower symbolizing beauty and happiness
    "magnolia",      // Large and beautiful flower symbolizing dignity
    "azalea",        // Colorful flower often used in decorative arrangements
    "camellia",      // Elegant flower symbolizing admiration and perfection
    "pansy",         // Charming flower often used in cheerful bouquets
    "begonia",       // Flower known for its vibrant colors and beauty
    "ranunculus",    // Elegant flower symbolizing radiant charm
    "snapdragon",    // Unique flower used in joyful and vibrant bouquets
    "zinnia",        // Bright flower symbolizing endurance and cheerfulness

    // **Bouquet Types**
    // Specific types of flower bouquets
    "flower arrangement",   // General term for arranged flowers
    "hand-tied bouquet",    // Bouquet made by tying flowers together
    "floral centerpiece",   // Arrangement designed as a table centerpiece
    "wedding bouquet",      // Bouquet specifically designed for weddings
    "bridal bouquet",       // Bouquet for the bride
    "birthday bouquet",     // Bouquet for celebrating birthdays
    "anniversary bouquet",  // Bouquet for celebrating anniversaries
    "thank you bouquet",    // Bouquet to express gratitude
    "congratulations bouquet", // Bouquet for congratulating achievements
    "get well soon bouquet", // Bouquet to wish someone a speedy recovery

    // **Colors and Themes Related to Happiness**
    // Colors and terms that express joy and positive emotions
    "pink",          // Color often associated with love and joy
    "red",           // Bold color symbolizing passion and excitement
    "yellow",        // Bright color symbolizing happiness and cheerfulness
    "blue",          // Calm color often associated with peace and tranquility
    "white",         // Color symbolizing purity and simplicity
    "orange",        // Warm color symbolizing enthusiasm and warmth
    "purple",        // Color often associated with creativity and joy
    "green",         // Color symbolizing nature and freshness
    "bright",        // General term for something cheerful and eye-catching
    "vibrant",       // Colorful and lively appearance
    "radiant",       // Bright and shining appearance

    // **Peace and Serenity**
    // Terms associated with peace and serenity
    "peace",         // State of tranquility and calm
    "serenity",      // Quality of being peaceful and calm
    "comfort",       // Providing a sense of ease and consolation
    "calm",          // Peaceful and relaxing state
    "soothing",      // Gentle and comforting
    "gentle",        // Mild and tender
    "rest",          // State of relaxation and peace
    "tranquility",   // Peaceful and serene atmosphere
    "harmony",       // Pleasant and balanced state of being
    "relaxation",    // State of being free from tension or anxiety

    // **General Happiness Themes**
    // Terms reflecting general themes of happiness and joy
    "joy",           // Deep happiness and delight
    "happiness",     // General state of well-being and joy
    "smile",         // Expression of joy and friendliness
    "gratitude",     // Feeling of thankfulness and appreciation
    "celebrate",     // Act of rejoicing and marking a special occasion
    "festivity",     // Atmosphere of celebration and joy
    "jubilation",    // Feeling of great joy and celebration
    "cheerful",      // Happy and positive attitude
    "delight",       // Pleasure and joy
    "happy occasion",// A special moment of joy and celebration
    "joyful",        // Full of happiness and delight
    "pleasant",      // Enjoyable and satisfying
    "uplifting",     // Raising spirits and providing joy
    "inspire",       // Motivating and encouraging positive feelings
    "fun",           // Enjoyable and entertaining experience
    "lovely",        // Pleasant and delightful
    "charming",      // Attractive and pleasing
    "wonderful",     // Full of happiness and amazement
    "graceful",      // Elegant and pleasing to the eye

    // **Additional Happiness Themes**
    "brighten day",  // Making someone's day better
    "thankful heart" // Feeling of deep gratitude
];

// https://cdn.pixabay.com/photo/2020/07/08/08/07/daisy-5383056_1280.jpg
const sadFlowerTags = [
    "sympathy", "condolences", "funeral", "mourning", "grief", "loss",
    "remembrance", "tribute", "comfort", "support", "peace", "heartfelt",
    "solace", "serenity", "memorial", "compassion", "empathy", "sadness",
    "hope", "farewell", "comfort blooms", "peaceful rest", "in loving memory",
    "grieving", "soft tones", "gentle bouquet", "hopeful wishes", "soothing",
    "sorrow", "loving tribute", "rest in peace", "quiet reflection",
    "sincere condolences", "farewell bouquet", "sadness bouquet", 
    "sympathy arrangement",
    "pink",          
    "red",        
    "yellow",       
    "blue",          
    "white",         
    "orange",        
    "purple",        
    "green",         
    "bright",       
    "vibrant",       
    "radiant",      
];


let tagEmbeddings = [];

// Load the Universal Sentence Encoder model
use.load().then((loadedModel) => {
    model = loadedModel;
    computeEmbeddings(tags).then((embeddings) => {
        tagEmbeddings = embeddings;
        console.log('Tag embeddings computed');
    });
});

async function computeEmbeddings(sentences) {
    const embeddings = await model.embed(sentences);
    return embeddings.arraySync();
}

function cosineSimilarity(A, B) {
    const dotProduct = A.map((val, i) => val * B[i]).reduce((acc, curr) => acc + curr, 0);
    const magnitudeA = Math.sqrt(A.map(val => val * val).reduce((acc, curr) => acc + curr, 0));
    const magnitudeB = Math.sqrt(B.map(val => val * val).reduce((acc, curr) => acc + curr, 0));
    return dotProduct / (magnitudeA * magnitudeB);
}

app.post('/tensorf-suggest-tags', async (req, res) => {
    const { selectedTags } = req.body;
    if (!model) {
        return res.status(503).json({ error: 'Model is loading, please try again later' });
    }

    if (!selectedTags || selectedTags.length === 0) {
        return res.status(400).json({ error: 'No selectedTags provided' });
    }

    try {
        const selectedEmbeddings = await computeEmbeddings(selectedTags);
        const suggestedTags = new Set();

        for (const selectedEmbedding of selectedEmbeddings) {
            for (let j = 0; j < tagEmbeddings.length; j++) {
                const tagEmbedding = tagEmbeddings[j];
                const similarity = cosineSimilarity(selectedEmbedding, tagEmbedding);

                if (similarity > 0.6) {  // Adjusted to a more appropriate threshold
                    suggestedTags.add(tags[j]);
                }
            }
        }

        // Remove already selected tags from suggestions
        selectedTags.forEach(tag => suggestedTags.delete(tag));

        // Convert set to array and filter out tags with very low relevance
        const result = Array.from(suggestedTags).filter(tag => tag !== "" && tag !== null);

        res.send({ data: result });

    } catch (error) {
        console.error('Error during tag suggestion:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/security', (req, res) => {
    const params = req.params;
    const body = req.body;
    const query = req.query;
    console.log(query,"query")

    const myPrice = 5
    // this incorect example 
    const count = parseInt(0.000005) // 0 
    const count2 = parseInt(0.0000005) // 5
    // console.log(myPrice - count)
    // console.log(myPrice - count2)

    const result1 = new Decimal(5).minus(new Decimal(0.005));
    console.log(result1)

    // try {
    //     const namePath = path.basename(query.name.trim()) // this is secure way to not deep ../../ and read env 
    //     const pathNAme = './thirdPartFunction/'+namePath
    //     const data = fs.readFileSync(pathNAme, 'utf8');
    //     return res.send(data.toString());
    // } catch (err) {
    //     console.error('Error reading file:', err);
    // }


    res.send(ConstructQuote(query.name,query.color));
});

app.get('/securityFloatParseInt', (req, res) => {
    const params = req.params;
    const body = req.body;
    const query = req.query;
    console.log(query,"query")

    const myPrice = 5
    // this incorect example 
    const count = parseInt(0.000005) // 0 
    const count2 = parseInt(0.0000005) // 5
    // console.log(myPrice - count)
    // console.log(myPrice - count2)

    const result1 = new Decimal(5).minus(new Decimal(0.005));
    console.log(result1)

    res.send(ConstructQuote(query.name,query.color));
});

app.get('/securitySafetyFile', async (req, res) => {
    // const params = req.params;
    // const body = req.body;
    const query = req.query;
    console.log(query, "query");

    const ALLOWED_BASE_DIRECTORY = path.resolve('./thirdPartFunction');

    // Function to sanitize file path
    function sanitizeFilePath(filePath) {
        const absolutePath = path.resolve(ALLOWED_BASE_DIRECTORY, filePath);
        if (!absolutePath.startsWith(ALLOWED_BASE_DIRECTORY)) {
            throw new Error('Path traversal detected');
        }
        return absolutePath;
    }

    // Function to safely access the file
    async function safeFileAccess(filePath) {
        try {
            const sanitizedPath = sanitizeFilePath(filePath);
            await util.promisify(fs.access)(sanitizedPath, fs.constants.R_OK); // Check if file is readable
            return sanitizedPath;
        } catch (error) {
            console.error('Error accessing file:', error);
            throw error;
        }
    }

    try {
        const sanitizedPath = await safeFileAccess(query.name.trim());
        const data = fs.readFileSync(sanitizedPath, 'utf8');
        return res.send(data.toString());
    } catch (err) {
        console.error('Error reading file:', err);
        return res.status(500).send(err.message);
    }
});

app.get('/security', async (req, res) => {
    // const params = req.params;
    // const body = req.body;
    const query = req.query;
    console.log(query, "query");

    const ALLOWED_BASE_DIRECTORY = path.resolve('./thirdPartFunction');

    // Function to sanitize file path
    function sanitizeFilePath(filePath) {
        const absolutePath = path.resolve(ALLOWED_BASE_DIRECTORY, filePath);
        if (!absolutePath.startsWith(ALLOWED_BASE_DIRECTORY)) {
            throw new Error('Path traversal detected');
        }
        return absolutePath;
    }

    // Function to safely access the file
    async function safeFileAccess(filePath) {
        try {
            const sanitizedPath = sanitizeFilePath(filePath);
            await util.promisify(fs.access)(sanitizedPath, fs.constants.R_OK); // Check if file is readable
            return sanitizedPath;
        } catch (error) {
            console.error('Error accessing file:', error);
            throw error;
        }
    }

    try {
        const sanitizedPath = await safeFileAccess(query.name.trim());
        const data = fs.readFileSync(sanitizedPath, 'utf8');
        return res.send(data.toString());
    } catch (err) {
        console.error('Error reading file:', err);
        return res.status(500).send(err.message);
    }
});

app.get('/exec', (req, res) => {
    const params = req.params;
    const body = req.body;
    const query = req.query;
    console.log(query,"query")

    // try {
    //     exec('dir', (error, stdout, stderr) => {
    //       if (error) {
    //         console.error(`exec error: ${error}`);
    //         return;
    //       }
    //       console.log(`stdout: ${stdout}`);
    //       console.error(`stderr: ${stderr}`);
    //     });
    // } catch (err) {
    //     console.error('Error occurred:', err);
    // }

    try {
        exec('curl https://jsonplaceholder.typicode.com/todos/1', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        });
    } catch (err) {
        console.error('Error occurred:', err);
    }

    res.send({name:'Exec for terminal'});
});

app.get('/GarbageCollection', (req, res) => {
    let allocatedMemory = [];

    function allocateMemory() {
      for (let i = 0; i < 1000000; i++) {
        allocatedMemory.push(new Array(1000).fill(0));
      }
    }
    
    function logMemoryUsage() {
      const memoryUsageMB = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
      console.log(`Memory usage: ${memoryUsageMB} MB`);
    }
    
    console.log(allocatedMemory,"allocatedMemory")
    setInterval(() => {
      allocateMemory();
      logMemoryUsage();
    }, 1000);
    res.send({data:"Hello World"});
});

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
    Worker1.postMessage({ loop:10000 });
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
    // const { image, width, height } = req.params;
  
    // // Path to the original image (replace with your actual image path)
    // const imagePath = path.resolve('images', image);
  
    // sharp(imagePath)
    //     .resize(Number(width), Number(height), { fit: 'inside' })
    //     .toBuffer()
    //     .then((data) => {
    //         res.set('Content-Type', 'image/jpeg'); // Set the appropriate content type
    //         res.send(data);
    //     })
    //     .catch((err) => {
    //         res.status(500).send('Error resizing image');
    //     });


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
    console.log('Script start');


    const readFilePath = path.join(currentDir,".env")
    fs.readFile(readFilePath,(error,text) => {
        setImmediate(() => {
            console.log('setImmediate task executed');
        });

        setTimeout(() => {
            console.log('Timer callback 1');
        }, 0);

        Promise.resolve().then(() => console.log(`Promise`)); 
        process.nextTick(() => console.log('nextTick')); 
    })

    // process.nextTick(() => console.log('nextTick')); // արաջինը տպումա սա console.log(`nextTick`)) route _ի մեջ
    // Promise.resolve().then(() => console.log(`Promise`)); 
    // setImmediate(() => console.log('setImmediate'));



    // // Log when the event loop is about to start.
    // process.on('beforeExit', () => {
    //     console.log('Before exit event loop');rs
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

    // Trigger some asynchronous tasks to see the event loop in action.
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

    console.log('Script end');
    res.send({data:"this route about Event loop"});
});

app.get('/getToken', async (req, res) => {
    res.cookie('_csrf', "newCsrfToken", {
      secure: false, // It means that the cookie will only be sent over HTTPS
      httpOnly: false, // inaccessible to JavaScript on the client side.
      sameSite: 'strict', // send cookie when open  browser's in address bar.
    });
    res.send({name:'Hello, TypeScript Express App!'});
});

app.get('/parserAbstreactSyntaxTreeV8', async (req, res) => {
    const code = 'const answer = 42;';
    const cod1 = `(function(props) {
        const x = 5
    })()`;
    
    const ast = esprima.parseScript(code);
    const ast1 = esprima.parseScript(cod1);
    
    console.log(JSON.stringify(ast1, null, 2));
    res.send({name:'parserAbstreactSyntaxTreeV8'});
});

app.get('/pollution', (req, res) => {
    const params = req.params;
    const body = req.body;
    const query = req.query;

    console.log(params,"params")
    console.log(body,"body")
    console.log(query,"query")


    res.send({name:'xss'});
});

app.get('/langiageChangetoRuEnAm', (req, res) => {
    const englishToArmenianMapping = {
        'a': 'ա', 'b': 'բ', 'g': 'գ', 'd': 'դ', 'e': 'ե', 'z': 'զ', 'e': 'է', 'ë': 'ը', 't': 'թ', 'zh': 'ժ',
        'i': 'ի', 'l': 'լ', 'x': 'խ', 'c': 'ծ', 'k': 'կ', 'h': 'հ', 'dz': 'ձ', 'gh': 'ղ', 'tch': 'ճ', 'm': 'մ',
        'y': 'յ', 'n': 'ն', 'sh': 'շ', 'o': 'ո', 'ch': 'չ', 'p': 'պ', 'j': 'ջ', 'r': 'ռ', 's': 'ս', 'v': 'վ',
        't': 'տ', 'r': 'ր', 'c': 'ց', 'u': 'ու', 'p': 'փ', 'q': 'ք', 'ev': 'և', 'o': 'օ', 'f': 'ֆ'
    };
    
    const armenianToEnglishMapping = {
        'ա': 'a', 'բ': 'b', 'գ': 'g', 'դ': 'd', 'ե': 'e', 'զ': 'z', 'է': 'e', 'ը': 'ë', 'թ': 't', 'ժ': 'zh',
        'ի': 'i', 'լ': 'l', 'խ': 'x', 'ծ': 'c', 'կ': 'k', 'հ': 'h', 'ձ': 'dz', 'ղ': 'gh', 'ճ': 'tch', 'մ': 'm',
        'յ': 'y', 'ն': 'n', 'շ': 'sh', 'ո': 'o', 'չ': 'ch', 'պ': 'p', 'ջ': 'j', 'ռ': 'r', 'ս': 's', 'վ': 'v',
        'տ': 't', 'ր': 'r', 'ց': 'c', 'ու': 'u', 'փ': 'p', 'ք': 'q', 'և': 'ev', 'օ': 'o', 'ֆ': 'f'
    };
    
    const englishToRussianMapping = {
        'a': 'а', 'b': 'б', 'v': 'в', 'g': 'г', 'd': 'д', 'e': 'е', 'yo': 'ё', 'zh': 'ж', 'z': 'з', 'i': 'и',
        'y': 'й', 'k': 'к', 'l': 'л', 'm': 'м', 'n': 'н', 'o': 'о', 'p': 'п', 'r': 'р', 's': 'с', 't': 'т',
        'u': 'у', 'f': 'ф', 'h': 'х', 'ts': 'ц', 'ch': 'ч', 'sh': 'ш', 'sch': 'щ', '': 'ъ', 'y': 'ы', '': 'ь',
        'e': 'э', 'yu': 'ю', 'ya': 'я'
    };
    
    const russianToEnglishMapping = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'zh', 'з': 'z', 'и': 'i',
        'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't',
        'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch', 'ъ': '', 'ы': 'y', 'ь': '',
        'э': 'e', 'ю': 'yu', 'я': 'ya'
    };
    
    const russianToArmenianMapping = {
        'а': 'ա', 'б': 'բ', 'в': 'վ', 'г': 'գ', 'д': 'դ', 'е': 'ե', 'ё': 'յո', 'ж': 'ժ', 'з': 'զ', 'и': 'ի',
        'й': 'յ', 'к': 'կ', 'л': 'լ', 'м': 'մ', 'н': 'ն', 'о': 'ո', 'п': 'պ', 'р': 'ռ', 'с': 'ս', 'т': 'տ',
        'у': 'ու', 'ф': 'ֆ', 'х': 'խ', 'ц': 'ծ', 'ч': 'չ', 'ш': 'շ', 'щ': 'շչ', 'ъ': '', 'ы': 'ը', 'ь': '',
        'э': 'է', 'ю': 'յու', 'я': 'յա'
    };
    
    const armenianToRussianMapping = {
        'ա': 'а', 'բ': 'б', 'գ': 'г', 'դ': 'д', 'ե': 'е', 'զ': 'з', 'է': 'э', 'ը': 'ы', 'թ': 'т', 'ժ': 'ж',
        'ի': 'и', 'լ': 'л', 'խ': 'х', 'ծ': 'ц', 'կ': 'к', 'հ': 'х', 'ձ': 'дз', 'ղ': 'г', 'ճ': 'ч', 'մ': 'м',
        'յ': 'й', 'ն': 'н', 'շ': 'ш', 'ո': 'о', 'չ': 'ч', 'պ': 'п', 'ջ': 'дж', 'ռ': 'р', 'ս': 'с', 'վ': 'в',
        'տ': 'т', 'ր': 'р', 'ց': 'ц', 'ու': 'у', 'փ': 'п', 'ք': 'к', 'և': 'ев', 'օ': 'о', 'ֆ': 'ф'
    };

    const transliterateCustom = (text, mapping) => {
        let result = '';
        for (let i = 0; i < text.length; i++) {
            const currentChar = text[i];
            const nextChar = text[i + 1]; // Get the next character
    
            if (nextChar !== undefined) { // Check if there's a next character
                const pair = currentChar + nextChar; // Form a pair of characters
                if (mapping[pair]) { // Check if the pair exists in the mapping
                    result += mapping[pair]; // Transliterate the pair
                    i++; // Move to the next character
                    continue; // Continue to the next iteration of the loop
                }
            }
    
            // If the pair doesn't exist or there's no next character, transliterate the current character individually
            const mappedChar = mapping[currentChar] || currentChar; 
            result += mappedChar;
        }
        return result;
    };
    
    const transliterateText = (text) => {
        let inputLang;
        if (armenianToEnglishMapping[text[0]]) {
            inputLang = 'am';
        } else if (russianToEnglishMapping[text[0]]) {
            inputLang = 'ru';
        } else {
            inputLang = 'en';
        }
    
        if (inputLang === 'am') {
            let transliteratedTextEn = transliterateCustom(text, armenianToEnglishMapping);
            let transliteratedTextRu = transliterateCustom(text, armenianToRussianMapping);
            return `${text}, ${transliteratedTextEn}, ${transliteratedTextRu}`;
        } else if (inputLang === 'ru') {
            let transliteratedTextEn = transliterateCustom(text, russianToArmenianMapping);
            let transliteratedTextRu = transliterateCustom(text, russianToEnglishMapping);
            return `${text}, ${transliteratedTextEn}, ${transliteratedTextRu}`;
        } else {
            let transliteratedTextAm = transliterateCustom(text, englishToArmenianMapping);
            let transliteratedTextRu = transliterateCustom(text, englishToRussianMapping);
            return `${text}, ${transliteratedTextAm}, ${transliteratedTextRu}`;
        }
    };
    
    const text = 'xачапури';
    
    try {
        const transliteratedText = transliterateText(text);
        console.log(transliteratedText); // Output the transliterated text
    } catch (error) {
        console.error(error.message);
    }

    res.send({name:'xss'});
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

// const readFilePath = path.join(currentDir,".env")
// fs.readFile(readFilePath,(error,text) => {
//     console.log('fileRead task executed');
// })
// process.nextTick(() => console.log('nextTick 1'));
// setImmediate(() => console.log('setImmediate 1'));
// setTimeout(() => console.log('setTimeout 1'), 0);


// const readFilePath = path.join(currentDir,".env")
// fs.readFile(readFilePath,"utf-8",((error,text) => {
//     console.log(`readFilePath`);
// }))

// const baz = () => console.log('baz');
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



// console.log('Script start');

// // Case 1: setTimeout (Timer Phase)
// setTimeout(() => {
//   console.log('Timer callback 1');
// }, 0);

// setImmediate(() => {
//     console.log('setImmediate task executed');
// });

// // Case 2: Immediate I/O (Poll Phase)
// const readFilePath = path.join(currentDir,".env")
// fs.readFile(readFilePath, 'utf8', (err, data) => {
//   if (err) {
//     console.error('Error reading file:', err);
//     return;
//   }
//   console.log('File content:');
// });

// // Case 3: Promise (Microtask Queue)
// Promise.resolve().then(() => {
//   console.log('Promise resolved (Microtask)');
// });

// // Case 4: Next Tick Queue
// process.nextTick(() => {
//   console.log('Next tick callback');
// });

// console.log('Script end');



/** Event loop  */
// console.log('Script start');

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

// console.log('Script end');

//  NextTick
// process.nextTick(() => console.log('process Next tick 1')); 

// // Promise
// Promise.resolve().then(() => console.log(`Promise.resolve().then() 1`)); 

// process.nextTick(() => {
//     process.nextTick(() => console.log('nextTick 7'));
//     Promise.resolve().then(() => console.log(`Promise 2`)); 
// });

// Promise.resolve().then(() => console.log(`Promise.resolve().then() 1`)); 

// setTimeout(() => {
//     console.log('Timer callback 2');
// }, 0);

// queueMicrotask(() => {
//     console.log('queue');
//     queueMicrotask(() =>     console.log('queueMicrotask.log 3'))
// })

// console.log('console.log 3');