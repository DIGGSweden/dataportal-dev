import { EnvSettings } from "./EnvSettings";

export class Settings_Dev extends EnvSettings {  
  CONTENTBACKEND_SITEURL = "*test-devportal.*";  

  CONTENTBACKEND_GRAPHAPI="https://digg-test-graphproxy.azurewebsites.net";

  CANONICAL_URL = "http://localhost:8080";  

  MATOMO_SITEID = -1;

  envName = 'dev';

  public constructor()
  {
    super();    
  }
}