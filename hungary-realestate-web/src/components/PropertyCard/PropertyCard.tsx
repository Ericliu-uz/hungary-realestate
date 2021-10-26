import React, { ElementType, FC, useState } from 'react';
import { Image, Space } from 'antd';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import { Icon } from '@material-ui/core';
import { BathtubOutlined, DriveEtaOutlined, HotelOutlined } from '@material-ui/icons';
import { first } from 'lodash';
import styled from 'styles';
import { Property } from 'context';
import { Currency } from 'components';
import { PropertyTypes } from 'shared';
import PropertyDefaultImage from 'assets/property-default-image.jpeg';

const Container = styled.div`
  background-color: ${({ theme }) => theme.palette.paper[0]};
  box-shadow: rgb(0 0 0 / 20%) 0px 1px 3px 0px;
`;

const Content = styled.div`
  padding: ${({ theme }) => theme.size.spacing.lg}px;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h1`
  margin-bottom: 0;
  font-weight: 700;
`;

const StarIconOutlined = styled(StarOutlined)`
  font-size: 20px;
`;

const StarIconFilled = styled(StarFilled)`
  font-size: 20px;
  color: ${({ theme }) => theme.palette.branding.primary.normal};
`;

const Address = styled.div`
  margin-bottom: ${({ theme }) => theme.size.spacing.sm}px;
  color: ${({ theme }) => theme.palette.greys[75]};
`;

const Facilities = styled.div`
  color: ${({ theme }) => theme.palette.greys[50]};
`;

const StyledIcon = styled(Icon)`
  vertical-align: middle;
` as typeof Icon;

const FacilityItemWithIcon: FC<{ icon: ElementType }> = ({ children, icon }) => (
  <Space size={4} align="center">
    <StyledIcon component={icon} fontSize="small" />
    {children}
  </Space>
);

const StarIcon: FC<{ starred?: boolean; onClick: VoidFunction }> = ({ starred, onClick }) =>
  starred ? <StarIconFilled onClick={onClick} /> : <StarIconOutlined onClick={onClick} />;

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard: FC<PropertyCardProps> = ({ property }) => {
  const [starred, setStarred] = useState(false);
  return (
    <Container>
      <Image src={first(property.images) || PropertyDefaultImage} preview={false} width="100%" />
      <Content>
        <TitleRow>
          <Title>
            <Currency value={property.price} />
          </Title>
          <StarIcon starred={starred} onClick={() => setStarred(!starred)} />
        </TitleRow>
        <Address>{property.address || property.title}</Address>
        <Facilities>
          <Space size={10} align="center">
            <FacilityItemWithIcon icon={HotelOutlined}>{property.bedrooms}</FacilityItemWithIcon>
            <FacilityItemWithIcon icon={BathtubOutlined}>{property.bathrooms}</FacilityItemWithIcon>
            <FacilityItemWithIcon icon={DriveEtaOutlined}>{property.garage}</FacilityItemWithIcon>|{PropertyTypes[property.type]}
          </Space>
        </Facilities>
      </Content>
    </Container>
  );
};
