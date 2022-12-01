import { AppContext } from '@context/AppProvider';
import axios from 'axios';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { OrderType, PageType } from 'types/typing';
import openNotification from '@components/openNotification';
import { CheckCircleOutlined } from '@ant-design/icons';
import CardCustom from './CardCustom';
import { Modal } from 'antd';
import { io } from 'socket.io-client';
const socket = io(process.env.BACK_END_URL as string);
type TableCustomProps = {
    pageType: PageType;
};

function TableCustom({ pageType }: TableCustomProps) {
    const { user } = useContext(AppContext);
    const [listData, setListData] = useState<OrderType[] | undefined>();
    const [current, setCurrent] = useState<OrderType | undefined>();
    const getData = useCallback(() => {
        if (pageType && user?._id)
            axios
                .post(process.env.BACK_END_URL + '/order/get-list-order', {
                    status: pageType,
                    userId: user?._id,
                })
                .then((response) => {
                    setListData(response.data.data.listOrder);
                })
                .catch((err) => {
                    openNotification(
                        'error',
                        err.data.message,
                        <CheckCircleOutlined />
                    );
                });
    }, [pageType, user]);
    useEffect(() => {
        getData();
        socket.on('admin-dashboard', () => {
            getData();
        });
        return () => {
            socket.off('admin-dashboard');
        };
    }, [getData]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        axios
            .post(process.env.BACK_END_URL + '/order/delete-order', {
                userId: user?._id,
                orderId: current?._id,
            })
            .then((response) => {
                openNotification(
                    'success',
                    response.data.message,
                    <CheckCircleOutlined />
                );
                if (response.data.code === 406) {
                    getData();
                }
            })
            .catch((error) => {
                openNotification(
                    'error',
                    error.data.message,
                    <CheckCircleOutlined />
                );
            });
        setCurrent(undefined);
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setCurrent(undefined);
        setIsModalOpen(false);
    };
    return (
        <>
            <Modal
                title='Basic Modal'
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>Bạn có chắc muốn xóa đơn hàng này không?</p>
            </Modal>
            {listData?.map((item) => {
                return (
                    <CardCustom
                        item={item}
                        key={item._id}
                        showModal={showModal}
                        setCurrent={setCurrent}
                        getData={getData}
                    />
                );
            })}
        </>
    );
}

export default TableCustom;
