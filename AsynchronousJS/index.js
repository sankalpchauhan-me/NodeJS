const fs = require('fs');
const http = require('http');
const superagent = require('superagent');

//building a promise
const readFilePromise = file=>{
    return new Promise((resolve, reject)=>{
        fs.readFile(file, (err,data)=>{
            if(err) reject('No file found')
            resolve(data);
        })
    })
}

const writeFilePromise = (file, data)=>{
    return new Promise((resolve, reject)=>{
        fs.writeFile(file, data, (err)=>{
            if(err) reject('No file found')
            resolve('success');
        });
    });
};

// ES8 async await
const getDogPic = async() =>{
    try{
    const data = await readFilePromise(__dirname+'/dog.txt');
    console.log(data);

    // Waiting for multiple promises
    const res1 =  superagent.get('https://dog.ceo/api/breed/'+data+'/images/random');
    const res2 =  superagent.get('https://dog.ceo/api/breed/'+data+'/images/random');
    const res3 =  superagent.get('https://dog.ceo/api/breed/'+data+'/images/random');

    const all = await Promise.all([res1, res2, res3]);
    const imgs = all.map(el=> el.body.message);
    console.log(imgs);

    await writeFilePromise('dog-img.txt', imgs.join('\n'));
    console.log('Random Dog Image saved to file');
    }
    catch(err){
    
        console.log(err.message);
        throw err;
    }

    return 'Ready 🐶'
}

(async()=>{
    try{
        console.log('Start getting dog pic');
        const x = await getDogPic();
        console.log(x);
        console.log('Finished Getting dog pic');
    }
    catch(err){
        console.log('ERROR 🎇')
    }

})();

/*
console.log('Start getting dog pic');
//Get dog pic returns a promise
getDogPic().then(x=>{
    console.log(x);
    console.log('Finished Getting dog pic');
});
*/

/* TODO: ES6 Promises
readFilePromise(__dirname+'/dog.txt')
    .then(data=>{
        console.log(data);
        return superagent.get('https://dog.ceo/api/breed/'+data+'/images/random');
    })
    .then(res=>{
    console.log(res.body.message);
    return writeFilePromise('dog-img.txt', res.body.message);
    })
    .then(()=>{
    console.log('Random Dog Image saved to file');
    })
    .catch(err=>{
        console.log(err.message);
    })
*/

    //FALTU CODE BELOW

    // superagent.get('https://dog.ceo/api/breed/'+data+'/images/random')
    // .end((err, res)=>{
    //     if(err) return console.log(err.message);
    //     console.log(res.body.message);

    //     fs.writeFile('dog-img.txt', res.body.message, (err)=>{
    //         console.log('Random Dog Image saved to file');
    //     });
    // })

    //Promises
    // superagent.get('https://dog.ceo/api/breed/'+data+'/images/random') //Superagent library inherently implements promises so we did not need to create one
    // .then(res=>{   //Fulfilled Promise
    //     console.log(res.body.message);
    //     fs.writeFile('dog-img.txt', res.body.message, (err)=>{
    //         console.log('Random Dog Image saved to file');
    //     });
    // })
    // .catch(err=>{  //Unfulfileed Promise
    //     return console.log(err.message);
    // })
