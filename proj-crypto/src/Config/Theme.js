import { TextField, createTheme, styled } from "@mui/material";

export const theme = createTheme({
    components: {
        MuiFormHelperText: {
            styleOverrides: {
                root: {
                    color: 'gray'
                }
            }
        },
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    color: '#047857'
                }
            }
        },
        MuiPaginationItem:{
            styleOverrides:{
                root:{
                    color: '#f1f1f1',
                    fontSize: '12px'
                }
            }
        }
    },
    palette: {
        mode: 'light',
        primary: {
            main: '#047857',
        }
    }
});

export const StyledTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            'borderColor': '#047857'
        },
        '&:hover fieldset': {
            'borderColor': '#047857'
        },
        '& input': {
            'color': '#f1f1f1 !important'
        },
        '& textarea': {
            'color': '#f1f1f1'
        },
        '& .MuiInputBase-input': {
            color: '#f1f1f1',
        },
    }

});
