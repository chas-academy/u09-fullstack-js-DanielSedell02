# u09-fullstack-js-DanielSedell02

Detta är en fullstack JavaScript-applikation utvecklad som en del av Chas Academys kurs.

## Innehåll

1. [Projektöversikt](#projektöversikt)
2. [Användarstudie](#användarstudie.)
3. [Funktioner](#funktioner.)
4. [Teknologier](#teknologier)
5. [Installation](#installation)
6. [Backend-uppsättning](#backend-uppsättning)
7. [Frontend-uppsättning](#frontend-uppsättning)
8. [API-dokumentation](#api-dokumentation)
9. [Licens](#licens)

## Projektöversikt

Hemsidan skapades för att fylla en nisch inom parfymhandel, då det fanns en brist på specialiserade andrahandswebbplatser för parfymer. Målet var att skapa en plattform där användare enkelt kan köpa och sälja parfymer med en transparent och trygg upplevelse. 

### Användarstudie
# Dokumentation av Hemsidan

## 1. Bakgrund och Syfte
Hemsidan skapades för att fylla en nisch inom parfymhandel, då det fanns en brist på specialiserade andrahandswebbplatser för parfymer. Målet var att skapa en plattform där användare enkelt kan köpa och sälja parfymer med en transparent och trygg upplevelse.

## 2. Metod
En användarstudie genomfördes med olika åldersgrupper och könen. Svaren samlades in via en enkät för att förstå deras preferenser och köpbeteende relaterat till parfymer.

## 3. Resultat från Användarstudien
- **Köpfrekvens och Plats**: Majoriteten av användarna köper parfymer mindre än en gång per år och föredrar att handla från fysiska butiker (Åhléns, Kicks) samt onlinebutiker (Sephora, NordicFeel).
- **Viktigaste Faktorer**: Pris, doftens karaktär och varumärke var de främsta faktorerna för köpbeslut.
- **Recensioner och Betyg**: Användare värderade högst recensioner från andra och varumärkets rykte.
- **Gränssnitt**: Enkelt gränssnitt med möjlighet att kategorisera produkter (efter dofttyp och varumärke) och tillgång till säljarens omdömen efterfrågades.
- **Funktioner**: Flera användare ville kunna lägga till bilder av produkterna. 

## 4. Insikter och Användarpreferenser
- Användarna uppskattar ett tydligt och lättnavigerat system som stödjer bra produktbeskrivningar och bilder.
- Många efterfrågade specialfunktioner som tydliga kategoriseringar efter doftkaraktärer och säljarens recensioner för ökad trygghet i köpprocessen.
- Det finns ett intresse för personanpassade rekommendationer baserat på tidigare köp och doftpreferenser.

## 5. Rekommendationer för Hemsidans Funktionalitet
- **Produktkategorisering**: Implementera en filtreringsfunktion baserad på dofttyper och varumärke.
- **Recensioner och Omdömen**: Tillåt användarna att lämna och läsa betyg samt recensioner för att skapa ett community kring produkterna.
- **Säkerhet och Betalning**: Fokusera på att ha säkra betalningsmetoder och tydlig leveransinformation för att öka kundernas förtroende.

## Funktioner
- Användare kan registrera sig, logga in, skapa och hantera annonser.
- Användaren kan lägga till och ta bort parfymer till och från sin varukorg.
- Admin kan använda sig av CRUD för att hantera användare
- Möjlighet att ladda upp bilder och lägga till beskrivningar och detaljer om produkten.

## Teknologier
- **Frontend**: Vite (React), tailwindcss 
- **Backend**: Node.js, Express
- **Databas**: MongoDB
- **autentisering**: JWT för användar autentisering 
- **Deployment**: Plattform som stöder node.js Render för backend och netifly för frontend

## Installation

1. Klona repositoriet:
   ```bash
   git clone https://github.com/chas-academy/u09-fullstack-js-DanielSedell02.git
   ```
2. Gå till projektkatalogen:
   ```bash
   cd u09-fullstack-js-DanielSedell02
   ```
Sedan för att installera Tailwind Css så skriver du: 
```npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
 ```
## Backend-uppsättning

1. Gå till `Backend`-mappen:
   ```bash
   cd Backend
   ```
2. Installera beroenden:
   ```bash
   npm install
   ```
3. Skapa en `.env`-fil:

   ```bash
   touch .env
   ```

   Lägg till variabler som:

   ```
   PORT=3000
   DB_URI=mongodb://din_mongodb_uri
   MONGO_USERNAME=
MONGO_PASSWORD=
MONGO_CLUSTER=
MONGO_DBNAME=
JWT_SECRET=
MONGODB_URI=
   ```

4. Starta backend-servern:
   ```bash
   npm start
   ```

## Frontend-uppsättning

1. Gå till `vite-project`-mappen:
   ```bash
   cd Frontend/vite-project
   ```
2. Installera beroenden:
   ```bash
   npm install
   ```
3. Starta Vite-utvecklingsservern:
   ```bash
   npm run dev
   ```

   

## API-dokumentation

Jag använde mig av insomnia för API-testning och utveckling.

# User Registration

**Method:** POST  
**URL:** [http://localhost:3000/api/auth/register](http://localhost:3000/api/auth/register)

**Body (JSON):**
```json
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}
```
# User Login

**Method:** POST  
**URL:** [http://localhost:3000/api/auth/login](http://localhost:3000/api/auth/login)

**Body (JSON):**
```json
{
  "email": "test@example.com",
  "password": "password123"
}

```

 Genom att använda Insomnia för att testa registrerings- och inloggningsfunktionerna har jag kunnat säkerställa att dessa viktiga delar av hemsidan fungerar som de ska. Verktygets funktioner för snabb feedback, enkel felsökning och effektiv validering har varit avgörande för att skapa en användarvänlig applikation.



## Licens

Copyright (c) 2024 Daniel Sedell
