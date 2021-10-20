import React from 'react';

export const useCurrency = ({ currencyCode = 'AUD', precision = 2 }) => {
  const userLanguage = navigator.language || 'en';

  const formatter = () =>
    new Intl.NumberFormat(userLanguage, {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 0,
      maximumFractionDigits: precision,
    });

  const formatted = (value: number) => formatter().format(value).replace(/[A-Z]/g, '');

  return { formatted, formatter };
};

export const Currency = ({ currencyCode = 'AUD', value = 0, precision = 2 }) => {
  const { formatted } = useCurrency({ currencyCode, precision });
  return <span>{formatted(Number.isNaN(value) ? 0 : value)}</span>;
};
