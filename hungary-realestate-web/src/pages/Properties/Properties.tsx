import React, { FC, useEffect } from 'react';
import { Col, Layout, Row } from 'antd';
import axios from 'axios';
import styled from 'styles';
import { Header, Property, PropertyCard } from 'components';

const data: Property[] = [
  {
    id: 0,
    title: 'Debrecen, Main Campus Area, flat',
    address: 'Main Campus Area',
    bedrooms: 2,
    bathrooms: 1,
    garage: 1,
    price: 250000,
    type: 'flat',
    images: ['https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp'],
  },
  {
    id: 1,
    title: 'Debrecen, Main Campus Area, flat',
    address: 'Main Campus Area',
    bedrooms: 2,
    bathrooms: 1,
    garage: 1,
    price: 250000,
    type: 'flat',
  },
  {
    id: 2,
    title: 'Debrecen, Main Campus Area, flat',
    address: 'Main Campus Area',
    bedrooms: 2,
    bathrooms: 1,
    garage: 1,
    price: 250000,
    type: 'flat',
  },
  {
    id: 3,
    title: 'Debrecen, Main Campus Area, flat',
    address: 'Main Campus Area',
    bedrooms: 2,
    bathrooms: 1,
    garage: 1,
    price: 250000,
    type: 'flat',
  },
];

const PropertiesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 50px;
`;

export const Properties: FC = () => {
  useEffect(() => {
    // fetch properties
    const fetchProperties = async () => {
      const res = await axios.get('url');
      console.log(res);
    };
    fetchProperties();
  }, []);

  return (
    <Layout>
      <Header />
      <PropertiesContainer>
        <Row gutter={[40, 40]}>
          {data.map((property) => (
            <Col key={property.id} xs={12}>
              <PropertyCard property={property} />
            </Col>
          ))}
        </Row>
      </PropertiesContainer>
    </Layout>
  );
};
