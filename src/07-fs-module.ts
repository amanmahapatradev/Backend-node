import path from "node:path";
import fs, { Stats } from 'node:fs'
import fsPromises from 'node:fs/promises'

const DEMO_FOLDER_PATH = path.join(process.cwd(), 'file-system', 'fs-demo')
const SYNC_FILE_PATH = path.join(DEMO_FOLDER_PATH,'sync-node.txt')
const CALLBACK_FILE_PATH = path.join(DEMO_FOLDER_PATH,'callback-node.txt')
const PROMISE_FILE_PATH =path.join(DEMO_FOLDER_PATH, 'promise-node.txt')

type FileResult = {
    style: string,
    fileName: string,
    const: string,
    sizeInBytes: number
}

//  fs -file system
// create folders
// write files
// read files
// check file information
// delete files

// sync apis : fs.readfilesync
// callback apis
// promise apis

// small startup scripts
// build scripts
// local demos

// not good or even bad practice
// http req hendler
// high trafic apis
// background jobs
function ensureDemoFolderExists(): void {
    if(!fs.existsSync(DEMO_FOLDER_PATH)){
        fs.mkdirSync(DEMO_FOLDER_PATH, {recursive: true})
    }
}

function runSyncExample(): FileResult {
    // write content to a file
    fs.writeFileSync(SYNC_FILE_PATH, "created using sync fs", 'utf-8')

    fs.appendFileSync(SYNC_FILE_PATH, "Append using sync fs ", 'utf-8')

    const content = fs.readFileSync(SYNC_FILE_PATH, 'utf-8')

    const stats = fs.statSync(SYNC_FILE_PATH)

    return {
        style: "sync",
        content,
        fileName: path.basename(SYNC_FILE_PATH),
        sizeInByte: stats.size,
    };
}
// callback(error, result)

function runCallbackExample(): Promise<FileResult>{

    return new Promise((resolve,reject) => {
        fs.writeFile(
            CALLBACK_FILE_PATH,"created using callback fs","utf-8",
            (writeError)=>{
                if(writeError){
                    reject(writeError)
                    return
                }
                fs.appendFile(
                    CALLBACK_FILE_PATH,"Append using callback fs","utf-8",
                    (appendError)=> {
                        if(appendError){
                            reject(appendError)
                            return
                        }
                        fs.readFile(CALLBACK_FILE_PATH, 'utf-8', (readError, content)=>{
                            if(readError){
                                reject(appendError)
                                return
                            }
                            fs.stat(CALLBACK_FILE_PATH, (statError, stats)=> {
                                if(statError){
                                    reject(statError)
                                    return
                                }
                                resolve({
                                    style : 'callback',
                                    content,
                                    sizeInBytes : stats.size,
                                    fileName: path.basename(CALLBACK_FILE_PATH),
                                });
                            });
                        });
                    }
                );
            }
            
        );
    });
}

// promise apis
async function runPromiseExample(): Promise<FileResult>{
    await fsPromises.writeFile(
        PROMISE_FILE_PATH,"Created using promise apis","utf-8"
    )

    await fsPromises.appendFile(
        PROMISE_FILE_PATH,"Appended using promise apis","utf-8"
    )

    const content = await fsPromises.readFile(PROMISE_FILE_PATH , 'utf-8')
    const stats = await fsPromises.stat(PROMISE_FILE_PATH)

    return{
        style : 'promise',
        content,
        fileName: path.basename(PROMISE_FILE_PATH),
        sizeInBytes: stats.size,
    }
}

async function main(): Promise<void>{
    try{
        ensureDemoFolderExists()
        const syncResult = runSyncExample()
        const callbackResult = await runCallbackExample()
        const promiseResults = await runPromiseExample()

        console.log(syncResult, callbackResult, promiseResults )
    }catch(error){
        const message = error instanceof Error ? error.message : "unknown error"
        console.error("file system error", message);

    }
}
main()

