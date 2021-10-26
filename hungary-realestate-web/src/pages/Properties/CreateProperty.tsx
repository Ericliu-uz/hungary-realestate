import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Col, Form, Input, InputNumber, Layout, message, Row, Select } from 'antd';
import styled from 'styles';
import { Property, useProperty } from 'context';
import { Container, CurrencyInput, Header } from 'components';
import { PropertyTypes } from 'shared';

const StyledInputNumber = styled(InputNumber)`
  width: 100%;
`;

export const CreateProperty: FC = () => {
  const history = useHistory();
  const { createProperty } = useProperty();

  const initialValues = { bedrooms: 0, bathrooms: 0, garage: 0 };

  const submit = async (values: Property) => {
    try {
      const res = await createProperty(values);
      message.success(res);
      cancel();
    } catch (err) {
      message.error(err as string);
    }
  };

  const cancel = () => history.push('/properties');

  return (
    <Layout>
      <Header />
      <Container>
        <Form layout="vertical" requiredMark="optional" initialValues={initialValues} onFinish={submit}>
          <Row gutter={20}>
            <Col xs={24}>
              <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                <Input size="large" />
              </Form.Item>
            </Col>
            <Col xs={3}>
              <Form.Item name="floor" label="Floor">
                <Input size="large" />
              </Form.Item>
            </Col>
            <Col xs={3}>
              <Form.Item name="number" label="Number" rules={[{ required: true }]}>
                <Input size="large" />
              </Form.Item>
            </Col>
            <Col xs={10}>
              <Form.Item name="street" label="Street" rules={[{ required: true }]}>
                <Input size="large" />
              </Form.Item>
            </Col>
            <Col xs={4}>
              <Form.Item name="city" label="City" rules={[{ required: true }]}>
                <Input size="large" />
              </Form.Item>
            </Col>
            <Col xs={4}>
              <Form.Item name="postcode" label="Postcode" rules={[{ required: true }]}>
                <Input size="large" />
              </Form.Item>
            </Col>
            <Col xs={12}>
              <Form.Item name="price" label="Price" rules={[{ required: true }]}>
                <CurrencyInput size="large" placeholder="p/m" />
              </Form.Item>
            </Col>
            <Col xs={12}>
              <Form.Item name="type" label="Type" rules={[{ required: true }]}>
                <Select size="large">
                  {Object.entries(PropertyTypes).map(([id, value]) => (
                    <Select.Option key={id} value={id}>
                      {value}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={8}>
              <Form.Item name="bedrooms" label="Bedrooms" required>
                <StyledInputNumber size="large" min={0} />
              </Form.Item>
            </Col>
            <Col xs={8}>
              <Form.Item name="bathrooms" label="Bathrooms" required>
                <StyledInputNumber size="large" min={0} />
              </Form.Item>
            </Col>
            <Col xs={8}>
              <Form.Item name="garage" label="Garage" required>
                <StyledInputNumber size="large" min={0} />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item name="description" label="Description">
                <Input.TextArea size="large" rows={6} />
              </Form.Item>
            </Col>
            <Col xs={4}>
              <Form.Item>
                <Button block size="large" type="primary" htmlType="submit">
                  Publish
                </Button>
              </Form.Item>
            </Col>
            <Col xs={4} offset={16}>
              <Form.Item>
                <Button block size="large" onClick={cancel}>
                  Cancel
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Container>
    </Layout>
  );
};
