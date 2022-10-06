import { notification } from 'antd';
import React from 'react';

const openNotification = (type: string, value: string, icon: React.ReactNode) => {
    const key = `open${Date.now()}`;
    notification.open({
        message: type,
        description: value,
        key,
        icon: icon
    });
};
export default openNotification;