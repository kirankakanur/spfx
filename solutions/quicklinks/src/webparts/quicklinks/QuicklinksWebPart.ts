import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'QuicklinksWebPartStrings';
import Quicklinks from './components/Quicklinks';
import { IQuicklinksProps } from './components/IQuicklinksProps';
import { PropertyFieldCollectionData, CustomCollectionFieldType } from '@pnp/spfx-property-controls/lib/PropertyFieldCollectionData';

export interface IQuicklinksWebPartProps {
  quickLinksCollection: any[];
  description: string;
}

export default class QuicklinksWebPart extends BaseClientSideWebPart <IQuicklinksWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IQuicklinksProps> = React.createElement(
      Quicklinks,
      {
        description: this.properties.description,
        quickLinksCollection: this.properties.quickLinksCollection,
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
              groupFields: [
                            PropertyFieldCollectionData('quickLinksCollection', {
                            enableSorting:true,
                                fields: [
                                            {
                                              id: 'name',
                                              required: true,
                                              title: 'Link Title',
                                              type: CustomCollectionFieldType.string
                                            },
                                            {
                                              id: 'link',
                                              required: true,
                                              title: 'Link URL',
                                              type: CustomCollectionFieldType.url
                                            },
                                            {
                                              id: 'linktype',
                                              title: 'External Link?',
                                              type: CustomCollectionFieldType.boolean
                                            }
                                ],
                            key: 'quickLinksCollection',
                            label: 'Quick Links',
                            manageBtnLabel: 'Manage Quick Links',
                            panelHeader: 'Manage Quick Links',
                            panelDescription: 'Enter Link Title, Link URL, and check the box if it is an external link. \n\nClick + to add a new link. Click x to remove link. \n\nSort order can be changed by selecting the number from the dropdown list in the first column below.',
                            value: this.properties.quickLinksCollection,
                            })
                            ]
            }
          ]
        }
      ]
    };
  }
}
