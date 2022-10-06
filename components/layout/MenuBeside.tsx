import { useRouter } from 'next/router';
import React from 'react';
import { MenuItemType } from 'types/typing';
import { Row, Typography } from 'antd';
import style from './style.module.scss';

type MenuBesideProps = {
    listItemMenu: MenuItemType[];
};

function MenuBeside({ listItemMenu }: MenuBesideProps) {
    const route = useRouter();

    const handleClick = (path: string) => {
        route.push(path, path);
    };
    return (
        <div className={style['menu-beside']}>
            {listItemMenu?.map((menu) => {
                return (
                    <Row
                        key={menu.key}
                        align='middle'
                        className={`${style['item-menu']} ${
                            menu.isActive ? style['item-menu-active'] : ''
                        }`}
                        onClick={() => {
                            handleClick(menu.path);
                        }}
                    >
                        {menu.icon}
                        <Typography.Text className={style['title-menu']}>
                            {menu.title}
                        </Typography.Text>
                    </Row>
                );
            })}
        </div>
    );
}

export default MenuBeside;
