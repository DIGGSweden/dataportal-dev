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

const MainContent = Box.withComponent('main');

interface ContentPageProps extends PageProps{
  lang:string;
}

const contentQuery = gql`
  query content($path: String, $lang: String) {
    contents(siteurl:"*utvecklarportal*", connectedtagpaths:[$path], lang:$lang)
    {
      id      
      name
      published      
      ... on Page {        
        preambleHTML        
      	bodyHTML
      }
    }
  }
`;

/**
 * Router component for dynamic content, via federated graphql content backend
 * @param props 
 */
export const ContentRouter: React.FC<ContentPageProps> = (props) => {  
 
  const {loading, error, data } = 
    useQuery<{ contents: Array<any> }>(contentQuery,{
      variables:{
        path:`/${props.match.params.path}/`,
        lang: props.lang ?? "sv"
      }
    });
  
    if(loading)
      return <LoadingPage />
    //content found with id, switch type for corrent Content component
    else if(!loading && data && data.contents && data.contents.length > 0)
      return <ContentPage {...props} content={data!.contents[0]} />
    else    
      return <NotFoundPage {...props} />
}
