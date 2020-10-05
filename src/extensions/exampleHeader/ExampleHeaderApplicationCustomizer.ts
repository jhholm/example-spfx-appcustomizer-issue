import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { ExampleHeader } from './components/ExampleHeader';

import * as strings from 'ExampleHeaderApplicationCustomizerStrings';

const LOG_SOURCE: string = 'ExampleHeaderApplicationCustomizer';
const PLACEHOLDER = PlaceholderName.Top;


/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IExampleHeaderApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class ExampleHeaderApplicationCustomizer
  extends BaseApplicationCustomizer<IExampleHeaderApplicationCustomizerProperties> {
  
  private _placeholder: PlaceholderContent | undefined;

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceHolders);

    return Promise.resolve();
  }

  private _renderPlaceHolders() {
    if (!this._placeholder) {
      this._placeholder = this.context.placeholderProvider.tryCreateContent(
        PLACEHOLDER,
        { onDispose: this._onDispose }
      );
  
      // The extension should not assume that the expected placeholder is available.
      if (!this._placeholder) {
        console.error("The expected placeholder (Top) was not found.");
        return;
      }
  
      if (this._placeholder) {
        const element = React.createElement(
          ExampleHeader,
          {

          }
        )
        ReactDOM.render(element, this._placeholder.domElement);
      }
    }
  }

  private _onDispose() {
    if (this._placeholder) {
      ReactDOM.unmountComponentAtNode(this._placeholder.domElement);
    }
  }
}
