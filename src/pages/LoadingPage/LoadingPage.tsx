import React from 'react';
import { Box } from '@digg/design-system';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Loader } from '../../components/Loader';
import { SettingsContext } from 'components/SettingsProvider';
import { NoJavaScriptWarning } from 'components/NoJavaScriptWarning';
import { ErrorBoundary } from 'components/ErrorBoundary';
import { StaticBreadcrumb, StaticPath } from 'components/Breadcrumb';
import { PageProps } from 'pages/PageProps';

const MainContent = Box.withComponent('main');

interface LoadingPageProps extends PageProps {  
  staticPaths: StaticPath[];
}

export const LoadingPage: React.FC<LoadingPageProps> = (props) => {
  return (
    <SettingsContext.Consumer>
      {(settings) => (
        <Box
          id="top"
          display="flex"
          direction="column"
          minHeight="100vh"
          bgColor="#fff"
        >
          <NoJavaScriptWarning text="" />

          <Header />

          <ErrorBoundary>
            <MainContent flex="1 1 auto">
              <StaticBreadcrumb staticPaths={props.staticPaths} env={settings.env} />
            </MainContent>
          </ErrorBoundary>
        </Box>
      )}
    </SettingsContext.Consumer>)
};
