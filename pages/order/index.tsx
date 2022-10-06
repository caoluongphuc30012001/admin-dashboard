import React from 'react';
import LayoutCustom from '@components/layout/LayoutCustom';
import {
    ShoppingCartOutlined,
    OrderedListOutlined,
    ShopOutlined,
} from '@ant-design/icons';
import { MenuItemType } from 'types/typing';
import { useRouter } from 'next/router';

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
    return (
        <LayoutCustom listItemMenu={listItemMenu}>
            <div>hihi</div>
        </LayoutCustom>
    );
}

export default OrderPage;
