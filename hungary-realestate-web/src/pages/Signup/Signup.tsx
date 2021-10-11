import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Input, Layout, Space } from 'antd';
import styled from 'styles';
import { Card } from 'components';

const Container = styled(Layout)`
  width: 100%;
  height: 100vh;
`;

const StyledSpace = styled(Space)`
  width: 100%;
  justify-content: center;
`;

export const Signup: FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  return (
    <Container>
      <Card title="Create account">
        <Form form={form} name="signup" onFinish={onFinish}>
          <Form.Item name="username" rules={[{ required: true, message: 'Please input your username.', whitespace: true }]}>
            <Input size="large" placeholder="Username" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: 'Please input your password.' }]} hasFeedback>
            <Input.Password size="large" placeholder="Password" />
          </Form.Item>
          <Form.Item
            name="confirm"
            dependencies={['password']}
            hasFeedback
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password size="large" placeholder="Confirm Password" />
          </Form.Item>
          <Form.Item>
            <Button block size="large" type="primary" htmlType="submit">
              Create account
            </Button>
          </Form.Item>
          <StyledSpace size={0}>
            Already have an account?
            <Link to="/login">
              <Button type="link">Sign in.</Button>
            </Link>
          </StyledSpace>
        </Form>
      </Card>
    </Container>
  );
};
