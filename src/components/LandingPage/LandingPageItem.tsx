import React, { Component } from 'react';
import i18n from '../../i18n';
import { TopImage } from '../../assets/TopImage';
import { EnvSettings } from '../../../config/env/EnvSettings';
import { useQuery } from '@apollo/client';
import { gql } from 'apollo-boost';
import ChopLines from 'chop-lines';
let moment = require('moment');
import { decode } from 'qss';
import { Helmet } from 'react-helmet'

export interface LandingPageItemProps {
  children?: React.ReactNode;
  env: EnvSettings;
  id: string;
}

const hasWindow = typeof window !== 'undefined';

export const LandingPageItem : React.FC<LandingPageItemProps> = (props) => {    

  moment.locale(i18n.languages[0]);
  let id = '0';

  //check if id is sent in via QueryString
  if(hasWindow)
  {
    var qs = decode(window.location.search.substring(1)) as any;        
    id = qs.id && qs.id.toString().length > 0? qs.id.toString() : '0';    
  }

  //id via route is always preffered
  if(props.id)
    id = props.id;

  const LANDINGPAGE = gql `
  {
    landingPage(siteurl:"*", lang:"${i18n.languages[0]}",id:"${id}"){
      id        
      heading
      preamble
      published
      modified      
      body 
      imageUrl
    }
  }
`
;

  const { loading, error, data } = useQuery<{landingPage:Array<any>}>(LANDINGPAGE);

  const landingPageItem = data && data.landingPage && data.landingPage.length > 0
  ? data.landingPage[0]
  : null;

    return (                    
      <div className="news-article content">
        {loading && (<span className="text-5 loading">{i18n.t('common|loading')}</span>)}
        {!loading && landingPageItem && id && id != '0' ?
          <>
            <Helmet>
              <title>{landingPageItem.heading} - {i18n.t('common|seo-title')}</title>
            </Helmet>            
            {landingPageItem && landingPageItem.imageUrl && (
              <img src={`${landingPageItem.imageUrl}?width=1024`} />
            )}
            <span className="text-6">{moment(landingPageItem.published.toString()).format("D MMM YYYY")}</span>
            <h1 className="text-1">{landingPageItem.heading}</h1>
            <p className="preamble text-4">
            {landingPageItem.preamble}
            </p>                              
            <p
              className="main-text text-5"
              dangerouslySetInnerHTML={{
                __html: landingPageItem.body,
              }}
            />                          
          </>  
          : !loading &&
          <>
            <h1 className="text-1">Det här innehållet finns inte längre kvar.</h1>
          </>
        }
      </div>                                                    
    )  
}
