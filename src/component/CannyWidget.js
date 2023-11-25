// Packages
import React, { forwardRef, useCallback, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { RootElement, usePlitziServiceContext } from '@plitzi/plitzi-sdk';

// Styles
import './Assets/index.scss';

const CannyWidget = forwardRef((props, ref) => {
  const { className, internalProps, boardToken } = props;
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const {
    // settings: { previewMode },
    utils: { getWindow },
    contexts: { PluginsContext }
  } = usePlitziServiceContext();

  const { registerCustomAssets, unregisterCustomAssets } = useContext(PluginsContext);

  const myWindow = getWindow();

  const handleAssetsLoaded = useCallback(() => setAssetsLoaded(true), []);

  useEffect(() => {
    registerCustomAssets([{ url: 'https://canny.io/sdk.js', onload: handleAssetsLoaded }]);

    return () => {
      unregisterCustomAssets(['https://canny.io/sdk.js']);
    };
  }, [handleAssetsLoaded, registerCustomAssets, unregisterCustomAssets]);

  useEffect(() => {
    if (!boardToken || !assetsLoaded) {
      return;
    }

    if (myWindow.Canny) {
      myWindow.Canny('render', {
        boardToken,
        basePath: null,
        ssoToken: null,
        theme: 'light'
      });
    }
  }, [boardToken, assetsLoaded]);

  return (
    <RootElement
      ref={ref}
      internalProps={internalProps}
      className={classNames('plitzi-component__canny-widget', className)}
      data-canny
    />
  );
});

CannyWidget.defaultProps = {
  className: '',
  internalProps: {},
  boardToken: ''
};

CannyWidget.propTypes = {
  className: PropTypes.string,
  internalProps: PropTypes.object,
  boardToken: PropTypes.string
};

export default CannyWidget;
