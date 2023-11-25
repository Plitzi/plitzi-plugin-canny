// Packages
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import Input from '@plitzi/plitzi-ui/Input';

const Settings = props => {
  const { boardToken, onUpdate } = props;

  const handleChangeBoardToken = useCallback(e => onUpdate('boardToken', e.target.value), [onUpdate]);

  return (
    <div className="flex flex-col">
      <div className="bg-[#1A2835] px-4 py-2 flex items-center justify-center">
        <h1 className="text-white m-0">Canny Widget Settings</h1>
      </div>
      <div className="flex flex-col w-full px-4 py-2">
        <label>Board Token</label>
        <Input value={boardToken} onChange={handleChangeBoardToken} inputClassName="rounded" />
      </div>
    </div>
  );
};

Settings.defaultProps = {
  boardToken: '',
  onUpdate: noop
};

Settings.propTypes = {
  boardToken: PropTypes.string,
  onUpdate: PropTypes.func
};

export default Settings;
