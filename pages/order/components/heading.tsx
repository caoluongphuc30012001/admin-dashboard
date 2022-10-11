import { Radio } from 'antd';
import { Key } from 'antd/lib/table/interface';
import React from 'react';
import { PageType } from 'types/typing';

type dropdownItemType = {
    text: PageType;
    value: PageType;
    id: Key;
};

type HeadingProps = {
    setPageType: React.Dispatch<React.SetStateAction<PageType>>;
    pageType: PageType;
};

function Heading({ setPageType, pageType }: HeadingProps) {
    const listPageType: dropdownItemType[] = [
        {
            id: 0,
            text: 'pending',
            value: 'pending',
        },
        {
            id: 1,
            text: 'cooking',
            value: 'cooking',
        },
        {
            id: 2,
            text: 'delivering',
            value: 'delivering',
        },
        {
            id: 3,
            text: 'complete',
            value: 'complete',
        },
    ];
    return (
        <Radio.Group
            onChange={(e) => {
                setPageType(e.target.value);
            }}
            value={pageType}
        >
            {listPageType.map((item) => {
                return (
                    <Radio.Button key={item.id} value={item.value}>
                        {item.text}
                    </Radio.Button>
                );
            })}
        </Radio.Group>
    );
}

export default Heading;
