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

        try {
            const search_player = await destiny.searchDestinyPlayer(-1, name);
            const data_search_player = search_player.Response;
            let membershipId = data_search_player[0].membershipId;
            let membershipType = data_search_player[0].membershipType;
            membershipId = membershipId.toString();

            const get_profile = await destiny.getProfile(membershipType, membershipId, [100]);
            const data_get_profile = get_profile.Response;
            const characterIds = data_get_profile.profile.data.characterIds;
            console.log(data_get_profile);

            const get_history = await destiny.getActivityHistory(membershipType, membershipId, characterIds[0], { count: [5], mode: [63] });
            const data_get_history = get_history.Response;
            let values = data_get_history.activities[0].values;
            console.log(data_get_history);
            console.log(values)

            const get_stats = await destiny.getHistoricalStats(membershipType, membershipId, characterIds[0], { mode: [63], groups: [1] });
            const data_get_stats = get_stats.Response;
            let stats = data_get_stats. allPvECompetitive;
            console.log(stats) 

        } catch (error) {
            console.log(`Error: ${error}`);
        }

        //let player = destiny.searchDestinyPlayer(-1, name).then( (res) => { const data = res.Response; id = data[0].membershipId; return id; }, (message) => { document.write(message); }).catch(err => { console.error(`searchPlayer Error: ${err}`); });
        //let myPromise = new Promise(destiny.searchDestinyPlayer(-1, name).then( (res) => { const data = res.Response; res = data[0].membershipId; return ++res; }).catch(err => { console.error(`searchPlayer Error: ${err}`); }));
        //let get_profile = destiny.getProfile(1, search_player, [100]).then(res => { console.log(res.Response); }).catch(err => { console.error(`getProfile Error: ${err}`); });

        //let file = await fs.readFile(__dirname + "/profile.html", "UTF-8");
        let file = await fs.readFile(__dirname + "/navbar.html", "UTF-8");
        //let file = await fs.readFile(__dirname + "/dropdown.html", "UTF-8");
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