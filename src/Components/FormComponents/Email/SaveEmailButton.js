import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Typography } from '@mui/material';



const SaveEmailButtion=(props) => {
    return (
        <div className='save-email-button'>
            <FormGroup >
                <FormControlLabel   
                                    name="checkbox"
                                    control={<Checkbox defaultChecked color='secondary' />} 
                                    onClick={props.handleCheckbox} 
                                    label={<Typography variant="body2">Save email for future promotions</Typography>} />
            </FormGroup>
        </div>
    )
}

export default SaveEmailButtion;