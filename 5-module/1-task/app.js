const Koa = require('koa');
const app = new Koa();

app.use(require('koa-static')('public'));
app.use(require('koa-bodyparser')());

const Router = require('koa-router');
const router = new Router();

var subscribe = [];
var response = '';

async function pushMessage(ctx) {
    subscribe[subscribe.length] = ctx;
    while (response !== '')   {
        console.log(response);
        subscribe.forEach((listiner) => {
            listiner.body = response;
        });
        subscribe = [];
        response = ''
    }

}



router.get('/subscribe', async (ctx, next) => {


    var x = await new Promise( resolve =>{
    try {
        pushMessage(ctx);
    } catch (err) {
        console.log(err);
    }
    });

    x().then();

    

    //await next();
/*
    await new Promise( resolve => {
        console.log("1");
        while (response !== '') {};
        resolve(response);
        
    }).then(function (response) {
        console.log(response);
        ctx.body = response;
    }) ;
*/


});

router.post('/publish', async (ctx, next) => {
    if (ctx.request.body.message === "" ) return next(); 
    response = ctx.request.body.message;
    
});

app.use(router.routes());

module.exports = app;
