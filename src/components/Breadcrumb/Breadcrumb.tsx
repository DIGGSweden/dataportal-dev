import React from 'react';
import i18n from 'i18n';
import { PageProps } from '../../pages/PageProps';
import { ProgressPlugin } from 'webpack';
import { EnvSettings } from '../../../config/env/EnvSettings';
import { useQuery } from '@apollo/client';
import { gql } from 'apollo-boost';
import { BreadcrumbItem } from './BreadcrumbItem';
import { SettingsContext } from 'components/SettingsProvider';
let moment = require('moment');
export interface BreadcrumbProps{  
  connectedtagpath:string;
  env: EnvSettings; 
}
const hasWindow = typeof window !== 'undefined';

export const Breadcrumb : React.FC<BreadcrumbProps> = (props) => {
  moment.locale(i18n.languages[0]);
  let connectedtagpath = '';
let breadpath = '';

if(props.connectedtagpath){
  connectedtagpath = props.connectedtagpath;
}
  let pathsplitted :any[] = connectedtagpath ? connectedtagpath.split('/') : [];

  pathsplitted = pathsplitted.filter(function (x) { return x != ""; });
  return(
  <div className="breadcrumb text-7">
    <ul className="breadcrumb__list">
      <li className="breadcrumb__list--item">
        <a href={`/${i18n.languages[0]}`}>{i18n.t('common|Home')}</a>
      </li>    
      {pathsplitted && pathsplitted.map((n, index) => {        
          breadpath +=n+'/';            
        console.log("min breadpath"+breadpath);
        return (        
          <BreadcrumbItem env={props.env} tagpath={breadpath} />
        );  
      })}
    </ul>
  </div>
  );
};
