// import { ShoppingCartOutlined, ReadOutlined, ShopOutlined, AppstoreAddOutlined } from '@ant-design/icons';
import { AppContext } from '@context/AppProvider';
import { Layout, Row, Typography, Button } from 'antd';
import { Header } from 'antd/lib/layout/layout';
// import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { MenuItemType } from 'types/typing';
import MenuBeside from './MenuBeside';
import style from './style.module.scss';
const { Text } = Typography;
type LayoutProps = {
    children: React.ReactNode;
    listItemMenu: MenuItemType[];
};

const LayoutCustom: React.FC<LayoutProps> = ({ children, listItemMenu }) => {
    const { setUser, user } = useContext(AppContext);
    const handleLogout = () => {
        window.localStorage.removeItem('userId');
        window.sessionStorage.removeItem('userId');
        setUser(undefined);
    };
    return (
        <Layout className={style['layout-container']}>
            <Header className={style['header-layout']}>
                <Row
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Text
                        strong={true}
                        style={{
                            fontSize: 20,
                        }}
                    >
                        {user?.userName}{' '}
                    </Text>
                    <Button type='primary' onClick={handleLogout}>
                        Đăng xuất
                    </Button>
                </Row>
            </Header>
            <Layout className={style['layout-custom']}>
                <Layout.Sider width={200}>
                    <MenuBeside listItemMenu={listItemMenu} />
                </Layout.Sider>
                <Layout.Content>{children}</Layout.Content>
            </Layout>
        </Layout>
    );
};

export default LayoutCustom;
