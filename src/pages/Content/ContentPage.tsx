import { Box, Text, Accordion } from '@digg/design-system';
import React, { useState, useEffect } from 'react';
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
import {
  PageNavigation,
  PixelWrapper,
} from '../../components/StyledComponents/';
import { MenuItem, AnchorLinkMenu } from './AnchorLinkMenu';
import i18n from '../../i18n';
import { TopImage } from '../../assets/TopImage';
import { string } from 'prop-types';
import { ContentItem } from '../../components/Content';
import { SettingsContext } from '../../components/SettingsProvider';
import { PageProps } from '../PageProps';
import Helmet from 'react-helmet';
import moment from 'moment';
import { Breadcrumb, StaticBreadcrumb, StaticPath } from '../../components/Breadcrumb';
import {
  skipToContent,
  skipToElement,
  startFromTop,
} from 'components/SkipToContent';
import { isIE } from '../../utilities/detectBrowser';
import { onNextFrame } from '../../utilities/onNextFrame';
import { LandingPageItem } from 'components/LandingPage';

export const hasWindow = typeof window !== 'undefined';
export const getWidth = () => {
  return hasWindow ? window.innerWidth : 1080;
};

const MainContent = Box.withComponent('main');

/**
 * Gets all h2 elements on the page and sets id:s to a visibility:hidden sibling be used
 * in the anchorLinkMenu
 * @returns {Array} An array of id:s to all h2-elements on the page
 */
const getLinks = () => {
  const menuItems: MenuItem[] = [];
  let headerScope = '.main-text';
  let cont: HTMLElement =
    document.querySelector(headerScope) || document.createElement('div');
  let hTags = Array.prototype.slice.call(
    cont.querySelectorAll('h2') || document.createElement('div'),
    0
    
  );

  // Set only if there are more than 2 elements
  hTags.length > 2 &&
    hTags.forEach((element: HTMLElement) => {
      // filter swedish charachters and whitespaces from anchor
      let chars: any = { å: 'a', ä: 'a', ö: 'o', ' ': '_', '.': '' };
      const id = `${element.innerText
        .toLowerCase()
        .replace(/[åäö\s\.]/g, (m: any) => chars[m])}`;
      // Get the sibling element and give it the id
      (element.id = `${id}`);
      menuItems.push({
        id: id,
        text: element.textContent,
      } as MenuItem);
    });

  return menuItems;
};

interface ContentPageProps extends PageProps {
  content: any;
  staticPaths: StaticPath[];
}

export const ContentPage: React.FC<ContentPageProps> = (props) => {
  const { content } = props;
  const initialState: MenuItem[] = [];
  const [menuItems, setMenuItems] = useState(initialState);
  const [width, setWidth] = useState(getWidth());
  const AnchorLinkMenuRef = React.createRef<HTMLDivElement>(); //for making changes in ms edge legacy
  const { location } = props;
  const headerRef = React.createRef<Header>();
  // const setFocus = setFocus.bind(this);
  // const setFocus() => {
  //   if (headerRef.current) {
  //     headerRef.current.setFocusOnMenuButton();
  //   }
  // }

  useEffect(() => {
    const newMenuItems = getLinks();
    // Make sure that the state needs to be updated
    if (
      (menuItems[0] &&
        newMenuItems[0] &&
        menuItems[0].id !== newMenuItems[0].id) ||
      (menuItems[0] && !newMenuItems[0]) ||
      (!menuItems[0] && newMenuItems[0])
    ) {
      !isIE && setMenuItems(newMenuItems);
    }
    !location.hash
      ? onNextFrame(() => (skipToContent(), startFromTop()))
      : onNextFrame(() => skipToElement(location.hash));
  });

  let uri = new URLSearchParams(location.search);
  //const rendered = renderHTMLString(props.content.bodyHTML, false);

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
        {(settings) => (
          <Box
            id="top"
            display="flex"
            direction="column"
            minHeight="100vh"
            bgColor="#fff"
          >
            <NoJavaScriptWarning text="" />

            <Header ref={headerRef} />

            <ErrorBoundary>
              <Box flex="1 1 auto">
                <StaticBreadcrumb staticPaths={props.staticPaths} env={settings.env} />

                <MainContent className="main-container">
                <h1 className="text-1">{props.content.name}</h1>

                  <div className="main-container--contentwrapper">

                    <Box
                      className="anchorlink_wrapper"
                    >
                      {menuItems[0] && width > 899 && (
                        <PageNavigation ref={AnchorLinkMenuRef}>
                          <AnchorLinkMenu
                            screenWidth={getWidth()}
                            menuItems={menuItems}
                            anchorLinkMenuRef={AnchorLinkMenuRef}
                          />
                        </PageNavigation>
                      )}
                    </Box>

                    <div className="news-article content">
                      <Helmet>
                        <title>
                          {props.content.name} - {i18n.t('common|seo-title')}
                        </title>
                      </Helmet>
                      {/*             
              <Box className="anchorlink_wrapper" display="block" width={1}>
                {menuItems[0] && width > 899 && (
                  <PageNavigation ref={AnchorLinkMenuRef}>
                    <AnchorLinkMenu
                      screenWidth={getWidth()}
                      menuItems={menuItems}
                      anchorLinkMenuRef={AnchorLinkMenuRef}
                    />
                  </PageNavigation>
                )}
            </Box> */}

                      {props.content && props.content.imageUrl && (
                        <img
                          src={`${props.content.imageUrl}?width=1024`}
                          alt={`${props.content.imageText}`}
                        />
                      )}
                      {/* <span className="text-6">{moment(props.content.published.toString()).format("D MMM YYYY")}</span> */}
                      {/* <h1 className="text-1">{props.content.name}</h1> */}
                      <p
                        className="preamble text-4"
                        dangerouslySetInnerHTML={{
                          __html: props.content.preambleHTML,
                        }}
                      /> 
                      <LandingPageItem
                          env={settings.env}
                          connectedtagpath={`/${props.match.params.path}/`}
                        />                                          
                      <div
                        className="main-text text-5"
                        dangerouslySetInnerHTML={{
                          __html: props.content.bodyHTML,
                        }}
                      />                      
                    </div>
                  </div>
                </MainContent>
              </Box>
            </ErrorBoundary>
            <Footer onToTopButtonPushed={() => {}} />
          </Box>
        )}
      </SettingsContext.Consumer>
    </QueryParamProvider>
  );
};

// export class ContentfafaPage extends React.Component<ContentPageProps> {
//     private headerRef: React.RefObject<Header>;

//     constructor(props: ContentPageProps) {
//         super(props);
//         this.headerRef = React.createRef();
//         this.setFocus = this.setFocus.bind(this);
//       }

//       // setTopMargin(height: number) {
//       //   this.setState({ headerHeight: height });
//       // }

// }
