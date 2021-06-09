import React, { FC, useEffect } from 'react';
import { CmsContent } from '../../../lib/CmsContent';
import Navigation from '../../core/Navigation';
import Footer from '../Footer';
import Header from '../Header';
import PromoBanner from '../PromoBanner';
import SearchBox from '../SearchBox';
import Sidebar from '../Sidebar';
import UserActions from '../UserActions';

interface Props {
    pageProps: {
        navigation?: CmsContent;
    };
}

const Layout: FC<Props> = ({ children, pageProps }) => {
    const navigation = pageProps?.navigation || [];

    const [sidebarOpen, setSidebarOpen] = React.useState(false);

    const handleToggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    }

    return (
        <>
            <div>
                <PromoBanner>ORDER BEFORE 1PM FOR NEXT DAY DELIVERY</PromoBanner>

                <Header actions={<UserActions />}
                    search={<SearchBox />}
                    navigation={(
                        <Navigation navigation={navigation}>
                        </Navigation>
                    )}
                    onToggleSidebar={handleToggleSidebar}>
                </Header>

                {children}

                <Footer />
            </div>

            <Sidebar navigation={navigation} open={sidebarOpen} onToggleOpen={handleToggleSidebar} />
        </>
    );
};

export default Layout;
