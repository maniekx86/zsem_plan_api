// maniek86
// 2023 (c)
// wersja 0.1
const store = require('./store');

var data;

// Cache-owane wartosci
var klasy = [];
var nauczyciele = [];
var sale = [];
var plany = []

exports.refresh = (inData) => { // Zrobmy dynamiczny cache dla API aby przespieszyc zapytania
    data = inData;

    // klonujemy aby przy aktualizacji stare dane jeszcze byly dostepne
    klasy = structuredClone(data.klasy);
    nauczyciele = structuredClone(data.nauczyciele);
    sale = structuredClone(data.sale);
    plany = structuredClone(data.plany);
    // TO DO dla API: 
    // - API sal i API wolnych sal na bazie danych zebranych z planow (getCurrentClassroomLesson)
    // - API wszystkich lekcji kazdego nauczyciela (getCurrentTeacherLesson)
    // - Scrapowanie dyzurow (nwm po co)
};

exports.apiSet = (app) => {
    app.get("/v1/getClasses", getClasses);
    app.get("/v1/getClass", getClass);
    app.get("/v1/getClassByName", getClassByName);

    app.get("/v1/getTeachers", getTeachers);
    app.get("/v1/getTeacher", getTeacher);
    app.get("/v1/getTeacherByName", getTeacherByName);

    app.get("/v1/getClassrooms", getClassrooms);
    app.get("/v1/getClassroom", getClassroom);
    app.get("/v1/getClassroomByName", getClassroomByName);

    app.get("/v1/getTimetable", getTimetable);

    app.get("/v1/getCurrentLesson", getCurrentLesson);

    app.get("/v1/getScrapTime", getScrapTime);
    
}

function timeToLesson(hour, minute) { // Zwraca numer lekcji zalezny od godziny i czy jest przerwa. Funkcje zrobilem troche leniwie na if-ach bo nie chcialo mi sie pomyslec xd
    if (minute > 59) minute = 59;
    var returnObj = {
        lekcja: 0,
        rozpoczeta: 1
    };

    if (hour == 6) {
        returnObj.lekcja = 1;
        returnObj.rozpoczeta = 0;
    } else if (hour == 7) {
        if (minute >= 0 && minute < 45) {
            returnObj.lekcja = 1;
        } else if (minute >= 45 && minute < 50) {
            returnObj.lekcja = 2;
            returnObj.rozpoczeta = 0;
        } else if (minute >= 50) {
            returnObj.lekcja = 2;
        }
    } else if (hour == 8) {
        if (minute < 35) {
            returnObj.lekcja = 2;
        } else if (minute >= 35 && minute < 40) {
            returnObj.lekcja = 3;
            returnObj.rozpoczeta = 0;
        } else if (minute >= 40) {
            returnObj.lekcja = 3;
        }
    } else if (hour == 9) {
        if (minute < 25) {
            returnObj.lekcja = 3;
        } else if (minute >= 25 && minute < 30) {
            returnObj.lekcja = 4;
            returnObj.rozpoczeta = 0;
        } else if (minute >= 30) {
            returnObj.lekcja = 4;
        }
    } else if (hour == 10) {
        if (minute < 15) {
            returnObj.lekcja = 4;
        } else if (minute >= 15 && minute < 30) {
            returnObj.lekcja = 5;
            returnObj.rozpoczeta = 0;
        } else if (minute >= 30) {
            returnObj.lekcja = 5;
        }
    } else if (hour == 11) {
        if (minute < 15) {
            returnObj.lekcja = 5;
            returnObj.rozpoczeta = 0;
        } else if (minute >= 15 && minute < 20) {
            returnObj.lekcja = 6;
            returnObj.rozpoczeta = 0;
        } else if (minute >= 20) {
            returnObj.lekcja = 6;
        }
    } else if (hour == 12) {
        if (minute < 5) {
            returnObj.lekcja = 6;
        } else if (minute >= 5 && minute < 10) {
            returnObj.lekcja = 7;
            returnObj.rozpoczeta = 0;
        } else if (minute >= 10 && minute < 55) {
            returnObj.lekcja = 7;
        } else if (minute >= 55) {
            returnObj.lekcja = 8;
            returnObj.rozpoczeta = 0;
        }
    } else if (hour == 13) {
        if (minute < 15) {
            returnObj.lekcja = 8;
            returnObj.rozpoczeta = 0;
        } else if (minute >= 15) {
            returnObj.lekcja = 8;
        }
    } else if (hour == 14) {
        if (minute < 5) {
            returnObj.lekcja = 9;
            returnObj.rozpoczeta = 0;
        } else if (minute >= 5 && minute < 50) {
            returnObj.lekcja = 9;
        } else if (minute >= 50 && minute < 55) {
            returnObj.lekcja = 10;
            returnObj.rozpoczeta = 0;
        } else if (minute >= 55) {
            returnObj.lekcja = 10;
        }
    } else if (hour == 15) {
        if (minute < 40) {
            returnObj.lekcja = 10;
        } else if (minute >= 40 && minute < 45) {
            returnObj.lekcja = 11;
            returnObj.rozpoczeta = 0;
        } else if (minute >= 45) {
            returnObj.lekcja = 11;
        }
    } else if (hour == 16) {
        if (minute < 30) {
            returnObj.lekcja = 11;
        } else if (minute >= 30 && minute < 35) {
            returnObj.lekcja = 12;
            returnObj.rozpoczeta = 0;
        } else if (minute >= 35) {
            returnObj.lekcja = 12;
        }
    } else if (hour == 17) {
        if (minute < 20) {
            returnObj.lekcja = 12;
        } else if (minute >= 20 && minute < 25) {
            returnObj.lekcja = 13;
            returnObj.rozpoczeta = 0;
        } else if (minute >= 25) {
            returnObj.lekcja = 13;
        }
    } else if (hour == 18) {
        if (minute < 10) {
            returnObj.lekcja = 13;
        } else if (minute >= 10 && minute < 0) {
            returnObj.lekcja = 14;
            returnObj.rozpoczeta = 0;
        } else if (minute >= 15) {
            returnObj.lekcja = 14;
        }
    } else {
        returnObj.lekcja=0;
    }

    return returnObj;
}

// /v1/getClasses
// Zwraca wszystkie klasy
// Paramtery: -
// Zwraca: tablice klas
function getClasses(req, res) {
    res.json(klasy);
};
// /v1/getClassesByName
// Zwraca jedna klase wedlug jej nazwy
// Paramtery: ?name=[string]
// Zwraca: klasa wedlug jej nazwy
function getClassByName(req, res) {
    const className = req.query.name;

    if (typeof className === "string" && className.trim().length>0) {
        const selectedClass=klasy.find(obj => obj.nazwa === className);
    
        if (selectedClass) {
            res.send(selectedClass);
        } else {
            res.status(404).send("Class not found");
        }
    } else {
    res.status(400).send("Bad request");
    }
};
// /v1/getClass
// Zwraca jedna klase wedlug jej ID
// Paramtery: ?id=[int]
// Zwraca: klasa wedlug jej ID
function getClass(req, res) {
    const classId = parseInt(req.query.id);
      
    if (req.query.id !== undefined && !isNaN(classId)) {
        const selectedClass = klasy.find(obj => obj.id === classId);
    
        if (selectedClass) {
            res.send(selectedClass);
        } else {
            res.status(404).send('Class not found');
        }
    } else {
        res.status(400).send('Bad request');
    }
};



// /v1/getTeachers
// Zwraca wszystkie klasy
// Paramtery: -
// Zwraca: tablice nauczycieli
function getTeachers(req, res) {
    res.json(nauczyciele);
};
// /v1/getTeacherByName
// Zwraca nauczyciela wedlug jego nazwy
// Paramtery: ?name=[string]
// Zwraca: nauczyciel
function getTeacherByName(req, res) {
    const teacherName = req.query.name;

    if (typeof teacherName === "string" && teacherName.trim().length>0) {
        const selectedTeacher=nauczyciele.find(obj => obj.nazwa === teacherName);
    
        if (selectedTeacher) {
            res.send(selectedTeacher);
        } else {
            res.status(404).send("Teacher not found");
        }
    } else {
    res.status(400).send("Bad request");
    }
};
// /v1/getTeacher
// Zwraca nauczyciela wedlug jego ID
// Paramtery: ?id=[int]
// Zwraca: nauczyciel
function getTeacher(req, res) {
    const teacherId = parseInt(req.query.id);
      
    if (req.query.id !== undefined && !isNaN(teacherId)) {
        const selectedTeacher = nauczyciele.find(obj => obj.id === teacherId);
    
        if (selectedTeacher) {
            res.send(selectedTeacher);
        } else {
            res.status(404).send('Teacher not found');
        }
    } else {
        res.status(400).send('Bad request');
    }
};



// /v1/getClassrooms
// Zwraca wszystkie sale
// Paramtery: -
// Zwraca: tablice sal
function getClassrooms(req, res) {
    res.json(sale);
};
// /v1/getClassroomByName
// Zwraca sale wedlug jej numeru (krotkiej nazwy)
// Paramtery: ?name=[string]
// Zwraca: sala
function getClassroomByName(req, res) {
    const classroomName = req.query.name;

    if (typeof classroomName === "string" && classroomName.trim().length>0) {
        const selectedClassroom=sale.find(obj => obj.numer === classroomName);
    
        if (selectedClassroom) {
            res.send(selectedClassroom);
        } else {
            res.status(404).send("Classroom not found");
        }
    } else {
    res.status(400).send("Bad request");
    }
};
// /v1/getClassroom
// Zwraca sale wedlug jej id
// Paramtery: ?id=[int]
// Zwraca: sala
function getClassroom(req, res) {
    const classroomoId = parseInt(req.query.id);
      
    if (req.query.id !== undefined && !isNaN(classroomoId)) {
        const selectedClassroom = sale.find(obj => obj.id === classroomoId);
    
        if (selectedClassroom) {
            res.send(selectedClassroom);
        } else {
            res.status(404).send('Classroom not found');
        }
    } else {
        res.status(400).send('Bad request');
    }
};

// /v1/getTimetable
// Zwraca sale wedlug jej id
// Paramtery: ?id=int
//            [?dzien=[int]] - od 1-5, niewymagany
// Zwraca: sala
function getTimetable(req, res) {
    const classId = parseInt(req.query.id);
    var selectedClass;  

    if (req.query.id !== undefined && !isNaN(classId)) {
        selectedClass = klasy.find(obj => obj.id === classId);
    
        if (!selectedClass) {
            return res.status(404).send('Classroom not found');
        }
    } else {
        return res.status(400).send('Bad request');
    }
    const dzien=parseInt(req.query.day);

    if (req.query.day === undefined) {
        return res.send(plany[`_${selectedClass.nazwa}`]);
    } else {
        if(isNaN(dzien)) return res.status(400).send('Bad request');
        if(!(dzien===1||dzien===2||dzien===3||dzien===4||dzien===5)) return res.status(400).send('Bad request');
        var dzienName;
        switch(dzien) {
            case 1: dzienName="pon"; break; 
            case 2: dzienName="wt"; break;
            case 3: dzienName="sr"; break;
            case 4: dzienName="czw"; break;
            case 5: dzienName="pt"; break;

            default: return res.status(500).send('Server error');
        }

        return res.send(plany[`_${selectedClass.nazwa}`][dzienName]);
    }
};

// /v1/getCurrentLesson
// Zwraca sale wedlug jej id
// Paramtery: ?class=int (id klasy)
//            ?hour=int (godzina, od 0-23)
//            ?minute=int (minuta, od 0-59)
//            ?day=int (liczba od 1-5, od pon do pt)
// Zwraca: aktualna lekcje i dodatkowy parametr "rozpoczeta" oznaczajacy czy lekcja jest przerwa (1 - lekcja, 0 - przed lekcja przerwa)
function getCurrentLesson(req, res) {
    // sprawdzamy klase
    const classId = parseInt(req.query.id);
    var selectedClass;  

    if (req.query.id !== undefined && !isNaN(classId)) {
        selectedClass = klasy.find(obj => obj.id === classId);
    
        if (!selectedClass) {
            return res.status(404).send('Classroom not found');
        }
    } else {
        return res.status(400).send('Bad request');
    }
    //sprawdzamy czas
    const godz=parseInt(req.query.hour);
    const min=parseInt(req.query.minute);

    if (req.query.hour === undefined || isNaN(godz)) return res.status(400).send('Bad request');
    if (req.query.minute === undefined || isNaN(min)) return res.status(400).send('Bad request');
    if(!(godz>=0&&godz<=23&&min>=0&&min<=59)) return res.status(400).send('Bad request');

    //sprawdzamy dzien
    const dzien=parseInt(req.query.day);

    if (req.query.day === undefined || isNaN(dzien)) return res.status(400).send('Bad request');
    if(!(dzien===1||dzien===2||dzien===3||dzien===4||dzien===5)) return res.status(400).send('Bad request');
        
    var dzienName;
    switch(dzien) {
        case 1: dzienName="pon"; break; 
        case 2: dzienName="wt"; break;
        case 3: dzienName="sr"; break;
        case 4: dzienName="czw"; break;
        case 5: dzienName="pt"; break;

        default: return res.status(500).send('Server error');
    }

    // zwracamy wartosc
    
    var lekcjaRet=timeToLesson(godz,min);
    var response=structuredClone(plany[`_${selectedClass.nazwa}`][dzienName][`_${lekcjaRet.lekcja}`]); // klonujemy zeby wartosci nie zmienilo w nastepnej linijce
    response.rozpoczeta=lekcjaRet.rozpoczeta;

    res.send(response);
    
};



// /v1/getScrapTime
// Zwraca czas ostatniego scrapu planu lekcji
// Paramtery: -
// Zwraca: czas w unix timestamp
function getScrapTime(req, res) {
    var date=new Date(data.scrapTime);
    res.send({scrapTime: Math.floor(date.getTime() / 1000)});
};