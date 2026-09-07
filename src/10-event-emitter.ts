
// user registered
// send a welcome email
// Write a log
// notify some other service

import  EventEmitter  from "node:events";

// emit one event -> listeners listen to this event, to do something 

// .on() - register one listener
// .once() - register one listener that runs only one time
// .emiot() - triggers an event and sends to the listeners

const appEvents = new EventEmitter()
type UserRegisterPayload = {
    id: number;
    email: string
}
appEvents.on("user:registered", (user:UserRegisterPayload)=>{
    console.log(`email listener: wellcome email sent to the user ${user.email}`);
    
});

appEvents.on("user:registered", (user: UserRegisterPayload)=>{
    console.log(`log listener: user ${user.id} and email id ${user.email}`);
    
});

appEvents.once("app.started", ()=>{
    console.log("once listener: app started")
});

function registerUsesr(): void{
    const user ={
        id: 1,
        email: 'user@gmail.com'
    }
    console.log("user saved");
    appEvents.emit("user:registered", user)
    console.log("register user: event listens completed");
}

appEvents.emit("app.started");
appEvents.emit("app.started");
registerUsesr();