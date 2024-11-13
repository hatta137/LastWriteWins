# Basis-Image von Node.js verwenden
FROM node:20

# Arbeitsverzeichnis setzen
WORKDIR /usr/src/app

# Abhängigkeiten installieren
COPY package*.json ./

RUN npm install

# Quellcode kopieren
COPY . .

# Exponiere den Port, den die App verwendet
EXPOSE 3000

# Startbefehl für die Applikation
CMD [ "npm", "start" ]