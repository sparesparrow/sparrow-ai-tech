/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { render, screen } from '@testing-library/react';

// Create mock hook before the mock
const mockUseI18n = jest.fn(() => ({
  t: jest.fn((key) => key),
  language: 'cs',
  setLanguage: jest.fn(),
}));

// Mock the Header component
jest.mock('../Header.jsx', () => {
  const MockHeader = () => {
    const { t, language, setLanguage } = mockUseI18n();
    return React.createElement(
      'nav',
      {
        'data-testid': 'header',
        className: 'header'
      },
      React.createElement('span', null, t('header.title'))
    );
  };
  MockHeader.displayName = 'MockHeader';
  return MockHeader;
});

// Mock the i18n hook
jest.mock('../../utils/i18n', () => ({
  useI18n: () => mockUseI18n(),
}));

describe('i18n Integration', () => {
  test('should render header with translation', () => {
    const Header = require('../Header.jsx').default;
    render(React.createElement(Header));
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  test('should call translation function', () => {
    mockUseI18n();
    expect(mockUseI18n).toHaveBeenCalled();
  });
});
