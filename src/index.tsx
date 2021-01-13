import { themes } from '@digg/design-system';
import { hydrate } from 'emotion';
import { ThemeProvider } from 'emotion-theming';
import React from 'react';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { LocalStoreProvider } from './components/LocalStoreProvider';
import { Routes } from './routes';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/core';
import { GlobalStyles } from './GlobalStyles';
import { SettingsProvider } from './components/SettingsProvider';
import './i18n';
import { ApolloProvider } from '@apollo/client'
import { SettingsUtil } from "../config/env/SettingsUtil";
import 'isomorphic-unfetch'
import { createApolloClient } from '../shared/graphql/client';

import 'scss/general/general.scss';
import 'scss/general/typography.scss';
import 'scss/general/buttons.scss';
import 'scss/general/variables.scss';
import 'scss/content/content.scss';
import 'scss/content/landingpage.scss';
import 'scss/startpage/startpage_general.scss';
import 'scss/startpage/jumbotron.scss';
import 'scss/startpage/contentgrid.scss';
import 'scss/news/news.scss';
import 'scss/redirectpage/redirectpage.scss';
import 'scss/loader/loader.scss';
import 'scss/breadcrumb/breadcrumb.scss';
import { createInstance, MatomoProvider } from '@datapunt/matomo-tracker-react';


const emotionIds = (window as any).__EMOTION_IDS__ || null;

if (emotionIds) {
  hydrate(emotionIds);
}

const serverState = (window as any).__APOLLO_STATE__ || null;
const cache = createCache();
const env = SettingsUtil.create(typeof window !== 'undefined'? window.location.href : '');

const client = createApolloClient({ 
  serverState: serverState, 
  fetch: fetch,
  ssrForceFetchDelay: 100,
  backendUrl: env.CONTENTBACKEND_GRAPHAPI });

  ReactDOM.hydrate( 
    <ApolloProvider client={client}>
      <CacheProvider value={cache}>
        <GlobalStyles theme={themes.default} />
        <ThemeProvider theme={themes.opendata}>
          <HelmetProvider>       
            <LocalStoreProvider>        
              <SettingsProvider applicationUrl={typeof window !== 'undefined'? window.location.href : ''}>
                <MatomoProvider
                  value={createInstance({
                    urlBase: 'https://webbanalys.digg.se',
                    siteId: env.MATOMO_SITEID > 0
                      ? env.MATOMO_SITEID
                      : -1,
                  })}
                >
                <BrowserRouter>
                  <Routes />
                </BrowserRouter>
                </MatomoProvider>
              </SettingsProvider>                            
            </LocalStoreProvider>      
          </HelmetProvider>
        </ThemeProvider>
      </CacheProvider>
    </ApolloProvider> ,  
     document.getElementById('root')
  );
