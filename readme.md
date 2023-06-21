# ZSEM_PLAN_API
Scraper i eksperymentalne nieoficjalne API dla planu lekcji Zespołu Szkół Elektryczno-Mechanicznych w Nowym Sączu (https://zsem.edu.pl/plany)<br>
Kod jest napisany (i planowany) aby robić jak najmniejszą liczbe zapytań na stronę szkoły


# Wymagania
- Node 17

# Konfiguracja
Konfiguracja znajduje się w pliku `moduly/config.js`. Są tam:
- `port` - port serwera Express
- `dataFile` - lokalizacja pliku z zescrapowanym planem lekcji w postacji JSON
- `scrapTimeHour` i `scrapTimeMinute` - Dzienna godzina i minuta automatycznego scrapowania planu lekcji

# Instalacja i uruchomienie
```
git clone https://github.com/maniekx86/ZSEM_PLAN_API
cd ZSEM_PLAN_API
npm install
```
```
npm start
```

# API
[api.md](docs/api.md)
