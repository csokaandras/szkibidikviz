# Szkibidikviz

Egy szórakoztató és oktató quiz játék, amely teszteli a felhasználó tudását különböző kategóriákban. A projekt lehetőséget biztosít különböző témákban való kérdések felvételére és megválaszolására.

## Funkcionalitások

- **Kérdések választása**: Különböző kategóriákban elérhető kérdések.
- **Pontszámok nyomon követése**: A játékosok pontszámainak összesítése és megjelenítése.
- **Időzítő**: Meghatározott időkeret a válaszok megadására.
- **Dinamikus tartalom**: Könnyűen bővíthető kérdéstár.

## Telepítés

1. Klónold a projektet a gépedre:
   ```bash
   git clone https://github.com/<felhasznalonev>/<repo-nev>.git
   ```

2. Navigálj a projekt könyvtárába:
   ```bash
   cd <repo-nev>
   ```

3. Telepítsd a szükséges függőségeket:
   ```bash
   npm install
   # vagy
   pip install -r requirements.txt
   ```

## Használat

1. Indítsd el az alkalmazást:
   ```bash
   npm start
   # vagy Python verzionál
   python app.py
   ```

2. Nyisd meg a böngésződet és látogasd meg a [http://localhost:3000](http://localhost:3000) oldalt (vagy a konfigurált portot).

3. Válassz egy kérdéskört és kezdődjön a quiz!

## Fejlesztési útmutató

- A kérdések és válaszok szerkesztése a `questions.json` (vagy hasonló) fájlban történik.
- Bővíteni szeretnéd a funkcionalitást? Lépj kapcsolatba a közreműködőkkel, vagy hozzád új modult a `src/` mappához.

## Hozzájárulás

1. Forkold a repót.
2. Készíts egy új branch-et:
   ```bash
   git checkout -b feature/<funkcio-nev>
   ```
3. Implementáld a módosításokat, majd commitold azokat:
   ```bash
   git commit -m "Hozzáadva: <funkcio leirasa>"
   ```
4. Pushold a módosításokat a forkolt repóba:
   ```bash
   git push origin feature/<funkcio-nev>
   ```
5. Nyiss egy pull request-et a GitHub-on.
