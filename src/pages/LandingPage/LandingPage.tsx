import { Box, Accordion } from '@digg/design-system';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import 'url-search-params-polyfill';
import { RouterContext } from '../../../shared/RouterContext';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { NoJavaScriptWarning } from '../../components/NoJavaScriptWarning';
import { QueryParamProvider } from '../../components/QueryParamProvider';
import { __RouterContext } from 'react-router';
import { PageMetadata } from '../PageMetadata';
import i18n from '../../i18n';
import { ArrowIcon } from '@digg/design-system';
import { Helmet } from 'react-helmet';
import { TopImage } from '../../assets/TopImage';
import { string } from 'prop-types';
import { LandingPageItem } from '../../components/LandingPage';
import { SettingsContext } from '../../components/SettingsProvider';
import { PageProps } from '../PageProps';
import { Breadcrumb } from '../../components/Breadcrumb';


const MainContent = Box.withComponent('main');
interface LandingPageProps extends PageProps {
  content: any;
  path: string;
}
export class LandingPage extends React.Component<LandingPageProps> {
  private headerRef: React.RefObject<Header>;

  constructor(props: LandingPageProps) {
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
        <PageMetadata
          seoTitle="Landningssida - Delwebb för utvecklare"
          seoDescription=""
          seoImageUrl=""
          seoKeywords=""
          robotsFollow={true}
          robotsIndex={true}
          lang={i18n.languages[0]}
        />
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

              <Header ref={this.headerRef} />

              <ErrorBoundary>
                <MainContent flex="1 1 auto">
                <Breadcrumb/>

                  <div className="main-container">
                    <div className="">
                      <div className="content">
                        <Helmet>
                          <title>
                            {this.props.content.name} -{' '}
                            {i18n.t('common|seo-title')}
                          </title>
                        </Helmet>
                        {/* <img src={`${landingPageItem.imageUrl}?width=1024`} /> */}
                        <span className="text-6">
                          {/* {moment(landingPageItem.published.toString()).format('D MMM YYYY')} */}
                        </span>
                        <h1 className="text-1">{this.props.content.name}</h1>
                        <p
                          className="preamble text-4"
                          dangerouslySetInnerHTML={{
                            __html: this.props.content.preambleHTML,
                          }}
                        />

                        <span>
                          {this.props.content.tags[0].connectedTagPath}
                        </span>
                        <span>Landningssida</span>

                        <LandingPageItem
                          env={settings.env}
                          connectedtagpath={this.props.path}
                        />
                        {/*Använd denna klass för landingpage ingångar */}
                        {/* <ul className="text-5-bold landingpage_linkblock">
        <li>
          <a href="#">Standarder</a>
          <ArrowIcon />
        </li>
        <li>
          <a href="#">Versionshantering</a>
          <ArrowIcon />
        </li>
        <li>
          <a href="#">Namngivning med ett väldigt långt namn länk</a>
          <ArrowIcon />
        </li>
        <li>
          <a href="#">Identiteter</a>
          <ArrowIcon />
        </li>
        <li>
          <a href="#">Felhantering</a>
          <ArrowIcon />
        </li>
        <li>
          <a href="#">Bra exempel</a>
          <ArrowIcon />
        </li>
      </ul> */}

                        {/* <ul className="text-5 landingpage_linkblock-simple">
        <li>
          <a href="#">Standarder</a>
        </li>
        <li>
          <a href="#">Versionshantering</a>
        </li>
        <li>
          <a href="#">Namngivning med ett väldigt långt namn länk</a>
        </li>
        <li>
          <a href="#">Identiteter</a>
        </li>
        <li>
          <a href="#">Felhantering</a>
        </li>
        <li>
          <a href="#">Bra exempel</a>
        </li>
      </ul> */}

                        {/* <h2 className="text-3">Lorem ipsum dolor</h2> */}
                        <p
                          className="main-text text-5"
                          dangerouslySetInnerHTML={{
                            __html: this.props.content.bodyHTML,
                          }}
                        />
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
