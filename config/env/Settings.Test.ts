import { EnvSettings } from "./EnvSettings";

export class Settings_Test extends EnvSettings {  
  CONTENTBACKEND_SITEURL = "*";  //set to dev.digg.se when backend is multisite enabled

  CONTENTBACKEND_GRAPHAPI="https://digg-test-graphproxy.azurewebsites.net";

  CANONICAL_URL = "https://digg-test-devportal.azurewebsites.net";

  envName = 'test';

  public constructor()
  {
    super();    
  }
}