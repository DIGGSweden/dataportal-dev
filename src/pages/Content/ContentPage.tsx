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
import { ContentItem } from '../../components/Content'
import { SettingsContext } from '../../components/SettingsProvider';
import { PageProps } from '../PageProps'
import Helmet from 'react-helmet';
import moment from 'moment';

const MainContent = Box.withComponent('main');

interface ContentPageProps extends PageProps{  
  content:any;
}

export class ContentPage extends React.Component<ContentPageProps> {
    private headerRef: React.RefObject<Header>;

    constructor(props: ContentPageProps) {
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
        seoTitle="Artiklar - Sveriges dataportal"
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
                <div className="news-article content">       
                <Helmet>
                  <title>{this.props.content.name} - {i18n.t('common|seo-title')}</title>
                </Helmet>            
                {this.props.content && this.props.content.imageUrl && (
                  <img src={`${this.props.content.imageUrl}?width=1024`} />
                )}
                <span className="text-6">{moment(this.props.content.published.toString()).format("D MMM YYYY")}</span>
                <h1 className="text-1">{this.props.content.name}</h1>            
                <p
                    className="preamble text-4"
                    dangerouslySetInnerHTML={{
                      __html: this.props.content.preambleHTML,
                    }}
                  />                           
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
    )  
  }

}