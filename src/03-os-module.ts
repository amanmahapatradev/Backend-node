// os
// cpu info
// memory
// home/temp dir

import * as os from 'node:os';
function runOsDemo(): void{
    console.log('platform', os.platform());
    console.log("architechure", os.arch());
    console.log("os type", os.type());
    console.log("os release", os.release());
    console.log("home dir", os.homedir());
    console.log("temp dir", os.tmpdir());

    const cpus = os.cpus();
    console.log(cpus.length);
    if(cpus.length > 0){
        console.log('First CPU model', cpus[0].model, cpus[0].speed, cpus[0].times)
    }
    console.log(os.totalmem(), os.freemem());
}
runOsDemo();