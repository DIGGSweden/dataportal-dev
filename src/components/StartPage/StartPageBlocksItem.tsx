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

export interface StartPageBlocksItemProps {
  children?: React.ReactNode;
  env: EnvSettings;  
  connectedtagpath:string;
}

const hasWindow = typeof window !== 'undefined';

export const StartPageBlocksItem: React.FC<StartPageBlocksItemProps> = (props) => {
  moment.locale(i18n.languages[0]);
  let connectedtagpath = '';

  if(props.connectedtagpath) connectedtagpath = props.connectedtagpath;
  
  const STARTPAGEBLOCKS = gql`
  {   
    tags(siteurl: "${props.env.CONTENTBACKEND_SITEURL}",tagpaths:["/start/"])
      {
        id
       title        
        connectedTagPath
        connectedContents{
            name
            uihints
            id
            ... on ContentBlock{
                contentBlocks{
                    ... on ContentBlock{
                        bodyHTML
                        name
                        uihints
                    }
                }
            }
        }
      }
    }
`;

  const { loading, error, data } = useQuery<{ tags:Array<any> }>(STARTPAGEBLOCKS);

  const blocks =
  data && data.tags && data.tags.length > 0 && data.tags[0].connectedContents.length>0 ?
   data.tags[0].connectedContents : [];  

  console.log(blocks);

  return (   
      <div>
              {loading && (
          <span className="text-5 loading">{i18n.t('common|loading')}</span>
        )}
          <p>skoj</p>
      {!loading && data && data!.tags &&(
          <div>
              {blocks.map((block:any,index:number) => {
            if(block.uihints[0] =='TextAndImage'){
                return(
                    <div key={index}><p>TextAndImage</p></div>
                );}

            if(block.uihints[0]=='Puffar'){
                return(<div key={index}><p>puffar</p></div>);
            }
return(<div key={index}></div>);
              })}
          </div>
      )}
 
 </div>
  );
};
