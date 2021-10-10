import React, { FC } from 'react';
import { Button, Form, Input, Layout, Space } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styled from 'styles';
import { Logo } from 'components';

const Container = styled(Layout)`
  width: 100%;
  height: 100vh;
`;

const Card = styled.div`
  position: relative;
  width: 500px;
  margin: auto;
  padding: ${({ theme }) => theme.size.spacing.xxl}px ${({ theme }) => theme.size.spacing.xxxl}px;
  display: block;
  background-color: ${({ theme }) => theme.palette.paper[0]};
  box-shadow: rgb(0 0 0 / 20%) 0px 1px 3px 0px;
`;

const TitleContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.size.spacing.lg}px;
  text-align: center;
`;

const Title = styled.h1`
  margin-top: ${({ theme }) => theme.size.spacing.xxl}px;
  font-size: 24px;
  font-weight: 700;
`;

const StyledSpace = styled(Space)`
  width: 100%;
`;

export const Login: FC = () => {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  return (
    <Container>
      <Card>
        <TitleContainer>
          <Logo width={200} />
          <Title>Sign in</Title>
        </TitleContainer>
        <Form name="normal_login" onFinish={onFinish}>
          <Form.Item name="username" rules={[{ required: true, message: 'Please input your Username!' }]}>
            <Input size="large" prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
            <Input size="large" prefix={<LockOutlined />} type="password" placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button block size="large" type="primary" htmlType="submit">
              Sign in
            </Button>
          </Form.Item>
          <StyledSpace direction="vertical" size={0} align="center">
            <Button type="link">Create an account.</Button>
            <Button type="link">Forgot your password?</Button>
          </StyledSpace>
        </Form>
      </Card>
    </Container>
  );
};
