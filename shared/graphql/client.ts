import {
    InMemoryCache,    
  } from 'apollo-cache-inmemory';
  import { ApolloClient } from '@apollo/client';
  import { createHttpLink } from 'apollo-link-http'
  
  let globalWindow = typeof window !== 'undefined' ? window : null;
  
  export const createApolloClient = (
    options: {
      backendUrl?: string;
      ssrMode?: boolean;
      serverState?: any;
      cookies?: any;
      fetch?: any;
    } = {
        backendUrl: '/',
      ssrMode: false,
      serverState: null,
      cookies: null,
      fetch: null,
    }
  ) => {
    const { backendUrl, ssrMode, serverState, cookies } = options;

  
    // ! Setting type as any to supress ts error.
    // ! Might cause problems but seems to work for now
    const cache: any = new InMemoryCache();

    const link: any = createHttpLink({
      uri: backendUrl,
      credentials: 'same-origin',    
      fetch: typeof fetch !== 'undefined' ? fetch : options.fetch,
    });    
  
    const client = new ApolloClient({
      ssrMode,
      link: link,
      cache: serverState != null ? cache.restore(serverState) : cache,
      defaultOptions: {
        watchQuery: {
          fetchPolicy: 'cache-and-network',
        },
      },
    });
  
    return client;
  };
  