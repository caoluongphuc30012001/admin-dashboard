import '@styles/globals.css';
import 'antd/dist/antd.css';
import type { AppProps } from 'next/app';
import AppProvider from '@context/AppProvider';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AppProvider>
            <Component {...pageProps} />
        </AppProvider>
    );
}

export default MyApp;
