import React, { FC } from 'react';
import { Col, Layout, Row } from 'antd';
import { useProperty } from 'context';
import { Container, Header, PropertyCard } from 'components';

export const Properties: FC = () => {
  const { properties } = useProperty();
  return (
    <Layout>
      <Header />
      <Container>
        <Row gutter={[40, 40]}>
          {properties.map((property) => (
            <Col key={property.id} xs={12}>
              <PropertyCard property={property} />
            </Col>
          ))}
        </Row>
      </Container>
    </Layout>
  );
};
