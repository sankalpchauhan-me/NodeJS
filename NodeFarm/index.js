const fs = require('fs');
const http = require('http');
const url = require('url');
//in require . points to dirname
const replaceTemplate = require('./modules/replacetemplate')

///////////
//FILES
//Blocking Sync Way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// const textOut = 'We are talking about avacado:'+textIn+'.\nCreated on'+Date.now();
// console.log(textOut);
// fs.writeFileSync('./txt/output.txt', textOut);

//Non Blockibng Async way
// fs.readFile('./txt/start.txt', 'utf-8', (err,data1)=>{
//     fs.readFile('./txt/'+data1+'.txt', 'utf-8', (err, data2)=>{
//         console.log(data2);
//         fs.readFile('./txt/append.txt', 'utf-8', (err,data3)=>{
//             console.log(data3);
//             fs.writeFile('./txt/final.txt', data2+'\n'+data3, (err)=>{
//                 console.log('Data write success');
//             })
//         })
//     });
// });

///////////
//SERVER

// const replaceTemplate = (temp, product)=>{
//     let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
//     output = output.replace(/{%IMAGE%}/g, product.image);
//     output = output.replace(/{%PRICE%}/g, product.price);
//     output = output.replace(/{%FROM%}/g, product.from);
//     output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
//     output = output.replace(/{%QUANTITY%}/g, product.quantity);
//     output = output.replace(/{%DESCRIPTION%}/g, product.description);
//     output = output.replace(/{%ID%}/g, product.id);

//     if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');

//     return output;
// }

const tempOverview = fs.readFileSync(__dirname+'/templates/template-overview.html','utf-8');
const tempCard = fs.readFileSync(__dirname+'/templates/template-card.html','utf-8');
const tempProduct = fs.readFileSync(__dirname+'/templates/template-product.html','utf-8');
const jsondata = fs.readFileSync(__dirname+'/dev-data/data.json','utf-8');
const dataObj = JSON.parse(jsondata);
//console.log(packagedata);

const server = http.createServer((request1, response1)=>{
    //const pathName = request1.url;
    //In ES 6 if we use the exact same name as the variable stores it will automatically get stored in there respective variables
    const {query, pathname} = url.parse(request1.url, true);

    //Overview page
    if(pathname==='/' || pathname==='/overview'){
        response1.writeHead(200,{
            'Content-type':'text/html'
        }); 
        //if we don't have curly braces the value is automatically returned 
        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        response1.end(output);
    }

    //Product page
    else if(pathname==='/products'){
        //console.log(query.id);
        response1.writeHead(200,{
            'Content-type':'text/html'
        }); 
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct,product)
        response1.end(output);
    }

    //api
    else if(pathname==='/api'){
        response1.writeHead(200,{
            'Content-type':'application/json'
        });
        response1.end(jsondata);
        //response1.end('This is api');
    }
    else{
        response1.writeHead((404),{
            'Content-type':'text/html',
            'mera-tag':'helloworld'
        });
        response1.end("<h1>GALAT TYPE KAR DIYA TUNE</h1>");
    }
    
});

server.listen(8000,'127.0.0.1', ()=>{
    console.log('Lisgtening to server');
})
