import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export default ({mode, setMode}) => (
<div>
     <FormControlLabel
        control={
          <Switch
            checked={mode === 'dev'}
            onClick={(e) => setMode(mode === 'dev'? 'nomal': 'dev')}
            value={mode}
            color="primary"
          />
        }
        label={mode}
      />
 </div>
)