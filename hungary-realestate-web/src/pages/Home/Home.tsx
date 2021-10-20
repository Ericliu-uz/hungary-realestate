import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { Input, Layout } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styled from 'styles';
import bannerBg from 'assets/cover.jpeg';
import { Header } from 'components';

const { Search } = Input;

const Banner = styled.div<{ bg: string }>`
  width: 100%;
  height: 40vh;
  background-image: url(${(props) => props.bg});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const SearchBoxContainer = styled.div`
  width: 1000px;
  margin: 100px auto;
  padding: ${({ theme }) => theme.size.spacing.xl}px;
  background-color: rgba(0, 0, 0, 0.6);
`;

const Title = styled.h1`
  margin-left: 0;
  margin-bottom: ${({ theme }) => theme.size.spacing.sm}px;
  color: ${({ theme }) => theme.palette.paper[0]};
  font-weight: 400;
`;

export const Home: FC = () => {
  const history = useHistory();

  const onSearch = (value: string) => {
    console.log(value);
    history.push('/properties');
  };

  return (
    <Layout>
      <Banner bg={bannerBg}>
        <Header transparent />
        <SearchBoxContainer>
          <Title>Search rental properties</Title>
          <Search
            placeholder="Search by address"
            allowClear
            enterButton="Search"
            size="large"
            prefix={<SearchOutlined />}
            onSearch={onSearch}
          />
        </SearchBoxContainer>
      </Banner>
    </Layout>
  );
};
