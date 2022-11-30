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
const destiny = new Destiny2API({
	key: 'f679d078d8014a2b80c7bb88929809a8'
	});

const fs = require('fs').promises;

destiny.getProfile(1, '4611686018457028598', [100])
    .then(res => {
        console.log(res.Response);
    })
    .catch(err => {
        console.error(`getProfile Error: ${err}`);
    });


app.use(async ctx => {
    if (ctx.request.query.login) {
        let id = await _____.resolve(ctx.request.query.login);
        let url = ctx.request.query.login;

        let file = await fs.readFile(__dirname + "/profile.html", "UTF-8");
        const template = Handlebars.compile(file);
        ctx.body = (template({ }));

    } else {

        let games = destiny.GetBungieApplications;
        console.log(games);
        let file = await fs.readFile(__dirname + "/profile-set.html", "UTF-8");
        const template = Handlebars.compile(file);
        ctx.body = (template({ games: games }));
    }
});

//Code to run server locally
console.log('Server is running on port 3000')
app.listen(3000);