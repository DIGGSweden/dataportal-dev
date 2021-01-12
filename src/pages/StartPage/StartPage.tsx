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
import Truncate from 'react-truncate';
import ChopLines from 'chop-lines';

const MainContent = Box.withComponent('main');

export class StartPage extends React.Component<PageProps, any> {
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
                seoTitle="Delwebb för utvecklare"
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
                    <div className="main-container">
                      <div className="dev_head">
                        <div className="dev_head-heading">
                          <h1 className="text-1">Utvecklarportalen</h1>
                          <span className="text-5">
                            Här hittar du information och tips om hur du gör för
                            att på ett standardierat sätt kan använda API:er och
                            öppen data i de lösningar som du själv utvecklar.
                          </span>
                        </div>

                        <div className="dev_head-links">
                          <div className="dev_head-link">
                            <a className="text-4-link">
                              Produktägare och förvaltare
                            </a>
                            <span className="text-5">livscykelhantering?</span>
                          </div>
                          <div className="dev_head-link">
                            <a className="text-4-link">
                              Är du utvecklare eller testare
                            </a>
                            <span className="text-5">
                              Ta del av bra exempel på hur andra har utvecklat
                              sina lösningar.{' '}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="content_grid">
                        <ul className="content_grid-list">
                          <li className="content_grid-item">
                            <div className="content_grid-item-wrapper">
                              <a href="#" className="content_grid-link text-4">
                                Floki the boat builder
                              </a>
                              <ChopLines lines={2} lineHeight={27}>
                                <p className="text-5 content_grid-preamble">
                                  In 868, Flóki left to search for the land
                                  found by Garðar Svavarsson way up in the
                                  north. He was accompanied by his family on his
                                  journey; his wife was named Gró and his
                                  children included Oddleifur and Þjóðgerður.
                                </p>
                              </ChopLines>
                            </div>
                          </li>
                          <li className="content_grid-item">
                            <div className="content_grid-item-wrapper">
                              <a
                                href="#"
                                className="content_grid-link text-4"
                              ></a>
                              <p className="text-5 content_grid-preamble"></p>
                            </div>
                          </li>
                          <li className="content_grid-item">
                            <div className="content_grid-item-wrapper">
                              <a
                                href="#"
                                className="content_grid-link text-4"
                              ></a>
                              <p className="text-5 content_grid-preamble"></p>
                            </div>
                          </li>
                          <li className="content_grid-item">
                            <div className="content_grid-item-wrapper">
                              <a
                                href="#"
                                className="content_grid-link text-4"
                              ></a>
                              <p className="text-5 content_grid-preamble"></p>
                            </div>
                          </li>
                        </ul>
                      </div>
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
