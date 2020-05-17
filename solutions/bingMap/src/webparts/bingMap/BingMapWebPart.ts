import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'BingMapWebPartStrings';
import BingMap from './components/BingMap';
import { IBingMapProps } from './components/IBingMapProps';

export interface IBingMapWebPartProps {
  description: string;
  siteurl:string;
}

export default class BingMapWebPart extends BaseClientSideWebPart <IBingMapWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IBingMapProps> = React.createElement(
      BingMap,
      {
        description: this.properties.description,
        siteurl:this.properties.siteurl,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('siteurl', {
                  label: "Enter Site URL:"
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
