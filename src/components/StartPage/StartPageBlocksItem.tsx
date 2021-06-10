import React, { Component, useState } from 'react';
import i18n from '../../i18n';
import { ArrowIcon } from '@digg/design-system';
import { styled } from '@digg/design-system';
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
import Truncate from 'react-truncate';

export interface StartPageBlocksItemProps {
  children?: React.ReactNode;
  env: EnvSettings;
  connectedtagpath: string;
}

const hasWindow = typeof window !== 'undefined';

const Spacer = styled('div')`
  width: 2.5rem;
  @media screen and (max-width: 50rem) {
    display: none;
  }
`;

export const StartPageBlocksItem: React.FC<StartPageBlocksItemProps> = (
  props
) => {
  moment.locale(i18n.languages[0]);
  let connectedtagpath = '';

  if (props.connectedtagpath) connectedtagpath = props.connectedtagpath;

  const STARTPAGEBLOCKS = gql`
  {   
    tags(siteurl: "${props.env.CONTENTBACKEND_SITEURL}",tagpaths:["/start/"],lang:"${i18n.languages[0]}")
      {
        id
       title        
        connectedTagPath
        connectedContents{      
            ... on ContentBlock{
                name
                uihints
                id
                preamble        
                link     
                linkAltText   
                nestledContentBlocks{      
                    ... on NestledContentBlock{
                      preamble
                      bodyHTML        
                      name
                     link
                      uihints
                      id
                    }
                }
            }
        }
      }
    }
`;

  const { error, data } = useQuery<{ tags: Array<any> }>(
    STARTPAGEBLOCKS
  );

  const blocks =
    data &&
    data.tags &&
    data.tags.length > 0 &&
    data.tags[0].connectedContents &&
    data.tags[0].connectedContents.length > 0
      ? data.tags[0].connectedContents
      : [];
  const jumbotron_logo = require('../../pages/StartPage/grafic.png');  

  return (
    <div>
      {!data && (
        <span className="text-5 loading">{i18n.t('common|loading')}...</span>
      )}

      {error && (
        <span className="text-5">{error}</span>
      )}

      {data && data!.tags && (
        <div>
          {blocks.map((block: any, index: number) => {
            if (block.uihints[0] == 'TextAndImage') {
              return (
                <div key={index}>
                  <div className="jumbotron">
                    <div className="jumbotron_heading">
                      <h1>{block.name}</h1>
                      <span className="text-5">{block.preamble}</span>
                    </div>
                    <Spacer></Spacer>
                    <div className="jumbotron_img">
                                            <img src={block.link} alt={block.linkAltText} />
                    </div>
                  </div>
                </div>
              );
            }
            else
            if (block.uihints[0] == 'Puffar') {
              return (
                <div className="grid" key={index}>
                  <div className="content_grid">
                    <h2 className="text-3">{block.name}</h2>
                    <p className="text-5 content_grid-preamble">
                      {block.preamble}
                    </p>
                    {block.nestledContentBlocks &&
                      block.nestledContentBlocks.length > 0 && (
                        <ul className="content_grid-list">
                          {block.nestledContentBlocks.map(
                            (puffblock: any, puffIndex: number) => {
                              return (
                                <li
                                  key={puffIndex}
                                  className="content_grid-item"
                                  onClick={() => {
                                    (window as any).location.href =
                                      puffblock.link;
                                  }}
                                >
                                  <div className="content_grid-item-wrapper">
                                    <a
                                      href={puffblock.link}
                                      className="content_grid-itemlink text-4"
                                    >
                                      {puffblock.name}
                                    </a>
                                    <p className="text-5 content_grid-itemdesc">
                                      <Truncate lines={4}>
                                        {puffblock.preamble}
                                      </Truncate>
                                    </p>
                                  </div>
                                </li>
                              );
                            }
                          )}
                        </ul>
                      )}
                  </div>
                </div>
              );
            }
            return <div key={index}></div>;
          })}
        </div>
      )}
    </div>
  );
};
