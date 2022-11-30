const Koa = require('koa');
const app = new Koa();
var XMLHttpRequest = require('xhr2');
const Handlebars = require("handlebars");
var moment = require('moment');
const e = require('express');
moment().format();
const { isContext } = require('vm');
const axios = require('axios');
const { url } = require('inspector');
const Destiny2API = require('node-destiny-2');
const destiny = new Destiny2API({key: 'f679d078d8014a2b80c7bb88929809a8'});

const fs = require('fs').promises;

app.use(async ctx => {
    if (ctx.request.query.login) {
        let name = ctx.request.query.login;

        destiny.searchDestinyPlayer(-1, name)
            .then(res => {
                const data = res.Response;
                var id = data[0].membershipId

                // console.log(data);
                // console.log('\n\n');
            });
        
        destiny.getProfile(1, id, [100])
            .then(res => {
                console.log(res.Response);
            })
            .catch(err => {
                console.error(`getProfile Error: ${err}`);
            });

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