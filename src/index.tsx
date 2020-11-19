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
import 'scss/news/news.scss';
import 'scss/project/projectlist.scss';
import 'scss/project/project.scss';



import 'scss/redirectpage/redirectpage.scss';

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
  ssrMode: false,  
  backendUrl: env.CONTENTBACKEND_GRAPHAPI });

  ReactDOM.hydrate( 
    <ApolloProvider client={client}>
      <CacheProvider value={cache}>
        <GlobalStyles theme={themes.default} />
        <ThemeProvider theme={themes.opendata}>
          <HelmetProvider>       
            <LocalStoreProvider>        
              <SettingsProvider applicationUrl={typeof window !== 'undefined'? window.location.href : ''}>
                <BrowserRouter>
                  <Routes />
                </BrowserRouter>
              </SettingsProvider>                            
            </LocalStoreProvider>      
          </HelmetProvider>
        </ThemeProvider>
      </CacheProvider>
    </ApolloProvider> ,  
     document.getElementById('root')
  );
