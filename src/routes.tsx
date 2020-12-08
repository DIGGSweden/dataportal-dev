import React, { useEffect } from 'react';
import { hot } from 'react-hot-loader';
import { Route, Switch, useLocation } from 'react-router-dom';
import { App } from './components/App';
import { ErrorBoundary } from './components/ErrorBoundary';
import { NotFoundPage} from './pages/NotFoundPage';
import { StartPage } from './pages/StartPage';
import { ContentPage } from './pages/Content/ContentPage';
import { LandingPage } from './pages/LandingPage/LandingPage';
import { useMatomo } from '@datapunt/matomo-tracker-react';
import {ContentRouter } from './pages/Content';
import { SettingsContext } from 'components/SettingsProvider';

export interface RouteProps {
  formdata?: object;
  vars?: object;
}

export const Routes = ({formdata, vars}:RouteProps) => {    

  const { trackPageView } = useMatomo();
  const location = useLocation();  

  useEffect(() => {
    trackPageView({});
  },[location.pathname])  

  return (
    <ErrorBoundary>
      <SettingsContext.Consumer>
        {settings => (     
          <App>
            <Switch>
               {/* default */}
               <Route path={['/', '/sv','/en']} exact render={(props)=><StartPage env={settings.env} {...props}/>} />               
                
                {/* <Route path={['/landningssida', '/sv/landningssida']} exact render={(props)=><LandingPage env={settings.env} {...props}/>} /> */}

                {/* <Route render={(props)=><NotFoundPage {...props}/>} /> */}
              
                {/* <Route path={['/nyheter/:nid/*', '/sv/nyheter/:nid/*','/sv/nyheter/*']} exact render={(props)=><ContentPage env={settings.env} content={null} {...props}/>} /> */}        
            
                {/* query graphql for connectedcontentpath */}
                <Route path={['/en/:path*']} exact render={(props) => (<ContentRouter env={settings.env} lang="en" {...props} />)} />                              
                <Route path={['/sv/:path*']} exact render={(props) => (<ContentRouter env={settings.env} lang="sv" {...props} />)} />                              
                <Route path={['/:path*']} exact render={(props) => (<ContentRouter env={settings.env} lang="sv" {...props} />)} />    
            </Switch>
          </App>
        )}
      </SettingsContext.Consumer>
    </ErrorBoundary>
  );
}