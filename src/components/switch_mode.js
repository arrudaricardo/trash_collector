import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export default ({devMode, setDevMode}) => (
<div>
     <FormControlLabel
     style={{marginTop:'1em'}}
        control={
          <Switch
            checked={devMode}
            onClick={(e) => setDevMode(!devMode)}
            value={devMode}
            color="primary"
          />
        }
        label="DevMode"
      />
 </div>
)