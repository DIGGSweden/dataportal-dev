import { Box, Accordion } from '@digg/design-system';
import React, { useEffect, useState } from 'react';
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
import { ArticleItem } from '../../components/Articles'
import { SettingsContext } from '../../components/SettingsProvider';
import { PageProps } from '../PageProps'
import { gql } from 'apollo-boost';
import { useLazyQuery, useQuery } from '@apollo/client';
import { LoadingPage } from '../LoadingPage';
import { ProgressPlugin } from 'webpack';
import { ContentPage } from './ContentPage';
import { NotFoundPage } from '../NotFoundPage';
import { LandingPage } from 'pages/LandingPage';
import { StaticPath } from 'components/Breadcrumb';

const MainContent = Box.withComponent('main');

interface ContentPageProps extends PageProps{
  lang:string;
}

const contentQuery = gql`
  query content($siteurl: String!, $path: String, $lang: String, $paths: [String]) {
    contents:
      contents(siteurl:$siteurl, connectedtagpaths:[$path], lang:$lang)
      {
        id      
        name
        published         
        tags{
          tagPath
          connectedTagPath
        }
        ... on Page {        
          preambleHTML        
          bodyHTML    
          imageUrl
        imageText
        }
      }
    breadcrumb:
      tags(siteurl:$siteurl,connectedtagpathsor:$paths, lang: $lang)
      {      
        connectedTagPath			
        title
      }
  }
`;

/**
 * Router component for dynamic content, via federated graphql content backend
 * @param props 
 */
export const ContentRouter: React.FC<ContentPageProps> = (props) => {  
 
  //caclulate breadcrumbs path, we need to query backend to retreive correct titles
  let pathsplitted :string[] = props.match.params.path ? props.match.params.path.split('/') : [];
  pathsplitted = pathsplitted.filter(function (x) { return x != ""; });
  var copy = [...pathsplitted];
  let paths: string[] = []
  let staticPaths: StaticPath[] = [];

  pathsplitted.forEach(element => {      
    paths.push(`/${copy.join('/')}/`)
    copy.pop();
  });     

  const {loading, error, data } = 
    useQuery<{ contents: Array<any>, breadcrumb: Array<any> }>(contentQuery,{
      variables:{
        path:`/${props.match.params.path}/`,
        paths:paths,
        lang: props.lang ?? "sv",
        siteurl: props.env.CONTENTBACKEND_SITEURL
      }
    });

    if(!loading && data && data?.breadcrumb && data?.breadcrumb.length > 0)
    {
      //create staticpath for breadcrumbs component
      data.breadcrumb
        .forEach((n:any) => {
          staticPaths.push({
            path: `/${(props.lang ?? "sv")}${n.connectedTagPath}`,
            title: n.title
          });
        });

        //sort path according to number of /
        staticPaths.sort((a,b) => {
          let aNum = (a.path.match(/\//g) || []).length;
          let bNum = (b.path.match(/\//g) || []).length;
  
          if(aNum > bNum) return 1;
          if(aNum < bNum) return -1;
          return 0;
        })
    }
  
    if(loading)
      return <LoadingPage />
    //content found with id, switch type for corrent Content component
    else if(!loading && data && data.contents && data.contents.length > 0){
      // if(data.contents[0].tags.find((t :any) => t.tagPath.includes('/landingpage/')))
      // {     
      //   /** We have a landing page!!! */
      //   return <LandingPage staticPaths={staticPaths} {...props} content={data!.contents[0]} path={`/${props.match.params.path}/`} />
      // }     
      return <ContentPage staticPaths={staticPaths} {...props} content={data!.contents[0]} />
    }
      
    else    
      return <NotFoundPage {...props} />
}
