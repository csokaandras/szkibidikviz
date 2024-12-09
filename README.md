# Szkibidikviz

Egy szórakoztató és oktató quiz játék, amely teszteli a felhasználó tudását különböző kategóriákban. A projekt lehetőséget biztosít különböző témákban való kérdések felvételére és megválaszolására.

## Funkcionalitások

- **Kérdések választása**: Különböző kategóriákban elérhető kérdések.
- **Pontszámok nyomon követése**: A játékosok pontszámainak összesítése és megjelenítése.
- **Időzítő**: Meghatározott időkeret a válaszok megadására.
- **Dinamikus tartalom**: Könnyűen bővíthető kérdéstár.

## Követelmények

- **MariaDB 10.4** vagy régebbi, mert fos régi XAMPP-et kell használni xd
- **Node.js** (18.x vagy újabb verzió)

## Telepítés

1. Klónold a projektet a gépedre:
   ```bash
   git clone https://github.com/csokaandras/szkibidikviz
   ```

2. Navigálj a projekt könyvtárába:
   ```bash
   cd szkibidikviz
   ```

3. Telepítsd a szükséges függőségeket:
   ```bash
   npm install
   ```

## Használat

1. Indítsd el az alkalmazást:
   ```bash
   npm start
   ```

2. Nyisd meg a böngésződet és látogasd meg a [http://localhost:3000](http://localhost:3000) oldalt (vagy a konfigurált portot).

3. Kezdődjön a quiz!

## Fejlesztési útmutató

- A kérdések és válaszok szerkesztése adatbázisban történik.
- Bővíteni szeretnéd a funkcionalitást? Lépj kapcsolatba a közreműködőkkel.
