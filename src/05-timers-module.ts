// after some delay
// repeatedly after some interval -2 seconds

// settimeout
// setinterval
// cleartimeout
// clearinterval
// setimmediate
import {setTimeout as sleep } from 'node:timers/promises'

function runSetTimeoutExample(): void{
    console.log('1. setTimeout example started');
    
    setTimeout(()=>{
        console.log('2. This runs after 1second')
    },1000);
    console.log("3. this run immediately . node doesn't wait");
}

function runClearTimeoutExample(): void{
    const timerId = setTimeout(() => {
        console.log('this message will not run');
    },2000)
    clearTimeout(timerId)
    console.log("4. cleartimeout cancelled the 2 second timer")
}

// setinterval is going to run the callback again and again after the fixed delay
function runSetIntervalExample(): void{
    let count = 0;
    const intervalId = setInterval(()=> {
        count++
        console.log(`5. setInterval tick: ${count}`);
        if(count === 3){
            clearInterval(intervalId)
            console.log("6. setInterval Stoped")
        }
    },500)
}

function runSetImmediateExample(): void{
    setImmediate(() => {
        console.log("7. setImmediate callback");
    })
    console.log("8. sunchronous code after runSetIntervalExample.");
}

async function runPromiseTimeExample(): Promise<void>{
    console.log("9. Waiting for prpomise based timer");
    await sleep(5500)
    console.log("10. promise based time finishes after 5.5 seconds")
}
function runTimerDemo(): void {
    runSetTimeoutExample();
    runClearTimeoutExample();
    runSetIntervalExample();
    runSetImmediateExample();
}
runTimerDemo();
runPromiseTimeExample().catch((error: unknown) => {
    console.error("time based demo failed", error);
});