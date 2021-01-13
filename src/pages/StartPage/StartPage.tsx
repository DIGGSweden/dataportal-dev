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
import { useQuery } from '@apollo/client';
import { gql } from 'apollo-boost';
import { PageMetadata } from '../PageMetadata';
import { TopImage } from 'assets/TopImage';
import i18n from 'i18n';
import { SettingsContext } from '../../components/SettingsProvider';
import { PageProps } from 'pages/PageProps';
import { StartPageBlocksItem } from '../../components/StartPage';
import Truncate from 'react-truncate';
import ChopLines from 'chop-lines';

const MainContent = Box.withComponent('main');
const jumbotron_logo = require('./grafic.png');

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
                        <div className="jumbotron">
                          <div className="jumbotron_heading">
                          <h1>
                              Platsen för dig som arbetar med API:er
                            </h1>
                            <span className="text-5">
                              Här hittar du information och tips om hur du gör för
                              att på ett standardierat sätt kan använda API:er och
                              öppen data i de lösningar som du själv utvecklar.
                            </span>
                          </div>
                          <div className="jumbotron_img">
                            <img src={jumbotron_logo} />
                          </div>
                        </div>
                        <div className="content_grid">
                          <h2 className="text-3">The Viking Age (793–1066 AD)</h2>
                          <p className="text-5 content_grid-preamble">
                            The Viking Age (793–1066 AD) was the period during the
                            Middle Ages when Norsemen known as Vikings undertook
                            large-scale raiding, colonizing, conquest and trading
                            throughout Europe, and reached North America.
                          </p>
                          <ul className="content_grid-list">
                            <li className="content_grid-item">
                              <div className="content_grid-item-wrapper">
                                <a
                                  href="#"
                                  className="content_grid-itemlink text-4"
                                >
                                  Floki the boat builder
                                </a>
                                <p className="text-5 content_grid-itemdesc">
                                  <Truncate lines={4}>
                                    In 868, Flóki left to search for the land
                                    found by Garðar Svavarsson way up in the
                                    north. He was accompanied by his family on his
                                    journey; his wife was named Gró and his
                                    children included Oddleifur and Þjóðgerður.
                                  </Truncate>
                                </p>
                              </div>
                            </li>
                            <li className="content_grid-item">
                              <div className="content_grid-item-wrapper">
                                <a
                                  href="#"
                                  className="content_grid-itemlink text-4"
                                >
                                  Ragnar Lodbrok or Lothbrok
                                </a>
                                <p className="text-5 content_grid-itemdesc">
                                  <Truncate lines={4}>
                                    Ragnar Loðbrók is a legendary Viking hero, as
                                    well as, according to the Gesta Danorum, a
                                    legendary Danish and Swedish king.[2] He is
                                    known from Old Norse poetry of the Viking Age,
                                    Icelandic sagas, and near-contemporary
                                    chronicles. According to the traditional
                                    literature, Ragnar Lodbrok distinguished
                                    himself by many raids against the British
                                    Isles and the Holy Roman Empire during the 9th
                                    century.
                                  </Truncate>
                                </p>
                              </div>
                            </li>
                            <li className="content_grid-item">
                              <div className="content_grid-item-wrapper">
                                <a
                                  href="#"
                                  className="content_grid-itemlink text-4"
                                >
                                  Harald I Fairhair
                                </a>
                                <p className="text-5 content_grid-itemdesc">
                                  <Truncate lines={4}>
                                    Harald hårfagre; putatively c. 850 – c. 932)
                                    is portrayed by medieval Norwegian historians
                                    as the first King of Norway. According to
                                    traditions current in Norway and Iceland in
                                    the twelfth and thirteenth centuries, he
                                    reigned from c. 872 to 930. Supposedly, two of
                                    his sons, Eric Bloodaxe and Haakon the Good,
                                    succeeded Harald to become kings after his
                                    death.
                                  </Truncate>
                                </p>
                              </div>
                            </li>
                            <li className="content_grid-item">
                              <div className="content_grid-item-wrapper">
                                <a
                                  href="#"
                                  className="content_grid-itemlink text-4"
                                >
                                  Rollo the first ruler of Normandy
                                </a>
                                <p className="text-5 content_grid-itemdesc">
                                  <Truncate lines={4}>
                                    He emerged as the outstanding warrior among
                                    the Norsemen who had secured a permanent
                                    foothold on Frankish soil in the valley of the
                                    lower Seine. After the Siege of Chartres in
                                    911, Charles the Simple, the king of West
                                    Francia, gifted them lands between the mouth
                                    of the Seine and what is now Rouen in exchange
                                    for Rollo agreeing to end his brigandage,
                                    swearing allegiance to him, religious
                                    conversion and a pledge to defend the Seine's
                                    estuary from Viking raiders.
                                  </Truncate>
                                </p>
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
