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
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

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
  
  const LANDINGPAGE = gql`
  {   
    tags(siteurl: "${props.env.CONTENTBACKEND_SITEURL}",parentconnectedtagpaths:["${connectedtagpath}"])
      {
        id
        parentID
        title
        connectedTagPath
        indexOrder
      }
    }
`;

  const { error, data } = useQuery<{ tags:Array<any> }>(LANDINGPAGE);

  const landingPageRelatedLinks =
  data && data.tags && data.tags.length > 0 ? data.tags : [];  

  return (   

    landingPageRelatedLinks.length >= 1 && (
    
    <ul className="text-5-bold landingpage_linkblock">
        {/* {loading && (
          <Skeleton count={2} height={60} />
        )} */}
        {error && (
          <span className="loading-msg">
            Det finns inga sidor att visa för tillfället.
          </span>
        )}
        {
          landingPageRelatedLinks &&
          landingPageRelatedLinks.length > 0 &&
          landingPageRelatedLinks?.sort(
            (a, b) =>
              parseInt(a.indexOrder + '0') -
              parseInt(b.indexOrder + '0')
          )
          .map((n, index) => {
            return (
              <li
              onClick={() => window.location.href=n.connectedTagPath}
              key={index}
              >
                <Link                  
                  to={`${n.connectedTagPath}`}
                >
                  {n.title}
                  </Link>
                  <ArrowIcon />
              </li>
            );
          })}      
    </ul>
  )

  );
};
