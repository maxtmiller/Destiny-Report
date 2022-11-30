const Koa = require('koa');
const app = new Koa();
const Handlebars = require("handlebars");
var moment = require('moment');
const e = require('express');
moment().format();
const { isContext } = require('vm');
const axios = require('axios');
const { url } = require('inspector');

const fs = require('fs').promises;

app.use(async ctx => {
    let file = await fs.readFile(__dirname + "/webpage-input.html", "UTF-8");
    const template = Handlebars.compile(file);
    ctx.body = (template({ id: id }));
});


//Code on lines 344, 345 used when running server locally
console.log('Server is running on port 3000')
app.listen(3000);