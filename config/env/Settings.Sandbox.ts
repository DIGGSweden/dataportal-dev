import { EnvSettings } from "./EnvSettings";

export class Settings_Sandbox extends EnvSettings { 
  CONTENTBACKEND_SITEURL="*"; //set to digg.se when backend is multisite enabled

  CONTENTBACKEND_GRAPHAPI="https://digg-prod-graphproxy.azurewebsites.net";

  CANONICAL_URL = "https://www-devportal.se"; //TODO

  MATOMO_SITEID = -1;

  envName = 'sandbox';

  public constructor()
  {
    super();    
  }
}