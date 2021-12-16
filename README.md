# Sveriges utvecklarportal webbklient

Här finns källkoden för utvecklarportalens webbklient
[https://www.DATAPORTAL](https://DATAPORTAL)

## Förutsättningar

- node 14.16.1
- yarn

## Utveckling

```sh
yarn
yarn start
```

Gå till [http://localhost:8080](http://localhost:8080) i din webbläsare.

## Lokal server

För att testa applikationen via en node express-server kör följande:

```sh
yarn
yarn build
yarn localserver
```

Besök [http://localhost:3003](http://localhost:3003) i din webbläsare.

## Produktionsbygge

Bygg för produktion genom att köra följande:

```sh
yarn build
```

Detta kommer generera applikationen som statiska filer i dist-mappen. `dist/server` för server och `dist/client` för klient.

## Stack

- [TypeScript](https://www.typescriptlang.org/) typad JS
- [React](https://reactjs.org/) för UI
- [Emotion](https://emotion.sh) för styling
- [React Router](https://reacttraining.com/react-router/) för routing

## Noteringar

Projektet har ett beroende till Diggs designsystemspaket `@digg/design-system`.
I skrivande stund är källkoden till detta paket inte publicerad på Github eller NPM.
