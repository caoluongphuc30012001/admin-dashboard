import React, { useState } from 'react';
import LayoutCustom from '@components/layout/LayoutCustom';
import {
    ShoppingCartOutlined,
    OrderedListOutlined,
    ShopOutlined,
} from '@ant-design/icons';
import { MenuItemType, PageType } from 'types/typing';
import { useRouter } from 'next/router';
import Heading from './components/heading';
import TableCustom from './components/table';

function OrderPage() {
    const route = useRouter();
    const path = route.pathname.split('/')[1];
    const listItemMenu: MenuItemType[] = [
        {
            title: 'Đơn hàng',
            path: '/order',
            key: 'order',
            isActive: path === 'order',
            icon: <ShoppingCartOutlined />,
        },
        {
            title: 'Danh mục',
            path: '/category',
            key: 'category',
            isActive: path === 'category',
            icon: <OrderedListOutlined />,
        },
        {
            title: 'Hàng hóa',
            path: '/product',
            key: 'product',
            isActive: path === 'product',
            icon: <ShopOutlined />,
        },
        {
            title: 'Topping',
            path: '/topping',
            key: 'topping',
            isActive: path === 'topping',
            icon: <ShopOutlined />,
        },
    ];

    const [pageType, setPageType] = useState<PageType>('pending');
    return (
        <LayoutCustom listItemMenu={listItemMenu}>
            <Heading setPageType={setPageType} pageType={pageType} />
            <TableCustom pageType={pageType} />
        </LayoutCustom>
    );
}

export default OrderPage;
