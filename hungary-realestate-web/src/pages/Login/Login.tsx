import React, { FC } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Button, Form, Input, Layout, message, Space } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAuth } from 'auth';
import styled from 'styles';
import { Card } from 'components';

const Container = styled(Layout)`
  width: 100%;
  height: 100vh;
`;

const StyledSpace = styled(Space)`
  width: 100%;
`;

export const Login: FC = () => {
  const history = useHistory();
  const location = useLocation<{ from: string }>();
  const { login } = useAuth();
  const { from } = location.state || { from: { pathname: '/' } };

  const onFinish = async (values: AuthRequestValues) => {
    try {
      await login(values);
      history.replace(from);
    } catch (errMsg) {
      message.error(errMsg as string);
    }
  };

  return (
    <Container>
      <Card title="Sign in">
        <Form name="login" onFinish={onFinish}>
          <Form.Item name="username" rules={[{ required: true, message: 'Please input your Username.' }]}>
            <Input size="large" prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password.' }]}>
            <Input size="large" prefix={<LockOutlined />} type="password" placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button block size="large" type="primary" htmlType="submit">
              Sign in
            </Button>
          </Form.Item>
          <StyledSpace direction="vertical" size={0} align="center">
            <Link to="/signup">
              <Button type="link">Create an account.</Button>
            </Link>
            <Button type="link">Forgot your password?</Button>
          </StyledSpace>
        </Form>
      </Card>
    </Container>
  );
};
