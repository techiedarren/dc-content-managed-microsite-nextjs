import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { FC } from "react";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#000'
        },
        secondary: {
            main: '#d54d4d'
        },
        background: {
            default: '#fff'
        },
        grey: {
            "A100": "#333333"
        },
        text: {
            primary: '#333333'
        },
        divider: '#d5d5d5'
    },
    shape: {
        borderRadius: 0
    }
});

const WithTheme: FC = ({ children }) => {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default WithTheme;
