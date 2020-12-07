import React from 'react';
import i18n from 'i18n';
import { PageProps } from '../../pages/PageProps';
import { ProgressPlugin } from 'webpack';
import { EnvSettings } from '../../../config/env/EnvSettings';
import { useQuery } from '@apollo/client';
import { gql } from 'apollo-boost';
let moment = require('moment');

export interface BreadcrumbItemProps{  
  tagpath:string;  
}

export const BreadcrumbItem : React.FC<BreadcrumbItemProps> = (props) =>{
    moment.locale(i18n.languages[0]);
    let connectedtagpath = '';

    if(props.tagpath) connectedtagpath = props.tagpath;   

  const BREADCRUMBITEM = gql`
  {  
  tags(siteurl:"utvecklarportal.web.local",connectedtagpaths:["/${connectedtagpath}"],requireConnectedContent:true)
  {  
    title
    tagPath
    connectedTagPath    
  }
  }`;

  const {loading, error, data} = useQuery<{tags: Array<any>}>(BREADCRUMBITEM);

  const breadcrumb = data && data.tags && data.tags.length > 0 ? data.tags:[];

  return(     
      <li className="breadcrumb__list--item">
        {!loading && breadcrumb &&
            <a href={`${breadcrumb[0].connectedTagPath}`}>{breadcrumb[0].title}</a>
        }
      </li>   
  );
};