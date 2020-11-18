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
import { TopImage } from '../../assets/TopImage';
import { string } from 'prop-types';
import { LandingPageItem } from '../../components/LandingPage'
import { SettingsContext } from '../../components/SettingsProvider';
import { PageProps } from '../PageProps'

const MainContent = Box.withComponent('main');
export class LandingPage extends React.Component<PageProps> {
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
            <PageMetadata
              seoTitle="Innehåll - Sveriges dataportal"
              seoDescription=""
              seoImageUrl=""
              seoKeywords=""
              robotsFollow={true}
              robotsIndex={true}
              lang={i18n.languages[0]}
            />
            <SettingsContext.Consumer>
              {settings => (       
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
                    <div className="main-container">                  
                      <div className="">
                          <h3>Landningssida</h3>
                      {/* <LandingPageItem env={settings.env} id={this.props.match.params.nid} /> */}

                      //Ersätt diven news-article content i landingpageItem.

                      <div className="news-article content">
        <span className="text-5 loading">{i18n.t('common|loading')}</span>)}
        {!loading && contentItem && id && id != '0' ?
          <>
            <Helmet>
              <title>{contentItem.heading} - {i18n.t('common|seo-title')}</title>
            </Helmet>            
            {contentItem && contentItem.imageUrl && (
              <img src={`${contentItem.imageUrl}?width=1024`} />
            )}
            <span className="text-6">{moment(contentItem.published.toString()).format("D MMM YYYY")}</span>
            <h1 className="text-1">{contentItem.heading}
            
            </h1>
            <p className="preamble text-4">
            {contentItem.preamble}
            </p>                              
            <p
              className="main-text text-5"
              dangerouslySetInnerHTML={{
                __html: contentItem.body,
              }}
            />                          
          </>  
          : !loading &&
          <>
            <h1 className="text-1">Det här innehållet finns inte längre kvar.</h1>
          </>
        }
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