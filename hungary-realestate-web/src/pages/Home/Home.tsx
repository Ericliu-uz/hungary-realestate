import React, { FC } from 'react';
import styled from 'styles';
import bannerBg from 'assets/cover.jpeg';

const Banner = styled.div<{ bg: string }>`
  width: 100%;
  height: 60vh;
  background-image: url(${(props) => props.bg});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

export const Home: FC = () => {
  console.log('render home');
  return (
    <>
      <Banner bg={bannerBg} />
    </>
  );
};
