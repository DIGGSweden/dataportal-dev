import { EnvSettings } from "./EnvSettings";

export class Settings_Prod extends EnvSettings {    
  CONTENTBACKEND_SITEURL = "*dev.dataportal.*";  //set to dev.digg.se when backend is multisite enabled

  CONTENTBACKEND_GRAPHAPI="https://digg-prod-graphproxy.azurewebsites.net";

  CANONICAL_URL = "https://dev.dataportal.se";

  MATOMO_SITEID = -1;

  envName = 'prod';

  public constructor()
  {
    super();    
  }
}