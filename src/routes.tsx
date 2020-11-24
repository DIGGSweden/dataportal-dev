import React from 'react';
import { hot } from 'react-hot-loader';
import { Route, Switch } from 'react-router-dom';
import { App } from './components/App';
import { ErrorBoundary } from './components/ErrorBoundary';
import { NotFoundPage} from './pages/NotFoundPage';
import { StartPage } from './pages/StartPage';
import { ContentPage } from './pages/Content/ContentPage';
import { LandingPage } from './pages/LandingPage/LandingPage';

import {ContentRouter } from './pages/Content';
import { SettingsContext } from 'components/SettingsProvider';

export interface RouteProps {
  formdata?: object;
  vars?: object;
}

class RoutesComponent extends React.Component<RouteProps> {
  constructor(props: RouteProps) {
    super(props);
  }

  render() {
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
                <Route path={['/om-webbplatsen', '/sv/om-webbplatsen']} exact render={(props)=><ContentPage env={settings.env} content={null} {...props}/>} />
              
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
}

export const Routes = hot(module)(RoutesComponent);
