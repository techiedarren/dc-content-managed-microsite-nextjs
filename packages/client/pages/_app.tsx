import React, { FC } from 'react';
import NextApp from 'next/app';
import { GlobalStyle, Head, WithTheme } from '../components/core';

const Noop: FC = ({ children }) => <>{children}</>

export default class App extends NextApp {
    componentDidMount() {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }

    render() {
        const { Component, pageProps } = this.props;
        const Layout = (Component as any).Layout || Noop;

        return (
            <React.Fragment>
                <Head />
                <WithTheme>
                    <GlobalStyle />
                    <Layout pageProps={pageProps}>
                        <Component {...pageProps} />
                    </Layout>
                </WithTheme>
            </React.Fragment>
        );
    }
}