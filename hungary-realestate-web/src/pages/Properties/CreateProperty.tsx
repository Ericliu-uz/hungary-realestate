import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Col, Form, Input, InputNumber, Layout, Row, Select } from 'antd';
import styled from 'styles';
import { Property, useProperty } from 'context';
import { Container, CurrencyInput, Header } from 'components';

const PROPERTY_TYPES = Object.freeze([
  { id: 'house', value: 'House' },
  { id: 'townhouse', value: 'Townhouse' },
  { id: 'flat', value: 'Flat' },
]);

const StyledInputNumber = styled(InputNumber)`
  width: 100%;
`;

export const CreateProperty: FC = () => {
  const history = useHistory();
  const { add } = useProperty();

  const initialValues = { bedrooms: 0, bathrooms: 0, garage: 0 };

  const submit = (values: Property) => {
    add(values);
    cancel();
  };

  const cancel = () => history.goBack();

  return (
    <Layout>
      <Header />
      <Container>
        <Form layout="vertical" requiredMark="optional" initialValues={initialValues} onFinish={submit}>
          <Row gutter={20}>
            <Col xs={24}>
              <Form.Item name="title" label="Title" required rules={[{ required: true }]}>
                <Input size="large" />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item name="address" label="Address" required rules={[{ required: true }]}>
                <Input size="large" />
              </Form.Item>
            </Col>
            <Col xs={12}>
              <Form.Item name="price" label="Price (p/m)" required rules={[{ required: true }]}>
                <CurrencyInput size="large" />
              </Form.Item>
            </Col>
            <Col xs={12}>
              <Form.Item name="type" label="Type" required rules={[{ required: true }]}>
                <Select size="large">
                  {PROPERTY_TYPES.map((type) => (
                    <Select.Option value={type.id}>{type.value}</Select.Option>
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
