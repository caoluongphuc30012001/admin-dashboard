import {
    Avatar,
    Button,
    Input,
    InputNumber,
    Modal,
    Row,
    Select,
    Table,
    Typography,
} from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/lib/table';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { CategoryType, ToppingType } from 'types/typing';
import openNotification from '@components/openNotification';
import { AppContext } from '@context/AppProvider';
const { Text } = Typography;
const { Option } = Select;
function TableCustom() {
    const { user } = useContext(AppContext);
    const [newEntity, setNewEntity] = useState<ToppingType>();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [data, setData] = useState<ToppingType[] | undefined>();
    const [typeList, setTypeList] = useState<CategoryType[] | undefined>();
    const [modify, setModify] = useState<boolean>(false);
    const [isDelete, setIsDelete] = useState(false);
    const handleResetData = () => {
        axios
            .get(process.env.BACK_END_URL + '/topping/get-topping')
            .then((respone) => {
                setData(respone.data.data.listTopping);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const handleOk = () => {
        if (modify) {
            axios
                .post(process.env.BACK_END_URL + '/topping/update-topping', {
                    ...newEntity,
                    userId: user?._id,
                    toppingId: newEntity?._id,
                })
                .then((response) => {
                    openNotification(
                        '',
                        response.data.message,
                        <CheckCircleOutlined />
                    );
                    if (response.data.code === 603) handleResetData();
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
                .post(process.env.BACK_END_URL + '/topping/add-topping', {
                    ...newEntity,
                    userId: user?._id,
                })
                .then((response) => {
                    openNotification(
                        '',
                        response.data.message,
                        <CheckCircleOutlined />
                    );
                    if (response.data.code === 601) handleResetData();
                })
                .catch((error) => {
                    console.error(error);
                    openNotification(
                        '',
                        error.response.data.message,
                        <CheckCircleOutlined />
                    );
                });
        }

        setModify(false);
        setNewEntity(undefined);
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setModify(false);
        setNewEntity(undefined);
        setIsModalOpen(false);
    };
    const handleOkDelete = () => {
        axios
            .post(process.env.BACK_END_URL + '/topping/delete-topping', {
                userId: user?._id,
                toppingId: newEntity?._id,
            })
            .then((response) => {
                openNotification(
                    '',
                    response.data.message,
                    <CheckCircleOutlined />
                );
                if (response.data.code === 605) handleResetData();
            })
            .catch((error) => {
                openNotification(
                    '',
                    error.response.data.message,
                    <CheckCircleOutlined />
                );
            });
        setNewEntity(undefined);
        setIsDelete(false);
    };
    const handleCancelDelete = () => {
        setNewEntity(undefined);
        setIsDelete(false);
    };
    const deleteHandle = (e: ToppingType) => {
        setNewEntity(e);
        setIsDelete(true);
    };
    const modifyHandle = (e: ToppingType) => {
        setNewEntity(e);
        setModify(true);
        setIsModalOpen(true);
    };
    const columns: ColumnsType<ToppingType> = [
        {
            title: 'Tên topping',
            dataIndex: 'name',
            key: '_id',
            align: 'center',
            render: (text) => <Text>{text}</Text>,
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: '_id',
            align: 'center',
            render: (text) => <Text>{text}</Text>,
        },
        {
            title: 'Ảnh',
            dataIndex: 'image',
            key: '_id',
            align: 'center',
            render: (_, entity) => (
                <Avatar shape='square' src={entity.image}></Avatar>
            ),
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
    useEffect(() => {
        handleResetData();
        axios
            .get(process.env.BACK_END_URL + '/category/get-category')
            .then((respone) => {
                setTypeList(respone.data.data.listCategory);
            })
            .catch((error) => {
                openNotification(
                    '',
                    error.response.data.message,
                    <CheckCircleOutlined />
                );
            });
    }, []);
    return (
        <>
            <Modal
                title='Delete Product'
                open={isDelete}
                onOk={handleOkDelete}
                onCancel={handleCancelDelete}
            >
                {`Bạn có muốn xóa sản phẩm "${newEntity?.name}" ?`}
            </Modal>
            <Modal
                title='Update/Create Product'
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Row>
                    <Text>Tên sản phẩm</Text>
                    <Input
                        placeholder='Tên sản phẩm'
                        onChange={(e) => {
                            const value: ToppingType = newEntity
                                ? { ...newEntity, name: e.target.value }
                                : { name: e.target.value };
                            setNewEntity(value);
                        }}
                        value={newEntity?.name}
                    />
                </Row>
                <Row>
                    <Text>Mô tả sản phẩm</Text>
                    <Input
                        placeholder='Mô tả sản phẩm'
                        onChange={(e) => {
                            const value: ToppingType = newEntity
                                ? { ...newEntity, description: e.target.value }
                                : { description: e.target.value };
                            setNewEntity(value);
                        }}
                        value={newEntity?.description}
                    />
                </Row>
                <Row>
                    <Text>Giá</Text>
                    <InputNumber
                        placeholder='Giá'
                        onChange={(e) => {
                            const value: ToppingType = newEntity
                                ? {
                                      ...newEntity,
                                      price: Number(e),
                                  }
                                : { price: Number(e) };
                            setNewEntity(value);
                        }}
                        value={newEntity?.price}
                    />
                </Row>
                <Row>
                    <Text>Loại</Text>
                    <Select
                        value={newEntity?.typeId}
                        style={{ width: 120 }}
                        onChange={(e) => {
                            const value: ToppingType = newEntity
                                ? { ...newEntity, typeId: e }
                                : { typeId: e };
                            setNewEntity(value);
                        }}
                    >
                        {typeList?.map((item) => {
                            return (
                                <Option key={item._id} value={item._id}>
                                    {item.name}
                                </Option>
                            );
                        })}
                    </Select>
                </Row>
                <Row>
                    <Text>Ảnh</Text>
                    <Input
                        placeholder='Ảnh'
                        onChange={(e) => {
                            const value: ToppingType = newEntity
                                ? { ...newEntity, image: e.target.value }
                                : { image: e.target.value };
                            setNewEntity(value);
                        }}
                        value={newEntity?.image}
                    />
                </Row>
            </Modal>
            <Row
                style={{
                    position: 'fixed',
                }}
            >
                <Button
                    type='primary'
                    onClick={() => {
                        setIsModalOpen(true);
                    }}
                >
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
