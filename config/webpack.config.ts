import CopyWebpackPlugin from 'copy-webpack-plugin';
import path from 'path';
import webpack from 'webpack';
import { createWebpackConfig } from './createWebpackConfig';

const seed = {};

const plugins = [  
  new webpack.DefinePlugin({
    'process.env.CLIENT': JSON.stringify(true),
  }),
];

export default [
  createWebpackConfig(
    {
      // devtool: 'inline-source-map',
      // node: {
      //   global: false
      // },      
      entry: {
        'app-legacy': ['url-polyfill', 'babel-polyfill', './src/index.tsx'],
      },
      output: {
        filename: '[name].js',
      },
      optimization: {
        splitChunks: { chunks: 'all', name: 'vendor-legacy' },
      },
      plugins: [...plugins],
    },
    { seed }
  ),    
  createWebpackConfig(
    {
      entry: { app: './src/index.tsx' },
      plugins: [
        ...plugins,        
        new CopyWebpackPlugin([                    
          { from: path.join(__dirname, '../public/*.json'), flatten: true },
          { from: path.join(__dirname, '../public/*.png'), flatten: true },
          { from: path.join(__dirname, '../public/*.ico'), flatten: true },
          { from: path.join(__dirname, '../public/*.xml'), flatten: true },
          { from: path.join(__dirname, '../public/*.svg'), flatten: true },          
          { from: path.join(__dirname, '../public/fonts/'), flatten: false, to: path.join(__dirname, '../dist/client/fonts') },     
          { from: path.join(__dirname, '../public/font-awesome.min.css'), flatten: true },                     
          { from: path.join(__dirname, '../assets/*.png'), flatten: false },
          { from: path.join(__dirname, '../assets/*.jpg'), flatten: false },
        ]),
      ],
    },
    {
      babelTarget: {
        browsers: [
          'chrome >= 61',
          'firefox >= 48',
          'safari >= 11',
          'edge >= 16',
          'ie >= 11',
        ],
      },
      seed,
    }
  ),
];
