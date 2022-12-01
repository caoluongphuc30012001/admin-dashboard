import { Avatar, Card, Row, Space, Typography } from 'antd';
import React, { useContext } from 'react';
import { OrderType } from 'types/typing';
import {
    CheckCircleOutlined,
    ExclamationCircleOutlined,
    DeleteOutlined,
    RightSquareOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import { AppContext } from '@context/AppProvider';
import openNotification from '@components/openNotification';
import { io } from 'socket.io-client';
const socket = io(process.env.BACK_END_URL as string);
const { Text } = Typography;

type ProductItemProps = {
    product: any;
};

type ToppingType = {
    name: string;
    price: number;
    image: string;
    quantity: number;
};

const ProductItem = ({ product }: ProductItemProps) => {
    let total = product.price * product.quantity;
    return (
        <Card
            style={{ width: '80%', margin: 20, border: '1px solid black' }}
            title={
                <Space
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Text>
                        <Avatar src={product?.image} />
                        <Text>{`${product?.name} - ${product?.price}đ`}</Text>
                    </Text>
                    <Text>{`Số lượng: ${product?.quantity}`}</Text>
                </Space>
            }
        >
            {product?.toppings?.map((topping: ToppingType, index: number) => {
                const key = index + 1;
                total += topping?.price * topping?.quantity*product.quantity;
                return (
                    <Space
                        key={key}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: 10,
                            margin: 2,
                            backgroundColor: '#f0f0f0',
                            borderRadius: 5,
                        }}
                    >
                        <Text>
                            <Text
                                style={{
                                    marginLeft: 10,
                                }}
                            >{`${topping?.name} - ${topping?.price}đ`}</Text>
                        </Text>
                        <Text>{`Số lượng: ${topping?.quantity}`}</Text>
                    </Space>
                );
            })}
            <Space>
                <Text strong>{`Tổng tiền: ${total}đ`}</Text>
            </Space>
        </Card>
    );
};

type CardProps = {
    item: OrderType;
    showModal: () => void;
    setCurrent: React.Dispatch<React.SetStateAction<OrderType | undefined>>;
    getData: () => void;
};

function CardCustom({ item, showModal, setCurrent, getData }: CardProps) {
    const handleDelete = (value: OrderType) => {
        setCurrent(value);
        showModal();
    };
    const { user } = useContext(AppContext);
    const handleNext = (value: OrderType) => {
        const listStatus = ['pending', 'cooking', 'delivering', 'complete'];
        const currentStatus = value?.status
            ? listStatus[listStatus.indexOf(value?.status) + 1]
            : value?.status;
        if (currentStatus !== 'complete') {
            axios
                .post(process.env.BACK_END_URL + '/order/update-order', {
                    status: currentStatus,
                    orderId: value?._id,
                    userId: user?._id,
                })
                .then((response) => {
                    openNotification(
                        'success',
                        response.data.message,
                        <CheckCircleOutlined />
                    );
                    if (response.data.code === 402) getData();
                })
                .catch((error) => {
                    openNotification(
                        'error',
                        error.data.message,
                        <CheckCircleOutlined />
                    );
                });
        } else {
            axios
                .post(process.env.BACK_END_URL + '/order/complete-order', {
                    orderId: value?._id,
                    userId: user?._id,
                })
                .then((response) => {
                    openNotification(
                        'success',
                        response.data.message,
                        <CheckCircleOutlined />
                    );
                    if (response.data.code === 402) getData();
                })
                .catch((error) => {
                    openNotification(
                        'error',
                        error.data.message,
                        <CheckCircleOutlined />
                    );
                });
        }
        socket.emit("admin-submit",{
            userId: value.userId
        })
    };
    return (
        <Card
            className='card-custom'
            title={
                <Space
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Text>
                        <DeleteOutlined
                            style={{
                                marginRight: 10,
                                cursor: 'pointer',
                                color: 'red',
                                fontSize: 25,
                            }}
                            onClick={() => {
                                handleDelete(item);
                            }}
                        />
                        {item?.status !== 'complete' && (
                            <RightSquareOutlined
                                style={{
                                    marginRight: 10,
                                    cursor: 'pointer',
                                    color: 'blue',
                                    fontSize: 25,
                                }}
                                onClick={() => {
                                    handleNext(item);
                                }}
                            />
                        )}
                        <Text>{`${item?.userName} - ${item?.phoneNumber}`}</Text>
                    </Text>
                    {item?.isPay ? (
                        <Text
                            style={{
                                backgroundColor: 'green',
                                padding: '5px 10px',
                                borderRadius: '5px',
                            }}
                        >
                            <CheckCircleOutlined
                                style={{
                                    color: 'white',
                                }}
                            />
                            <Text
                                style={{
                                    marginLeft: 10,
                                    color: 'white',
                                }}
                            >
                                Đã thanh toán
                            </Text>
                        </Text>
                    ) : (
                        <Text
                            style={{
                                backgroundColor: 'red',
                                padding: '5px 10px',
                                borderRadius: '5px',
                            }}
                        >
                            <ExclamationCircleOutlined
                                style={{
                                    color: 'white',
                                }}
                            />
                            <Text
                                style={{
                                    marginLeft: 10,
                                    color: 'white',
                                }}
                            >
                                Chưa thanh toán
                            </Text>
                        </Text>
                    )}
                </Space>
            }
            style={{ width: '80%', margin: 20, border: '1px solid black' }}
        >
            <Row>
                <Text
                    style={{
                        marginRight: 5,
                    }}
                    strong
                >
                    Địa chỉ:
                </Text>
                <Text>{item?.address}</Text>
            </Row>
            <Row>
                <Text
                    style={{
                        marginRight: 5,
                    }}
                    strong
                >
                    Danh sách sản phẩm:
                </Text>
            </Row>
            <Row>
                {item?.listProduct?.map((product, index) => {
                    return <ProductItem product={product} key={index} />;
                })}
            </Row>
            <Space>
                <Text strong>{`Tổng tiền: ${item?.totalPrice}đ`}</Text>
            </Space>
        </Card>
    );
}

export default CardCustom;
