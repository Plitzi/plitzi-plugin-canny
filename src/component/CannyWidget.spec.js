// Packages
import React, { createContext } from 'react';
import { render } from '@testing-library/react';
import { PlitziServiceProvider } from '@plitzi/plitzi-sdk';

// Relatives
import CannyWidget from './CannyWidget';

describe('CannyWidget', () => {
  it('should render successfully', () => {
    const ref = { current: null };

    const BaseElement = render(
      <PlitziServiceProvider
        value={{
          settings: { previewMode: true },
          utils: { getWindow: () => window },
          contexts: {
            PluginsContext: createContext({ registerCustomAssets: () => {}, unregisterCustomAssets: () => {} })
          }
        }}
      >
        <CannyWidget ref={ref} />
      </PlitziServiceProvider>
    );

    expect(BaseElement).toBeTruthy();
  });
});
