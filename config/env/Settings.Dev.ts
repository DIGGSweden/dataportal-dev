import { EnvSettings } from "./EnvSettings";

export class Settings_Dev extends EnvSettings {  
  CONTENTBACKEND_SITEURL="*utvecklarportal.web.local";

  // CONTENTBACKEND_GRAPHAPI="https://digg-test-graphproxy.azurewebsites.net";
  CONTENTBACKEND_GRAPHAPI="http://localhost:4444";

  CANONICAL_URL = "http://localhost:8080";

  MATOMO_SITEID = -1;

  envName = 'dev';

  public constructor()
  {
    super();    
  }
}