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


const fs = require('fs').promises;
const fsp = require('fs');
const jsdom = require("jsdom");
const { sign } = require('crypto');
const { profileEnd } = require('console');
const { JSDOM } = jsdom;
const fetch = (url) => import('node-fetch').then(({default: fetch}) => fetch(url));

const Destiny2API = require('node-destiny-2');
let config = JSON.parse(fsp.readFileSync(__dirname +"/config/grconfig.json"));
let apiKEY = config.apikey;
const destiny = new Destiny2API({key: apiKEY});

var isFashion = false;
var isGambit = false;
var isXur = false;
var signIn = false;
let membershipID = "";

app.use(async ctx => {
    

    if (ctx.request.query.profile || ctx.request.query.account) {
        let BungieName = ctx.request.query.profile;
        //let config = JSON.parse(fsp.readFileSync(__dirname +"/config/grconfig.json"));
        let destinyURL = destiny.oauthConfig.url;
        let clientID = config.oauth_client_id;
        let clientSecret = config.oath_secret_id;
        //console.log(`${destinyURL}?client_id=${clientID}&response_type=code`)

        if (ctx.request.query.account) {
            signIn = true

            membershipID = ctx.request.query.account;
        }

        if (ctx.request.query.profile) {
            try {
                const search_player = await destiny.searchDestinyPlayer(-1, BungieName);
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
                console.log(stats);


            } catch (error) {
                console.log(`Error: ${error}`);
            }
        }

        let file = await fs.readFile(__dirname + "/navbar.html", "UTF-8");
        const template = Handlebars.compile(file);
        ctx.body = (template({ destinyURL: destinyURL, clientID: clientID, isFashion: isFashion, isGambit: isGambit, isXur: isXur, signIn: signIn, membershipID: membershipID }));

    } else {
        signIn = false;
        membershipID = "";

        let config = JSON.parse(fsp.readFileSync(__dirname +"/config/grconfig.json"));
        let destinyURL = destiny.oauthConfig.url;
        let clientID = config.oauth_client_id;

        let file = await fs.readFile(__dirname + "/navbar.html", "UTF-8");
        const template = Handlebars.compile(file);
        ctx.body = (template({ destinyURL: destinyURL, clientID: clientID, isFashion: isFashion, isGambit: isGambit, isXur: isXur, signIn: signIn }));
    }


});

//Code to run server locally
console.log('Server is running on port 3000')
app.listen(3000);
