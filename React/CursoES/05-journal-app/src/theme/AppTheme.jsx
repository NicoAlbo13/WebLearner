import {ThemeProvider} from '@emotion/react';
import {CssBaseline} from '@mui/material'
import { purple } from './purple';

export const AppTheme = ({children}) => {
    return (
    <ThemeProvider theme={purple}>
        <CssBaseline/>
        {children}
    </ThemeProvider>
    )
}
