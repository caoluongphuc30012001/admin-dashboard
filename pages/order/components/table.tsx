import { AppContext } from '@context/AppProvider';
import axios from 'axios';
import React, { useCallback, useContext, useEffect } from 'react';
import { PageType } from 'types/typing';
import { io } from 'socket.io-client';
import { Button } from 'antd';
const socket = io(process.env.BACK_END_URL as string);
type TableCustomProps = {
    pageType: PageType;
};

function TableCustom({ pageType }: TableCustomProps) {
    const { user } = useContext(AppContext);
    const getData = useCallback(() => {
        if (pageType && user?._id)
            axios
                .post(process.env.BACK_END_URL + '/order/get-list-order', {
                    status: pageType,
                    userId: user?._id,
                })
                .then((response) => {
                    console.log(response);
                })
                .catch((err) => {
                    console.log(err);
                });
    }, [pageType, user]);
    useEffect(() => {
        socket.on('admin-dashboard', (res) => {
            console.log(res);
        });
        return () => {
            socket.off('admin-dashboard');
        };
    }, []);
    useEffect(() => {
        getData();
    }, [getData]);
    return (
        <div>
            <Button
                onClick={() => {
                    socket.emit('admin-submit', {
                        message: 'reload',
                    });
                }}
            >
                Click
            </Button>
        </div>
    );
}

export default TableCustom;
