import {
  Box,
  ArrowIcon,
  SearchIcon,
  Accordion,
  Container,
  colorPalette,
} from '@digg/design-system';
import React from 'react';
import Helmet from 'react-helmet';
import { RouteComponentProps } from 'react-router-dom';
import 'url-search-params-polyfill';
import { RouterContext } from '../../../shared/RouterContext';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { NoJavaScriptWarning } from '../../components/NoJavaScriptWarning';
import { QueryParamProvider } from '../../components/QueryParamProvider';
import { __RouterContext, Redirect } from 'react-router';
import { PageMetadata } from '../PageMetadata';
import { TopImage } from 'assets/TopImage';
import i18n from 'i18n';
import { SettingsContext } from '../../components/SettingsProvider';
import { PageProps } from 'pages/PageProps';

const MainContent = Box.withComponent('main');

export class StartPageEn extends React.Component<PageProps, any> {
  private headerRef: React.RefObject<Header>;

  constructor(props: PageProps) {
    super(props);
    this.headerRef = React.createRef();
    this.setFocus = this.setFocus.bind(this);
  }

  setFocus() {
    if (this.headerRef.current) {
      this.headerRef.current.setFocusOnMenuButton();
    }
  }

  setTopMargin(height: number) {
    this.setState({ headerHeight: height });
  }

  render() {
    const { location } = this.props;
    let uri = new URLSearchParams(location.search);

    return (
      <QueryParamProvider params={uri}>
        <SettingsContext.Consumer>
          {(settings) => (
            <Box
              id="top"
              display="flex"
              direction="column"
              minHeight="100vh"
              bgColor="#fff"
            >
              <PageMetadata
                seoTitle={i18n.t('pages|startpage|seo_title')}
                seoDescription={i18n.t('pages|startpage|seo_description')}
                seoImageUrl=""
                seoKeywords=""
                robotsFollow={true}
                robotsIndex={true}
                lang={i18n.languages[0]}
                canonicalUrl={`${this.props.env.CANONICAL_URL}/${i18n.languages[0]}/`}
              />
              <NoJavaScriptWarning text="" />

              <Header ref={this.headerRef} />

              <ErrorBoundary>
                <MainContent id="main" flex="1 1 auto">
                  <div className="wpb_wrapper">
                    <div className="main-search-container">
                      <div className="startpage-top">
                                              
                      </div>
                    </div>

                    <div className="main-container">
                      <div className="startpage-categories">
                        <h2 className="text-3">
                          {i18n.t('pages|startpage|datasets_by_category')}
                        </h2>
                        
                      </div>
                    
                    </div>
                  </div>

                  <div className="statistic">
                    <div className="statistic-header">
                      <h2 className="text-3">Portalen i siffror</h2>
                    </div>
                  </div>
                </MainContent>
              </ErrorBoundary>
              <Footer onToTopButtonPushed={this.setFocus} />
            </Box>
          )}
        </SettingsContext.Consumer>
      </QueryParamProvider>
    );
  }
}
