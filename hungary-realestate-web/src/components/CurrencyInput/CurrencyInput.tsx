import React, { FC } from 'react';
import { InputNumber, InputNumberProps } from 'antd';
import styled from 'styles';

const StyledCurrencyInput = styled(InputNumber)`
  width: 100%;

  .ant-input-number-handler-wrap {
    display: none;
  }
`;

export const CurrencyInput: FC<InputNumberProps> = (props) => (
  <StyledCurrencyInput
    formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
    parser={(value) => `$ ${value}`.replace(/\$\s?|(,*)/g, '')}
    min={0}
    {...props}
  />
);
