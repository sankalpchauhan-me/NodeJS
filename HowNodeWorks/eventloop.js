const fs = require('fs');
//const time = require
const crypto = require('crypto');
const start = Date.now();

//Setting threadpool with custom numbers of thread
process.env.UV_THREADPOOL_SIZE = 5;

//these are not in event loop as these are not in callback function
setTimeout(()=> console.log('Timer 1 Finished'),0);
setImmediate(()=> console.log("Immediate 1 Finished"));
fs.readFile("test-file.js", ()=>{
    console.log("IO Finished");

     // These would block the code exection and these will not be in the event loop
    //  crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512');
    //  console.log(Date.now()-start, "Password Encrypted");
 
    //  crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512');
    //  console.log(Date.now()-start, "Password Encrypted");
 
    //  crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512');
    //  console.log(Date.now()-start, "Password Encrypted");
 
    //  crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512');
    //  console.log(Date.now()-start, "Password Encrypted");

    //THese are in Event Loop as these are in callback
    setTimeout(()=> console.log('Timer 2 Finished'),0);
    setTimeout(()=> console.log('Timer 3 Finished'),3000);
    setImmediate(()=> console.log("Immediate 2 Finished"));
    process.nextTick(()=> console.log("process.nextTick"));

    //Event loop uses 4 threads by default would not block code execution
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', ()=>{
        console.log(Date.now()-start, "Password Encrypted");
    });

    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', ()=>{
        console.log(Date.now()-start, "Password Encrypted");
    });

    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', ()=>{
        console.log(Date.now()-start, "Password Encrypted");
    });

    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', ()=>{
        console.log(Date.now()-start, "Password Encrypted");
    });

    //This would be exected after as this will be transferred to thread 1
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', ()=>{
        console.log(Date.now()-start, "Password Encrypted");
    });

})
console.log("Hello from the top level code");