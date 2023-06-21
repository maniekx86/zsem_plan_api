// maniek86
// 2023 (c)
// działa na dzień 2023/06/21
// wersja 0.1
const express = require("express");
const schedule = require('node-schedule');
const config = require("./moduly/config");
const api = require("./moduly/api");

const app = express();

app.use(express.json());

const scraper = require("./moduly/scraper");
const store = require("./moduly/store");

store.init(scraper);
var theInterval = setInterval(function() {
    if(store.isReady()) {
        clearInterval(theInterval);
        api.refresh(store.getData());
        console.log("API gotowe!");
        api.apiSet(app);
        console.log("ZSEM_PLAN_API Gotowy!");
    }
}, 500);



app.listen(config.port, () => {
  console.log(`Serwer dziala na porcie ${config.port}`);
});

const j = schedule.scheduleJob({hour: config.scrapTimeHour, minute: config.scrapTimeMinute}, () => {
    console.log("Dzienne scrapowanie planu...");
    store.rescrape(scraper);
    var theInterval = setInterval(function() {
        if(store.isReady()) {
            clearInterval(theInterval);
            api.refresh(store.getData());
            console.log("API odswiezone!");
        }
    }, 500);
});

