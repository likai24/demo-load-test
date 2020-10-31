const Koa = require('koa');
const app = new Koa();

let count=0;
let timer = setInterval(()=>{
  console.log(count);
}, 1000)
// logger

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  // console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// response

app.use(async ctx => {
  ctx.body = "Hello World\n";
  count++;
});


app.listen(3000);