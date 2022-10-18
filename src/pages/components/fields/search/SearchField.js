import React from 'react';
import {Box, TextField} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from '@mui/icons-material/Search';

const SearchField = (props) => {
    return (
        <Box
            sx={{
                width: '100%',
                padding: '0 0 40px 0',
            }}
        >
            <TextField
                fullWidth
                label={props.label}
                onChange={props.onChange}
                InputProps={{
                    endAdornment: <InputAdornment position="start">
                        <SearchIcon/>
                    </InputAdornment>
                }}
            />
        </Box>
    );
};

export default SearchField;