import express from 'express'
import { SettingsUtil } from "../config/env/SettingsUtil";
import fetch from 'node-fetch';
const { SitemapStream, streamToPromise } = require('sitemap')
const { createGzip } = require('zlib')

export const getSitemap = (req:express.Request, res:express.Response, next:Function) => {
  let sitemap;

  res.header('Content-Type', 'application/xml');
  res.header('Content-Encoding', 'gzip');  

  try {    
    let env = SettingsUtil.create(req.get('Host') || '');
    
    const smStream = new SitemapStream({ hostname: env.CANONICAL_URL })
    const pipeline = smStream.pipe(createGzip())    

    addStaticPages(smStream);

    // cache the response
    streamToPromise(pipeline)
      .then(sm => {sitemap = sm})

    // make sure to attach a write stream such as streamToPromise before ending
    smStream.end()
    // stream write the response
    pipeline.pipe(res)          
      .on('error', (e) => {throw e});    

  } catch (e) {
    console.error(e)
    res.status(500).end()    
  }
}

const addStaticPages = (smStream) => {
  // routes typed in routes.ts
  smStream.write({ url: '/sv/om-webbplatsen/', changefreq: 'monthly', links:[{lang:'en',url:'/en/about-webpage'}] })
  smStream.write({ url: '/sv/om-webbplatsen/tillganglighet', changefreq: 'monthly', links:[{lang:'en',url:'/en/about-webpage/accessibility'}] })
  smStream.write({ url: '/sv/registrera-data', changefreq: 'monthly', links:[{lang:'en',url:'/en/register-data'}] })  
}
