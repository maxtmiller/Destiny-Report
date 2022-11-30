const Koa = require('koa');
const app = new Koa();
const Handlebars = require("handlebars");
var moment = require('moment');
const e = require('express');
moment().format();
const { isContext } = require('vm');
const axios = require('axios');
const { destiny_name } = require('inspector');
const Destiny2API = require('node-destiny-2');
const destiny = new Destiny2API({
	key: 'f679d078d8014a2b80c7bb88929809a8'
	});

const fs = require('fs').promises;

destiny.searchDestinyPlayer(-1, 'destiny_name')
    .then(res => {
        const data = res.Response;
        console.log(data);
        console.log('\n\n');
	
app.use(async ctx => {
    if (ctx.request.query.login) {
        let id = await _____.resolve(ctx.request.query.login);
        let destiny_name = ctx.request.query.login;

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