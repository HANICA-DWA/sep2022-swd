---
export_on_save:
  puppeteer: true

puppeteer:
  format: "A4"
  scale: 0.9
  margin:
    top: 2cm
    right: 2cm
    bottom: 2cm
    left: 2cm
---

# workshop ‘Ontwerpen’

- [Doel](#doel)
- [Stappenplan](#stappenplan)

  - [1. Opdracht verkennen](#1-opdracht-verkennen)
  - [2. User-interface schetsen](#2-user-interface-schetsen)
  - [3. Resources identificeren](#3-resources-identificeren)
  - [4. Gebruikers- en systeem-interactie identificeren](#4-gebruikers--en-systeem-interactie-identificeren)
  - [5. Communicatie protocollen beschrijven](#5-communicatie-protocollen-beschrijven)
  - [6. Data-opslag ontwerpen](#6-data-opslag-ontwerpen)
  - [7. Client state ontwerpen](#7-client-state-ontwerpen)
  - [8. Express structuur](#8-express-structuur)

## Doel

> "Een _lichtgewicht_ ontwerp maken, waarbij functionele en technische aspecten in elkaar overlopen."

## Stappenplan

We gaan werken volgens het onderstaande stappenplan.

**Opmerking:** De stappen hoeven niet sequentieel uitgevoerd te worden. Zeker de laatste paar stappen kun je prima parallel doen. De eerste 3 à 4 stappen leggen de basis voor de overige activiteiten. Uiteraard kun je, door nieuwe inzichten, de resultaten uit een vorige stap aanpassen.

### 1. Opdracht verkennen

**resultaat:** belangrijkste concepten en eisen uit de opdracht zijn gemarkeerd

### 2. User-interface schetsen

**resultaat:** wireframes van de schermen

Als annotatie in de wireframes: de belangrijkste React componenten die je moet maken.

### 3. Resources identificeren

**resultaat:** overzicht met de namen van de belangrijkste resources die 'bewerkt' worden

### 4. Gebruikers- en systeem-interactie identificeren

**resultaat:** inventarisatie van de belangrijkste interacties (gebruiker en systeem) die je moet uitprogrammeren

Als annotatie in de wireframes: de acties die een gebruiker kan doen (klikken, typen, selecteren, navigeren) en/of de acties die vanuit het systeem komen (websockets berichten, timers).

De acties kun je bijvoorbeeld aangeven met: `[NAV] /quiz/approve-teams`, `[WS] new team`, `[REST] POST /api/quizzes/`, `[CODE] start quiz`

### 5. Communicatie protocollen beschrijven

**resultaat:** overzicht van de REST-api en Websockets berichten

### 6. Data-opslag ontwerpen

**resultaat:** Mongoose schema in Javascript code

### 7. Client state ontwerpen

In deze stap kun je twee oplossingsrichtingen kiezen, afhankelijk van of je Redux gebruikt of niet.

1. zonder Redux: componenten props en state vastleggen
   **resultaat:** een overzicht per React component van zijn props en state

1. met Redux: reducers en hun store vastleggen
   **resultaat:** een overzicht van de datastructuur van de state, en welke reducers er zijn en wat ze doen

### 8. Express structuur

**resultaat:** overzicht van de Websocket, Routers en Middleware
