// Scraper (2023-06-21)
// maniek86
// 2023 (c)
// wersja 0.1

// Nadal dziala...

const { JSDOM } = require("jsdom")
const https = require('https');


function nazwaPrzedmiotu(przedmiot) { // Konwersja skroconej nazwy przedmiotu na pelna 
    // Oznaczenie ?? oznacza przedmioty ktorych nie znam albo nie jestem pewny
    switch(przedmiot) {
        case "biologia": return "Biologia";
        case "j.ang": return "Język angielski";
        case "his_ter": return "Historia i teraźniejszość";
        case "ukł.cyfrowe": return "Układy cyfrowe";
        case "ukł.analogow": return "Układy analogowe";
        case "godz.wych": return "Godzina wychowawcza";
        case "historia": return "Historia";
        case "elektrotechn": return "Elektrotechnika";
        case "chemia": return "Chemia";
        case "j.polski": return "Język polski";
        case "wf": return "Wychowanie fizyczne";
        case "matematyka": return "Matematyka";
        case "r_matematyka": return "Matematyka";
        case "fizyka": return "Fizyka";
        case "rys.tech": return "Rysunek techniczny";
        case "j.niemiecki": return "Język niemiecki";
        case "religia": return "Religia";
        case "informatyka": return "Informatyka";
        case "r_informat.": return "Informatyka";
        case "BHP": return "Bezpieczeństwo i higiena pracy";
        case "j.niem.zaw": return "Język niemiecki zawodowy";
        case "filozofia": return "Filozofia";
        case "geografia": return "Geografia";
        case "e_dla_bezp": return "Edukacja dla bezpieczeństwa";
        case "r_j.ang": return "Język angielski";
        case "WDZ": return "Wychowanie do życia w rodzinie";
        case "p.przedsięb.": return "Podstawy przedsiębiorczości";
        case "j.ang.zaw": return "Język angielski zawodowy";
        case "r_fizyka": return "Fizyka";

        case "podst.infor": return "Podstawy informatyki"; // ??
        case "pra.str.apk": return "pra.str.apk"; // ??
        case "prac.baz.dan": return "prac.baz.dan"; // ??
        case "inst.elektr": return "Instalacje elektryczne"; // ??
        case "adm.sys.op": return "Administracja systemów operacyjnych"; // ??
        case "e.urz.t.komp": return "e.urz.t.komp"; // ??
        case "lok.sie.komp": return "lok.sie.komp"; // ??
        case "Sys.op": return "Systemy operacyjne";
        case "UTK": return "UTK"; // ??
        case "syst.bd": return "Systemy baz danych"; // ??
        case "pom.elektr.e": return "Pomiary elektryczne"; // ??
        case "syst.telew": return "syst.telew"; // ??
        case "maszyny.el": return "maszyny.el"; // ??
        case "syst.KD": return "syst.KD"; // ??
        case "ap.i.urz.ele": return "ap.i.urz.ele"; // ?? wtf
        case "syst.sieci.k": return "syst.sieci.k"; // ??
        case "mon.konf.lan": return "mon.konf.lan"; // ??
        case "techn.i.k.me": return "techn.i.k.me"; // ??
        case "urz.i.syst.m": return "urz.i.syst.m"; // ??
        case "str.apk.int": return "str.apk.int"; // ??
        case "sieci.komp": return "Sieci komputerowe"; // ??
        case "a.s.sys.komp": return "a.s.sys.komp"; // ??
        case "witr.i.apl.i": return "witr.i.apl.i"; // ??
        case "pneum.i.hydr": return "pneum.i.hydr"; // ??
        case "prog.str.obi": return "prog.str.obi"; // ??
        case "prac.apk.web": return "prac.apk.web"; // ??
        case "m.ur.sys.t.d": return "m.ur.sys.t.d"; // ??
        case "kon.sys.komu": return "kon.sys.komu"; // ??
        case "konf.urz.sie": return "konf.urz.sie"; // ??
        case "sys.tran.dan": return "sys.tran.dan"; // ??
        case "sys.kom": return "sys.kom"; // ??
        case "pr.te.do.apk": return "pr.te.do.apk"; // ??
        case "prog.apk.mob": return "Programowanie aplikacji mobilnych"; // ??
        case "Pr.urz.mikr": return "Pr.urz.mikr"; // ??
        case "t.st.apk.int": return "t.st.apk.int"; // ??
        case "proj.b.dan": return "Projektowanie baz danych"; //??
        //case "": return "";
        default: return przedmiot+"(ERR)";
    }

} // (loo jacie ile my tu mamy przedmiotow w tym elektryku)


function czyInternat(sala) { 
    switch(sala) { // nazwy sal na planie w roznych miejscach sa rozne...
        case "prautom": return 1;
        case "sj1": return 1;
        case "sj2": return 1;
        case "sj3": return 1;
        case "sj4": return 1;
        case "sj5": return 1;
        case "sj6": return 1;
        case "sj7": return 1;
        case "pe1": return 1;
        case "pe2": return 1;
        case "pe3": return 1;
        case "pe4": return 1;
        case "106": return 1;
        case "107": return 1;
        case "108": return 1;
        case "109": return 1;

        case "s.język. 1": return 1;
        case "s.język. 2": return 1;
        case "s.język. 3": return 1;
        case "s.język. 4": return 1;
        case "s.język. 5": return 1;
        case "s.język. 6": return 1;
        case "s.język. 7": return 1;
        case "pr.elektr. 3": return 1;
        case "pr.elektr. 4": return 1;
        case "pr.autom.": return 1;
        case "pr.inf. 106": return 1;
        case "pr.inf. 107": return 1;
        case "pr.inf. 108": return 1;
        case "pr.inf. 109": return 1;
        //case "": return 1;
        default: return 0;
    }
}

function nazwaNaNumer(sala) {
    switch(sala) { // Numer/krotka nazwa sali w szkole wedlug jej nazwy
        case "4": return "4";
        case "pr.utk 5": return "5";
        case "pr.utk 6": return "6";
        case "7": return "7";
        case "pr.telek. 8": return "8";
        case "11": return "11";
        case "s.gimn. 1": return "sg1";
        case "12": return "12";
        case "13": return "13";
        case "14": return "14";
        case "pr.sis 15": return "15";
        case "16": return "16"; // gdzie sie podzialy sale od 17 - 37 w tej szkole ?!?!
        case "pr.inf. 38": return "38";
        case "s.gimn. 2": return "sg2";
        case "pr.inf. 39": return "39";
        case "40": return "40";
        case "41": return "41";
        case "42": return "42";
        case "43": return "43";
        case "44": return "44";
        case "s.gimn. 3": return "sg3";
        case "45": return "45";
        case "46": return "46";
        case "47": return "47";
        case "48": return "48";
        case "51": return "51";
        case "52": return "52";
        case "s.gimn. 4": return "sg4";

        case "s.język. 1": return "sj1";
        case "s.język. 2": return "sj2";
        case "s.język. 3": return "sj3";
        case "s.język. 4": return "sj4";
        case "s.język. 5": return "sj5";
        case "s.język. 6": return "sj6";
        case "s.język. 7": return "sj7";
        case "pr.elektr. 3": return "pe3";
        case "pr.elektr. 4": return "pe4";
        case "pr.autom.": return "prautom";
        case "pr.inf. 106": return "106";
        case "pr.inf. 107": return "107";
        case "pr.inf. 108": return "108";
        case "pr.inf. 109": return "109";

        //case "": return "";
        default: return "";
    }
}



const fetchURL = async (url) => { // Pobieranie klas
    return new Promise((resolve, reject) => {
        const options = {
            hostname: "zsem.edu.pl",
            path: "/plany/"+url,
            method: 'GET'
        };

        const req = https.request(options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                
                resolve(data);
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        req.end();
    });
}

// Aktualne fixy:
/*
> Fix nazwy sali bez linku "106 (wcześniej pe1)"
> Recznie dodanie w kodzie "salki Katechetycznej" (id 43), zsem.edu.pl/plany/plany/s43.html
*/


exports.scrape = async () => {
    var newData = {};

    // 1. lll.php - przyciski odnoszace do planow lekcji klas. Tutaj pobierzemy liste aktualnych klas
    console.log("Parsowanie klas");
    var result = await fetchURL("lll.php");

    var { document } = new JSDOM(result).window;
    
    newData.klasy=[];

    var links = document.querySelectorAll("a:not(.hidden)");
    links.forEach(function(link, i, listObj) {
        var href = link.getAttribute("href");
        var button = link.querySelector("button");

        if (button) {
            if(!href.endsWith(".html")) return; // Linki nie konczonce sie na .html nie sa planami lekcji 

            var nazwaKlasy=button.textContent;
            var praktyki=0;
            var href=link.getAttribute("href");
            var id=Number(href.substring(href.indexOf("/o") + 2, href.lastIndexOf(".html")));
            

            if(nazwaKlasy.endsWith("prakt.")) {
                nazwaKlasy=nazwaKlasy.substring(0,nazwaKlasy.length-6);
                praktyki=1;
            }

            newData.klasy.push({id: id, nazwa: nazwaKlasy, link: href, praktyki: praktyki});

            //onsole.log("Klasa: ", nazwaKlasy, href, praktyki);
        }
    });
    
    // 2. nnn.php - Nauczyciele
    console.log("Parsowanie nauczycieli");
    result = await fetchURL("nnn.php");

    var { document } = new JSDOM(result).window;
    
    newData.nauczyciele=[];

    var links = document.querySelectorAll("a:not(.hidden)");
    links.forEach(function(link, i, listObj) {
        var href = link.getAttribute("href");
        var button = link.querySelector("button");

        if (button) {
            if(href===null) return;
            if(!href.endsWith(".html")) return; // Linki nie konczonce sie na .html nie sa nauczycielami

            var nauczyciel=button.textContent;
            var href=link.getAttribute("href")
            var id=Number(href.substring(href.indexOf("/n") + 2, href.lastIndexOf(".html")));;

            newData.nauczyciele.push({id: id, nazwa: nauczyciel, link: href});

        }
    });

    // 3. ss2.php/sss.php - Sale
    console.log("Parsowanie sal");
    result = await fetchURL("ss2.php");

    var { document } = new JSDOM(result).window;
    
    newData.sale=[];

    var links = document.querySelectorAll("a:not(.hidden)");
    links.forEach(function(link, i, listObj) {
        var href = link.getAttribute("href");
        var button = link.querySelector("button");

        if (button) {
            if(href===null) return;
            if(!href.endsWith(".html")) return; // Linki nie konczonce sie na .html nie sa salami

            var sala=button.textContent;
            var href=link.getAttribute("href")
            var id=Number(href.substring(href.indexOf("/s") + 2, href.lastIndexOf(".html")));
            var numer=nazwaNaNumer(sala);
            if(numer=="") {
                console.log(`Ostrzezenie podczas parsowania: sala ${sala} nie ma numeru w kodzie`);
            }

            newData.sale.push({id: id, nazwa: sala, czyInternat: czyInternat(sala), link: href, numer: numer});

        }
    });

    // Ta sala nie znajduje sie na ss2.php, musimy ja recznie dodac
    newData.sale.push({id: 43, nazwa: "Salka Katechetyczna w kościele NSPJ", czyInternat: 2, link: "plany/s43.html", numer: "SKat"});

    /// -- Plany lekcji --
    // Sam plan lekcji: plany/o*.html
    // pora zrobic cos zlego dla serwera szkolnego: pobranie wszystkiego na raz hahah

    newData.plany={};

    for(var p=0;p<newData.klasy.length;p++) {
    
        result = await fetchURL(newData.klasy[p].link);
        //console.log(result);

        ///// Parsowanie dla jednej klasy //////

        var { document } = new JSDOM(result).window;

        // Musimy wiedziec jaka klase aktualnie parsujemy i jej id
        var klasa=document.getElementsByClassName("tytulnapis")[0].textContent;
        var klasa_nazwa="";
        var klasa_pelna_nazwa="";
        var klasa_id=0;
        var ssp=" - ";
        if(klasa.indexOf(" - ")==-1) { // separator jest spacja a nie -
            ssp=" ";
        }
        klasa_nazwa=klasa.substring(0,klasa.indexOf(ssp)).toUpperCase();
        klasa_pelna_nazwa=klasa.substring(klasa.indexOf(ssp)+ssp.length);
        if(klasa_pelna_nazwa.startsWith("1")||klasa_pelna_nazwa.startsWith("2")||klasa_pelna_nazwa.startsWith("3")||klasa_pelna_nazwa.startsWith("4")) klasa_pelna_nazwa=klasa_pelna_nazwa.substring(1); // Pozbycie sie numeru poczatku nazwy klas 
        klasa_id=newData.klasy[newData.klasy.findIndex(x => x.nazwa === klasa_nazwa)].id;
        console.log(`Parsowanie klasy ${klasa_nazwa} (${p}/${newData.klasy.length})`);

        var table = document.getElementsByClassName("tabela")[0];
        var acells = table.querySelectorAll("tr");

        // Inicjalizacja zmiennych
        newData.plany["_"+klasa_nazwa] = {};
        newData.plany["_"+klasa_nazwa].pon = {};
        newData.plany["_"+klasa_nazwa].wt = {};
        newData.plany["_"+klasa_nazwa].sr = {};
        newData.plany["_"+klasa_nazwa].czw = {};
        newData.plany["_"+klasa_nazwa].pt = {};

        acells.forEach(function(cell, i, listObj) {
            cell.childNodes.forEach(function(n, b, listObj) { // Pierwsza lekcja w tabeli zawsze jest lekcja 1
                if(b<5) return;
                if(i==0) return;
                if(n.nodeType !== 1) return;

                var insObj={leckja: i};

                var spanLen = n.querySelectorAll("span").length; // 2 i wiecej spanow to jest podzial 


                if(spanLen==1) { ///// Bez podzialu grupowego
                    var spantxt=n.querySelector("span");
                    
                    // Sam przedmiot
                    insObj.przedmiot={
                        nazwa: spantxt.textContent,
                        pelna_nazwa: nazwaPrzedmiotu(spantxt.textContent)
                    };

                    // Pobieranie sali
                    var salaE=n.getElementsByClassName("s")[0];
                    var salaStr;

                    /// Fix dla glupiego "106 (wczesniej pe1)" w glupim miejscu bez atrybutu href 
                    if(salaE.textContent=="106 (wcześniej pe1)") {
                        salaStr=newData.sale[newData.sale.findIndex(x => x.nazwa === "pr.inf. 106")].link;
                        salaStr=salaStr.substring(salaStr.lastIndexOf("/"));
                    } else {
                        salaStr=salaE.getAttribute("href");
                    }
                    ///
                    var salaId, nazwaSali;
                    try {
                        salaId=Number(salaStr.substring(salaStr.indexOf("s") + 1, salaStr.lastIndexOf(".html")));
                        nazwaSali=newData.sale[newData.sale.findIndex(x => x.id === salaId)].nazwa; // wykorzystajmy nazwe sali z strony sal
                    } catch(e) { // nie ma takiej sali?
                        salaId=-1;
                        nazwaSali="";
                        console.log(`Ostrzezenie podczas parsowania: sala ${salaStr} nie istnieje`);
                    }
                    
                    insObj.sala={
                        id: salaId,
                        nazwa: nazwaSali,
                        internat: czyInternat(nazwaSali),
                        numer: nazwaNaNumer(nazwaSali)
                    }

                    // Nauczyciel
                    var nauczycielE=n.getElementsByClassName("n")[0];
                    var nauczycielStr=nauczycielE.getAttribute("href");
                    var nauczycielId, nazwaNauczyciela;
                    try {
                        nauczycielId=Number(nauczycielStr.substring(nauczycielStr.indexOf("n") + 1, nauczycielStr.lastIndexOf(".html")));
                        nazwaNauczyciela=newData.nauczyciele[newData.nauczyciele.findIndex(x => x.id === nauczycielId)].nazwa; // wykorzystajmy nazwe nauczyciela z listy
                    } catch(e) { // nie ma takiego nauczyciela?
                        nauczycielId=-1;
                        nazwaNauczyciela="";
                        console.log(`Ostrzezenie podczas parsowania: nauczyciel ${nauczycielStr} nie istnieje`); 
                    }
                    
                    insObj.nauczyciel={
                        id: nauczycielId,
                        nazwa: nazwaNauczyciela
                    }


                } else if(spanLen>1) { // Podzial grupowy

                    var allspans=n.querySelectorAll(":scope > span"); // zeby nie szukalo spanow w spanach

                    allspans.forEach(function(theSpan,z, listObj) { // Dla kazdego spanu (Grupy)
                        
                        var spantxt=theSpan.querySelector("span").textContent;
                        var ttxt=spantxt.substring(0,spantxt.length-4);
                        var grupa=spantxt.substring(spantxt.length-3,spantxt.length-2); // Pobranie numeru grupy (string!)

                        // Przedmiot
                        insObj["grupa"+grupa]={};
                        insObj["grupa"+grupa].przedmiot={
                            nazwa: ttxt,
                            pelna_nazwa: nazwaPrzedmiotu(ttxt)
                        };

                        // Sala
                        var salaE=theSpan.getElementsByClassName("s")[0];
                        var salaStr;
                        /// Fix dla glupiego "106 (wczesniej pe1)" w glupim miejscu bez atrybutu href 
                        if(salaE.textContent=="106 (wcześniej pe1)") {
                            salaStr=newData.sale[newData.sale.findIndex(x => x.nazwa === "pr.inf. 106")].link
                            salaStr=salaStr.substring(salaStr.lastIndexOf("/"));
                        } else {
                            salaStr=salaE.getAttribute("href");
                        }
                        ///

                        var salaId, nazwaSali;
                        try {
                            salaId=Number(salaStr.substring(salaStr.indexOf("s") + 1, salaStr.lastIndexOf(".html")));
                            nazwaSali=newData.sale[newData.sale.findIndex(x => x.id === salaId)].nazwa; // wykorzystajmy nazwe sali z strony sal
                        } catch(e) { // nie ma takiej sali?
                            salaId=-1;
                            nazwaSali="";
                            console.log(`Ostrzezenie podczas parsowania: sala ${salaStr} nie istnieje`);
                        }

                        insObj["grupa"+grupa].sala={
                            id: salaId,
                            nazwa: nazwaSali,
                            internat: czyInternat(nazwaSali),
                            numer: nazwaNaNumer(nazwaSali)
                        }

                        // Nauczyciel
                        var nauczycielE=n.getElementsByClassName("n")[0];
                        var nauczycielStr=nauczycielE.getAttribute("href");
                        var nauczycielId, nazwaNauczyciela;
                        try {
                            nauczycielId=Number(nauczycielStr.substring(nauczycielStr.indexOf("n") + 1, nauczycielStr.lastIndexOf(".html")));
                            nazwaNauczyciela=newData.nauczyciele[newData.nauczyciele.findIndex(x => x.id === nauczycielId)].nazwa; // wykorzystajmy nazwe nauczyciela z listy
                        } catch(e) { // nie ma takiego nauczyciela?
                            nauczycielId=-1;
                            nazwaNauczyciela="";
                            console.log(`Ostrzezenie podczas parsowania: nauczyciel ${nauczycielStr} nie istnieje`); 
                        }
                        
                        insObj["grupa"+grupa].nauczyciel = {
                            id: nauczycielId,
                            nazwa: nazwaNauczyciela
                        }

                        insObj["grupa"+grupa].grupa=Number(grupa);
                    });

                } else { // Puste lub jest to jakis tekst na planie lub zajecia ckz
                    if(n.innerHTML.startsWith("Zajęcia")) {
                        insObj.przedmiot={
                            nazwa: n.innerHTML,
                            pelna_nazwa: n.innerHTML
                        };
                        insObj.sala={};
                        insObj.nauczyciel={};
                    }
                }

                if(Object.keys(insObj).length === 1) return;
                
                // JSDOM jest jakis glupi
                if(b==5) newData.plany["_"+klasa_nazwa].pon["_"+String(i)]=insObj; // Poniedzialek 
                if(b==7) newData.plany["_"+klasa_nazwa].wt["_"+String(i)]=insObj; // Wtorek
                if(b==9) newData.plany["_"+klasa_nazwa].sr["_"+String(i)]=insObj; // Sroda
                if(b==11) newData.plany["_"+klasa_nazwa].czw["_"+String(i)]=insObj; // Czwartek
                if(b==13) newData.plany["_"+klasa_nazwa].pt["_"+String(i)]=insObj; // Piatek
                
                
            });
            
        });
    }
    ////////

    const d = new Date();
    newData.scrapTime=d.toJSON();
    newData.ok=1;
    
    //console.dir(newData, { depth: null });

    return newData;
        
};