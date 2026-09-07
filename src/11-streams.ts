
// piece by piece
// not loading the data everything at once 
// read large files
// upload files
// Downloading files
// video/audio processing
// cmpression 

import { Readable, Transform, Writable } from "node:stream";
import {pipeline} from "node:stream/promises"

// chunks

// here is my full 500mb file
//  here is chunk 1
//  here is chunk 2
//  here is chunk 3
//  here is chunk 4
//  here is chunk 5

// memory effect 

// streams types
// readable stream - source of data
// writable stream - destribution where the data is written 
// transform stream - read the data change it and pass that porward

const readableStream = Readable.from([
    "hello","form","node.js","streams"
])

// callback(error, result)

const uppercaseTransform = new Transform({
    transform(chunk, encoding, callback){
        const text = chunk.toString();

        callback(null, text.toUpperCase())
    }
})
const writableString = new Writable({
    write(chunk, encoding, callback){
        console.log('received chunk', chunk.toString());

        callback()
    }
})

async function main(): Promise<void>{
    try{
        await pipeline( readableStream, uppercaseTransform, writableString)

        console.log("steam completed");
        
    }catch(error){
        const msg = error instanceof Error ? error.message : "unknown error"
        console.log("stream files", msg);
    }
}

main();