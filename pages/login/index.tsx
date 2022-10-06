import { Col, Row } from 'antd';
import {
    EyeInvisibleOutlined,
    EyeTwoTone,
    CheckCircleOutlined,
} from '@ant-design/icons';
import { Input, Typography, Checkbox, Button } from 'antd';
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '@context/AppProvider';
import { ResponseType } from 'types/typing';
import openNotification from '@components/openNotification';

const { Title } = Typography;

function Login() {
    const { setUser } = useContext(AppContext);
    const [phoneNumber, setPhoneNumber] = useState<string | undefined>();
    const [password, setPassword] = useState<string | undefined>();
    const [remember, setRemember] = useState<boolean | undefined>(true);
    const handleLogin = () => {
        axios
            .post(process.env.BACK_END_URL + '/user/login-user', {
                phoneNumber,
                password,
            })
            .then((response) => {
                const res: ResponseType = response.data;
                openNotification(
                    '',
                    res.message as string,
                    <CheckCircleOutlined />
                );
                if (res.code === 102) {
                    if (remember) {
                        window.localStorage.setItem(
                            'userId',
                            res.data.user._id
                        );
                    } else {
                        window.sessionStorage.setItem(
                            'userId',
                            res.data.user._id
                        );
                    }
                    setUser(res.data.user);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };
    return (
        <Row justify='center'>
            <Col span={8}>
                <Title>Đăng nhập</Title>
                <Input
                    placeholder='Số điện thoại'
                    onBlur={(e) => {
                        setPhoneNumber(e.target.value);
                    }}
                />
                <br />
                <br />
                <Input.Password
                    placeholder='Mật khẩu'
                    iconRender={(visible) =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                    onBlur={(e) => {
                        setPassword(e.target.value);
                    }}
                />
                <br />
                <br />
                <Checkbox
                    checked={remember}
                    onClick={() => {
                        setRemember(!remember);
                    }}
                >
                    Remember me
                </Checkbox>
                <Button onClick={handleLogin}>Submit</Button>
            </Col>
        </Row>
    );
}

export default Login;
