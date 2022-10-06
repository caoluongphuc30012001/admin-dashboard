import { Button, Modal, Row, Table, Typography, Input } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { CheckCircleOutlined } from '@ant-design/icons';
import { PlusOutlined } from '@ant-design/icons';
import { CategoryType } from 'types/typing';
import { AppContext } from '@context/AppProvider';
import openNotification from '@components/openNotification';
const { Text } = Typography;
function TableCustom() {
    const { user } = useContext(AppContext);
    const [newEntity, setNewEntity] = useState<CategoryType>();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isModify, setIsModify] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const handleResetDate = () => {
        axios
            .get(process.env.BACK_END_URL + '/category/get-category')
            .then((respone) => {
                setData(respone.data.data.listCategory);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const handleOk = () => {
        if (isModify) {
            axios
                .post(process.env.BACK_END_URL + '/category/update-category', {
                    ...newEntity,
                    userId: user?._id,
                    categoryId: newEntity?._id,
                })
                .then((response) => {
                    if (response.data.code === 502) {
                        handleResetDate();
                    }
                    openNotification(
                        '',
                        response.data.message,
                        <CheckCircleOutlined />
                    );
                })
                .catch((error) => {
                    openNotification(
                        '',
                        error.response.data.message,
                        <CheckCircleOutlined />
                    );
                });
        } else {
            axios
                .post(process.env.BACK_END_URL + '/category/add-category', {
                    ...newEntity,
                    userId: user?._id,
                })
                .then((response) => {
                    if (response.data.code === 501) {
                        handleResetDate();
                    }
                    openNotification(
                        '',
                        response.data.message,
                        <CheckCircleOutlined />
                    );
                })
                .catch((error) => {
                    openNotification(
                        '',
                        error.response.data.message,
                        <CheckCircleOutlined />
                    );
                });
        }
        setIsModify(false);
        setIsModalOpen(false);
        setNewEntity(undefined);
    };
    const handleCancel = () => {
        setNewEntity(undefined);
        setIsModify(false);
        setIsModalOpen(false);
    };
    const deleteHandle = (e: CategoryType) => {
        setNewEntity(e);
        setIsDelete(true);
    };
    const modifyHandle = (e: CategoryType) => {
        setNewEntity(e);
        setIsModify(true);
        setIsModalOpen(true);
    };
    const columns: ColumnsType<CategoryType> = [
        {
            title: 'Tên danh mục',
            dataIndex: 'name',
            key: '_id',
            align: 'center',
            render: (text) => <Text>{text}</Text>,
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: '_id',
            align: 'center',
            render: (text) => <Text>{text}</Text>,
        },
        {
            title: 'Hành động',
            key: '_id',
            align: 'center',
            render: (_, entity) => (
                <Row
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <Text
                        onClick={() => {
                            modifyHandle(entity);
                        }}
                        style={{
                            color: '#1890ff',
                            cursor: 'pointer',
                        }}
                    >
                        Chỉnh sửa
                    </Text>
                    <Text
                        onClick={() => {
                            deleteHandle(entity);
                        }}
                        style={{
                            color: '#1890ff',
                            cursor: 'pointer',
                        }}
                    >
                        Xóa
                    </Text>
                </Row>
            ),
            width: '150px',
        },
    ];

    const handleOkDelete = () => {
        axios
            .post(process.env.BACK_END_URL + '/category/delete-category', {
                categoryId: newEntity?._id,
                userId: user?._id,
            })
            .then((response) => {
                if (response.data.code === 505) {
                    handleResetDate();
                }
                openNotification(
                    '',
                    response.data.message,
                    <CheckCircleOutlined />
                );
            })
            .catch((error) => {
                openNotification(
                    '',
                    error.response.data.message,
                    <CheckCircleOutlined />
                );
            });
        setIsDelete(false);
        setNewEntity(undefined);
    };

    const handleCancelDelete = () => {
        setNewEntity(undefined);
        setIsDelete(false);
    };

    const [data, setData] = useState<CategoryType[] | undefined>();
    useEffect(() => {
        handleResetDate();
    }, []);
    return (
        <>
            <Modal
                title='Delete Category'
                open={isDelete}
                onOk={handleOkDelete}
                onCancel={handleCancelDelete}
            >
                {`Bạn có muốn xóa danh mục "${newEntity?.name}" ?`}
            </Modal>
            <Modal
                title='Update/Create Category'
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Row>
                    <Text>Tên danh mục</Text>
                    <Input
                        placeholder='Tên danh mục'
                        onChange={(e) => {
                            const value: CategoryType = newEntity
                                ? { ...newEntity, name: e.target.value }
                                : { name: e.target.value };
                            setNewEntity(value);
                        }}
                        value={newEntity?.name}
                    />
                </Row>
                <Row>
                    <Text>Mô tả</Text>
                    <Input
                        placeholder='Mô tả'
                        onChange={(e) => {
                            const value: CategoryType = newEntity
                                ? { ...newEntity, description: e.target.value }
                                : { description: e.target.value };
                            setNewEntity(value);
                        }}
                        value={newEntity?.description}
                    />
                </Row>
            </Modal>
            <Row
                style={{
                    position: 'fixed',
                }}
            >
                <Button type='primary' onClick={() => setIsModalOpen(true)}>
                    <Text
                        style={{
                            color: 'white',
                        }}
                    >
                        Thêm mới
                    </Text>
                    <PlusOutlined />
                </Button>
            </Row>
            <Table
                columns={columns}
                dataSource={data}
                rowKey='_id'
                pagination={{
                    showQuickJumper: true,
                    hideOnSinglePage: true,
                    pageSize: 20,
                }}
                style={{
                    marginTop: 40,
                }}
            />
        </>
    );
}

export default TableCustom;
