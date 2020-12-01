import React from 'react';
import { EnvSettings } from "../../../config/env/EnvSettings";
import { SettingsUtil } from "../../../config/env/SettingsUtil";
import { gql } from 'apollo-boost';

export interface SettingsProviderProps{
  applicationUrl: string;
}

export interface Settings {   
  env: EnvSettings;
  noScriptContent: string | null;
  // footermenu?: MenuItem[] | null
}

const defaultSettings: Settings = {    
  noScriptContent: '',
  env: SettingsUtil.getDefault()
};

export const SettingsContext = React.createContext<Settings>(
  defaultSettings
);

// const MENUS = gql`
//   {
//     footer:
//       tags(siteurl:"*",tagpathscontains:["/tags/footer/"],requireConnectedContent:false)
//         {
//           id
//           value    
//           title
//           tagPath      
//           connectedTagPath
//           parentID  
//           externalUrl
//           connectedContents{
//             id
//           }        
//         }  
  
//     mainmenu:
//       tags(siteurl:"*",tagpathscontains:["/tags/mainmenu/"],requireConnectedContent:false)
//         {
//           id
//           title
//           value        
//           tagPath      
//           connectedTagPath
//           parentID
//           externalUrl
//           connectedContents{
//             id
//           }
//         }
//   }
// `;

export class SettingsProvider extends React.Component<SettingsProviderProps, {}> {
  constructor(props:any){
    super(props);    

    if(props.applicationUrl)
      defaultSettings.env = SettingsUtil.create(props.applicationUrl);
  }

  render() {
    return (    
        <SettingsContext.Provider
          value={defaultSettings}
        >          
          {this.props.children}
        </SettingsContext.Provider>      
    );
  }
}
