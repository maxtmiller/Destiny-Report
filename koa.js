const Koa = require('koa');
const app = new Koa();
const Handlebars = require("handlebars");
var moment = require('moment');
const e = require('express');
moment().format();
const { isContext } = require('vm');
const axios = require('axios');
const { url } = require('inspector');
const Destiny2API = require('node-destiny-2');
const destiny = new Destiny2API({key: 'your-api-key'});

const fs = require('fs').promises;

app.use(async ctx => {
    if (ctx.request.query.login) {
        let id = await _____.resolve(ctx.request.query.login);
        let url = ctx.request.query.login;

        let file = await fs.readFile(__dirname + "/profile.html", "UTF-8");
        const template = Handlebars.compile(file);
        ctx.body = (template({ }));

    } else {
        let file = await fs.readFile(__dirname + "/profile-set.html", "UTF-8");
        const template = Handlebars.compile(file);
        ctx.body = (template({ }));
    }
});


//Code to run server locally
console.log('Server is running on port 3000')
app.listen(3000);