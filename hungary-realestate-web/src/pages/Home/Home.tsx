import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { Col, Input, Layout, Row } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import queryString from 'qs';
import styled from 'styles';
import { useProperty } from 'context';
import { Container, Header, PropertyCard } from 'components';
import bannerBg from 'assets/cover.jpeg';

const Banner = styled.div<{ bg: string }>`
  width: 100%;
  background-image: url(${(props) => props.bg});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const SearchBoxContainer = styled.div`
  margin: 50px 0;
  padding: ${({ theme }) => theme.size.spacing.xl}px;
  background-color: rgba(0, 0, 0, 0.6);
`;

const Title = styled.h1`
  margin-bottom: ${({ theme }) => theme.size.spacing.sm}px;
  color: ${({ theme }) => theme.palette.paper[0]};
  font-weight: 400;
`;

const Heading = styled.h1`
  margin-bottom: ${({ theme }) => theme.size.spacing.lg}px;
  font-size: 28px;
  font-weight: 700;
  text-align: center;
`;

export const Home: FC = () => {
  const history = useHistory();
  const { properties } = useProperty();

  const onSearch = (value: string) => {
    history.push(`/properties?${queryString.stringify({ search: value })}`);
  };

  return (
    <Layout>
      <Banner bg={bannerBg}>
        <Header transparent />
        <Container>
          <SearchBoxContainer>
            <Title>Search rental properties</Title>
            <Input.Search
              placeholder="Search by address"
              allowClear
              enterButton="Search"
              size="large"
              prefix={<SearchOutlined />}
              onSearch={onSearch}
            />
          </SearchBoxContainer>
        </Container>
      </Banner>
      <Container>
        <Heading>Featured Properties</Heading>
        <Row gutter={[40, 40]}>
          {properties.slice(0, 4).map((property) => (
            <Col key={property.id} xs={12}>
              <PropertyCard property={property} />
            </Col>
          ))}
        </Row>
      </Container>
    </Layout>
  );
};
