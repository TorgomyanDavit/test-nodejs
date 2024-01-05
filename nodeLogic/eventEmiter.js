// eventHandler.js

import { EventEmitter } from 'node:events';


const myEmitter = new EventEmitter();
myEmitter.on('myEvent', (data) => {
  console.log('Event triggered with data:', data);
});

export default myEmitter;