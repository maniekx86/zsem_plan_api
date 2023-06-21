// maniek86
// 2023 (c)
// wersja 0.1
const fs = require('fs');
const config = require('./config');

var data = {};

exports.init = (scraper) => {
    data.ok=0;
    fs.readFile(config.dataFile, 'utf8', (err, fileData) => {
        var toScrape=0; 
        if (err) { // ladujemy
            toScrape=1;
        } else {
            try {
                data = JSON.parse(fileData);
            } catch(e) {
                toScrape=1;
            }
        }  
        if(toScrape==1) console.log("Scrapowanie danych gdyz dane sa puste");

        if(toScrape==0) { // Sprawdzmy czy dane nie sa zbyt stare (1 dzien)
            const d=new Date(data.scrapTime);
            const oneDay = 24 * 60 * 60 * 1000; // Odejmujemy dzisiaj od ostatniej daty i sprawdzamy czy jest wieksza niz 1 dzien (24*60*60*1000)
            var dt = new Date();
            dt = dt - d;
            if(dt > oneDay) { 
                toScrape=1;
                console.log("Scrapowanie danych gdyz dane sa zbyt stare");
            }
        }

        // Jezeli dane sa poprawne i byly ostatnio scrapowane to po co jeszcze raz przeciazac biedne serwery szkolne
        if(toScrape==1) {
            scraper.scrape().then((newData) => {
                data = newData;
                saveDataToFile();
            }); 
        }
    });
};

exports.rescrape = (scraper) => {
    data.ok=0;
    scraper.scrape().then((newData) => {
        data = newData;
        saveDataToFile();
    });
};


exports.getData = () => {
    return data;
};

exports.setData = (newData) => {
    data = newData;
    saveDataToFile();
};

exports.isReady = () => {
    return data.ok;
};

const saveDataToFile = () => {
    fs.writeFile(config.dataFile, JSON.stringify(data,null,2), (err) => {
        if (err) {
            console.error('Nie mozna zapisac danych do pliku', err);
            process.exit(1);
        }
    });
};