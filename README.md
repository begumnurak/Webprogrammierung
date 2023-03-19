# Das REZEPTE-FORUM der HWR ist endlich da!
## Hochschule für Wirtschaft und Recht Berlin
## Modul: Spezielle Programmiertechniken | Unit: Webprogrammierung

### Anleitung: Production starten

```
docker build -t rezepte .
```
```
docker run -p 3001:3001 -it rezepte
```
(interakiv)

oder

```
docker run -p 3001:3001 -dt rezepte
``` 
(im Hintergrund)

Die Anwendung ist nun aufrufbar im Browser über ```localhost:/3001```.


---

### Development

#### Dependencies installieren:
```
npm install
```
#### Dev-Server starten:
```
npm run dev
```
Aufrufbar im Browser über ```localhost:/3001```.

#### Tailwind-Build-Prozess starten:
```
npx tailwindcss -i ./src/input.css -o ./public/dist/output.css --watch
```
Das 
```--watch``` ist optional und sorgt dafür, dass der Build-Prozess bei jeder Änderung im Projekt neugestartet wird.
