import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';

import { escape } from '@microsoft/sp-lodash-subset';

import * as strings from 'AngularElementsWebPartStrings';

import 'angular-elements/dist/AngularElements/bundle.js';

require('../../../node_modules/angular-elements/dist/AngularElements/styles.css');

export interface IAngularElementsWebPartProps {
  title: string;
}

export default class AngularElementsWebPart extends BaseClientSideWebPart<IAngularElementsWebPartProps> {

  public render(): void {
    const siteUrl = this.context.pageContext.web.absoluteUrl;
    console.log(siteUrl);
    this.domElement.innerHTML = `<app-angular-elements-web-part id="ae" title="${ this.properties.title }" siteurl="${siteUrl}"></app-angular-elements-web-part>`;
    console.log(document.getElementById("ae"));
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
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
