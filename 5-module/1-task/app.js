const Koa = require('koa');
const app = new Koa();

app.use(require('koa-static')('public'));
app.use(require('koa-bodyparser')());

const Router = require('koa-router');
const router = new Router();

const clients = new Set();


router.get('/subscribe', async (ctx, next) => {
    const message = await new Promise( resolve => {
        clients.add(resolve);

        ctx.res.on('close', () => {
            if (ctx.res.finished) return;
            clients.delete(resolve);
            resolve();
        })
    });

    ctx.body = message;

});

router.post('/publish', async (ctx, next) => {
    const message = ctx.request.body.message;
    if (!message) return next();

    for (const client of clients) {
        client(message);
    }
    clients.clear();
    ctx.body = 'ok';
 
});

app.use(router.routes());

module.exports = app;
