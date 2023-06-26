# API
## Dodatkowe informacje
- ID klas, nauczycieli mogą ulec zmianie tak samo jak nazwy. Ten projekt będzie próbowany aktualizowany ze zmianami planu lekcji!
- API działa na podstawie zapytań GET
- API uzwględia wielkość liter!
# API wersja 1
## Indeks
[/v1/getClasses](#v1getclasses)<br>
[/v1/getClass](#v1getclass)<br>
[/v1/getClassByName](#v1getclassbyname)<br>
<br>
[/v1/getTeachers](#v1getteachers)<br>
[/v1/getTeacher](#v1getteacher)<br>
[/v1/getTeacherByName](#v1getteacherbyname)<br>
<br>
[/v1/getClassrooms](#v1getclassrooms)<br>
[/v1/getClassroom](#v1getclassroom)<br>
[/v1/getClassroomByName](#v1getclassroombyname)<br>
<br>
[/v1/getTimetable](#v1gettimetable)<br>
[/v1/getCurrentLesson](#v1getcurrentlesson)<br>
<br>
[/v1/getScrapTime](#v1getscraptime)<br>
<br>
[Struktury danych](#struktury-danych)

## /v1/getClasses
### Opis:
Zwraca liste wszystkich klas<br>
Przykład zapytania: `GET /v1/getClasses`
### Parametry:
Brak
### Zwraca:
Liste wszystkich klas<br>
Przykład: `[{"id":25,"nazwa":"1D","link":"plany/o25.html","praktyki":0},{"id":30,"nazwa":"1E","link":"plany/o30.html","praktyki":0},{"id":24,"nazwa":"1F","link":"plany/o24.html","praktyki":0} ...`

## /v1/getClass
### Opis:
Zwraca klase wedlug jej ID<br>
Przykład zapytania: `GET /v1/getClasses?id=30`
### Parametry:
- id=[liczba] - ID klasy
### Zwraca:
Klase<br>
Przykład: `{"id":30,"nazwa":"1E","link":"plany/o30.html","praktyki":0}`

## /v1/getClassByName
### Opis:
Zwraca klase wedlug jej nazwy (1D, 1E...)<br>
Przykład zapytania: `GET /v1/getClassByName?name=1G`
### Parametry:
- name=[string] - Nazwa klasy
### Zwraca:
Klase<br>
Przykład: `{"id":32,"nazwa":"1G","link":"plany/o32.html","praktyki":0}`


## /v1/getTeachers
### Opis:
Zwraca liste wszystkich nauczycieli<br>
Przykład zapytania: `GET /v1/getTeachers`
### Parametry:
Brak
### Zwraca:
Liste wszystkich nauczycieli<br>
Przykład: `[{"id":8,"nazwa":"#.####","link":"plany/n8.html"},{"id":12,"nazwa":"#.####","link":"plany/n12.html"}, ...`

## /v1/getTeacher
### Opis:
Zwraca nauczyciela wedlug jego ID<br>
Przykład zapytania: `GET /v1/getTeacher?id=8`
### Parametry:
- id=[liczba] - ID nauczyciela
### Zwraca:
Nauczyciela<br>
Przykład: `{"id":8,"nazwa":"#.####","link":"plany/n8.html"}`

## /v1/getTeacherByName
### Opis:
Zwraca nauczyciela wedlug jego nazwy (z generowanego planu lekcji)<br>
Przykład zapytania: `GET /v1/getClassByName?name=#.####`
### Parametry:
- name=[string] - Nazwa nauczyciela według formatu: (Pierwsza litera imienia).Nazwisko
### Zwraca:
Nauczyciela<br>
Przykład: `{"id":8,"nazwa":"#.#####","link":"plany/n8.html"}`


## /v1/getClassrooms
### Opis:
Zwraca liste wszystkich sal lekcyjnch<br>
Przykład zapytania: `GET /v1/getClassrooms`
### Parametry:
Brak
### Zwraca:
Liste wszystkich sal lekcyjnych<br>
Przykład: `[{"id":2,"nazwa":"4","czyInternat":0,"link":"plany/s2.html","numer":"4"},{"id":1,"nazwa":"pr.utk 5","czyInternat":0,"link":"plany/s1.html","numer":"5"} ...`

## /v1/getClassroom
### Opis:
Zwraca sale lekcyjną wedlug jej ID<br>
Przykład zapytania: `GET /v1/getClassroom?id=2`
### Parametry:
- id=[liczba] - ID sali lekcyjnej
### Zwraca:
Sale lekcyjną<br>
Przykład: `{"id":2,"nazwa":"4","czyInternat":0,"link":"plany/s2.html","numer":"4"}`

## /v1/getClassroomByName
### Opis:
Zwraca sale lekcyjną według jej krótniej numeru/nazwy (z generowanego planu lekcji)<br>
Przykład zapytania: `GET /v1/getClassByName?name=5`
### Parametry:
- name=[string] - Nazwa sali
### Zwraca:
Sale lekcyjną<br>
Przykład: `{"id":1,"nazwa":"pr.utk 5","czyInternat":0,"link":"plany/s1.html","numer":"5"}`

## /v1/getTimetable
### Opis:
Zwraca plan lekcji dla danej klasy<br>
Przykład zapytania 1: `GET /v1/getTimetable?id=32` <br>
Przykład zapytania 2: `GET /v1/getTimetable?id=32&day=3`
### Parametry:
- id=[liczba] - ID klasy
- day=[liczba] - (opcjonalne) Dzień tygodnia (1 - poniedziałek ... 5 - piątek)
### Zwraca:
Plan lekcji<br>
Przykład 1: `{"pon":{"_2":{"leckja":2,"przedmiot":{"nazwa":"biologia","pelna_nazwa":"Biologia"},"sala":{"id":26,"nazwa":"52","internat":0},"nauczyciel":{"id":50, ...`<br>
Przykład 2: `{"_1":{"leckja":1,"grupa2":{"przedmiot":{"nazwa":"rys.tech","pelna_nazwa":"Rysunek techniczny"},"sala":{"id":42,"nazwa":"pr.autom.","internat":1},"nauczyciel":{"id":45 ...`

## /v1/getCurrentLesson
### Opis:
Zwraca aktualną lekcje według planu, klasy, godziny i dnia <br>
Przykład zapytania 1: `GET /v1/getTimetable?id=3CurrentLesson?id=32&day=1&hour=8&minute=10` - zwróci aktualną lekcje o godzinie 8:10 w poniedziałek dla klasy z ID 32
### Parametry
- id=[liczba] - ID klasy
- hour=[liczba] - Godzina (0...23)
- minute=[liczba] - Minuta (0...59)
- day=[liczba] - Dzień tygodnia (1 - poniedziałek ... 5 - piątek)
### Zwraca:
Lekcje<br>
i dodatkowy parametr "rozpoczeta" - API zwróci lekcje następną jeżeli jest jeszcze przerwa przed nią z rozpoczeta = 0. Gdy lekcja trwa (jest po przerwie) to rozpoczeta = . Na przykład: rozpoczeta = 0 dla 7:45 i rozpoczeta = 1 dla 7:50. <br>
Przykład: `{"leckja":2,"przedmiot":{"nazwa":"biologia","pelna_nazwa":"Biologia"},"sala":{"id":26,"nazwa":"52","internat":0},"nauczyciel":{"id":50,"nazwa":"#.#####"},"rozpoczeta":1}`

## /v1/getScrapTime
### Opis:
Zwraca ostatni czas scrapowania planu lekcji przez serwer API. Czas jest podany w Unix timestamp<br>
Przykład: `GET /v1/getScrapTime`
### Parametry:
Brak
### Zwraca:
Objekt z parameterem "scrapTime"<br>
Przykład: `{"scrapTime":1687365787}`

# Struktury danych
## Klasa (class):
```
{
    id: [ID klasy],
    nazwa: [Nazwa klasy, np 1G],
    link: [Link do planu, np. plany/o32.html],
    praktyki: [jest równy 1 jeżeli na planie koło nazwy klasy jest zielony napis prakt.]
}
```
## Sala lekcyjna (classroom):
```
{
    id: [ID sali],
    nazwa: [Nazwa sali],
    czyInternat: [czy sala znajduje się w internacie. Ta wartość jest wyjątkowo równa 2 gdy sala jest "Salka Katechetyczna w kościele NSPJ"],
    link: [Link do sali, np. plany/s32.html],
    numer: [Numer sali lub jej skrócona nazwa, np. 43, sj2 lub prautom]
}
```
## Nauczyciel (teacher):
```
{
    id: [ID nauczyciela],
    nazwa: [Nazwa nauczyciela (pierwsza litera imienia i nazwisko)],
    link: [Link do planu nauczyciela, np. plany/n20.html]
}
```
## Plan zajęć (format) (cały tydzień):
W planach zajęć są pomijane wszystkie parametry "link" i niektóre parametry mogą się różnić od podanych powyżej.
```
{
    "pon": {
        _1: { // Przykład bez podziału na grupy
            lekcja: 1, // Dla łatwiejszego identifykowania numeru lekcji

            przedmiot: {
                nazwa: [Nazwa przedmiotu na planie lekcji na stronie],
                pelna_nazwa: [Pełna nazwa przedmiotu]
            },

            sala: {
                id: [ID sali],
                nazwa: [Nazwa sali],
                numer: [Numer/skrócona nazwa sali]
            },

            nauczyciel: {
                id: [ID nauczyciela],
                nazwa: [Nazwa nauczyciela]
            }
        },

        _2: { // Przykład z podziałem na grupy
            lekcja: 2,
            grupa1: {
                grupa: 1, // Dla łatwiejszego identifikowania numeru grupy

                przedmiot: {...}, // (tak samo jak powyżej)
                sala: {...},
                nauczyciel: {...}
            },
            grupa2: {
                grupa: 2,

                przedmiot: {...}, 
                sala: {...},
                nauczyciel: {...}
            },
            ...
        }
        ...
    },
    "wt": {...},
    "sr": {...},
    "czw": {...},
    "pt": {...},
}
```
## Plan zajęć (dzień) 
```
{
    _1: {...}, // Jak powyżej
    _2: {...},
    _3: {...},
    ...
}
```
## Aktualna lekcja 
```
{
    lekcja: [...], 
    przedmiot: {...}, 
    sala: {...},
    nauczyciel: {...}   
} // Dla podziału grupowego wygląda to tak samo jak powyżej
```
## Dodatkowe informacje o formacie
Aby sprawdzić czy lekcja ma podział grupowy wystarczy po prostu sprawdzić czy parametr lekcji grupa1.grupa istnieje i jest wieksza lub równa 1
## TO DO:
- API wolnych sal (getFreeClassrooms)
- API planu lekcji dla sal (getClassroomTimetable / getCurrentClassroomLesson)
- API planu lekcji dla nauczycieli (getTeacherTimetable / getCurrentTeacherLesson)
- API dyżurów (są dostępne na planie lekcji ale nie wiem czy było by to jakoś potrzebne)
- Obsługa skróconych lekcji (dość często teraz lekcje były skracane)
- Obsługa zastępstw (zsem.edu.pl/zastepstwa)