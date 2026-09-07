// env variable
// command line argument
// exit code
// process lifecycle events
// read backend port from env file 
// read secrects - db urls, api keys, password, google auth secret
// process.env

import process from 'node:process'
// dotenv
// const nodeEnv = process.env.NODE_ENV ?? "development"
// pocess.env values are always string or undefined
// const port = Number(process.env.PORT ?? 3000)

// process.argv ->

// {
//     "/path/to/node",
//     "/src/01-process-obj.ts",
//     "start"
// }

const command = process.argv[2] ?? "start";
// fail flag
// crash flag

const shouldFail = process.argv.includes("--fail")
const shouldCrash = process.argv.includes("--crash")
// don't start async here
// node is already shutting down
// final log, final cleanup

process.on("exit", (code) =>{
    console.log(`Process finished with exit code ${code}`);
});

function runApp(): void {
    console.log({
        command,
    });

    if(shouldFail){
        console.error("Manual failure trigered with --fail flag");
        process.exit(1);
    }

    if(shouldCrash){
        console.error("Manual failure trigered with --crash flag");
        process.exit(1);
    }
}
runApp();