import React, { Component, useState } from 'react';
import i18n from '../../i18n';
import { ArrowIcon } from '@digg/design-system';
import { TopImage } from '../../assets/TopImage';
import { EnvSettings } from '../../../config/env/EnvSettings';
import { useQuery } from '@apollo/client';
import { gql } from 'apollo-boost';
import ChopLines from 'chop-lines';
let moment = require('moment');
import { decode } from 'qss';
import { Helmet } from 'react-helmet';

export interface LandingPageItemProps {
  children?: React.ReactNode;
  env: EnvSettings;  
  connectedtagpath:string;
}

const hasWindow = typeof window !== 'undefined';

export const LandingPageItem: React.FC<LandingPageItemProps> = (props) => {
  moment.locale(i18n.languages[0]);
  let connectedtagpath = '';

  if(props.connectedtagpath) connectedtagpath = props.connectedtagpath;
  console.log('skoj skoj');
  console.log(connectedtagpath);
  // //check if id is sent in via QueryString
  // if (hasWindow) {
  //   var qs = decode(window.location.search.substring(1)) as any;
  //   id = qs.id && qs.id.toString().length > 0 ? qs.id.toString() : '0';
  // }

  //id via route is always preffered
  // if (props.id) id = props.id;


  
  const LANDINGPAGE = gql`
  {
    contents(siteurl:"*",connectedtagpaths:["${connectedtagpath}"])
    {
      name
      tags{
        tagPath
        connectedTagPath
        id
      }
    }
    links:  
  tags(siteurl: "*utvecklarportal*",connectedtagpathscontains:["${connectedtagpath}*/"])
    {
      id
      parentID
      title
      connectedTagPath
    }
  }
`;

  const { loading, error, data } = useQuery<{ contents: Array<any>, links:Array<any> }>(LANDINGPAGE);

const landingPageRelatedLinks =
data && data.links && data.links.length > 0 ? data.links : [];

  const landingPageItem =
    data && data.contents && data.contents.length > 0
      ? data.contents[0]
      : null;
      console.log(data);
      console.log('hejsan');
      console.log(data?.links);
// console.log(landingPageItem);
  return (   
          <ul className="text-5-bold landingpage_linkblock">
              {loading && (
          <span className="text-5 loading">{i18n.t('common|loading')}</span>
        )}
        {!loading && error && (
          <span className="loading-msg">
            Det finns inga sidor att visa för tillfället.
          </span>
        )}
           {!loading &&
          landingPageRelatedLinks &&
          landingPageRelatedLinks.length > 0 &&
          landingPageRelatedLinks.map((n, index) => {
            return (
              <li 
              key={index}
              >
                <a                  
                  href={`${n.connectedTagPath}`}
                >
                  {n.title}
                  </a>
                  <ArrowIcon />
              </li>
            );
          })}
        {/* // <li>
        //   <a href="#">Standarder</a>
        //   <ArrowIcon />
        // </li>
        // <li>
        //   <a href="#">Versionshantering</a>
        //   <ArrowIcon />
        // </li>
        // <li>
        //   <a href="#">Namngivning med ett väldigt långt namn länk</a>
        //   <ArrowIcon />
        // </li>
        // <li>
        //   <a href="#">Identiteter</a>
        //   <ArrowIcon />
        // </li>
        // <li>
        //   <a href="#">Felhantering</a>
        //   <ArrowIcon />
        // </li>
        // <li>
        //   <a href="#">Bra exempel</a>
        //   <ArrowIcon />
        // </li> */}
      </ul>

      // <ul className="text-5 landingpage_linkblock-simple">
      //   <li>
      //     <a href="#">Standarder</a>
      //   </li>
      //   <li>
      //     <a href="#">Versionshantering</a>
      //   </li>
      //   <li>
      //     <a href="#">Namngivning med ett väldigt långt namn länk</a>
      //   </li>
      //   <li>
      //     <a href="#">Identiteter</a>
      //   </li>
      //   <li>
      //     <a href="#">Felhantering</a>
      //   </li>
      //   <li>
      //     <a href="#">Bra exempel</a>
      //   </li>
      // </ul>
  );
};
