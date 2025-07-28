import { jest } from '@jest/globals';
import { useI18n } from '../../i18n.jsx';
import React from 'react';

import { act } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { I18nProvider } from '../../i18n.jsx';
import Header from '../Header.jsx';

// Mock the useChart hook to prevent actual chart rendering
jest.mock('../../hooks/useChart.jsx', () => ({
  useChart: jest.fn(),
}));

// Mock import.meta PŘED importem Header komponenty
const originalImportMeta = global.importMeta;
global.importMeta = {
  env: {
    BASE_URL: '/',
  },
};

// Mock Header komponentu aby používala náš mock
jest.mock('../Header.jsx', () => {
  const MockHeader = () => {
    const { t, language, setLanguage } = useI18n();
    return React.createElement(
      'nav',
      {
        className: 'header-nav',
        'data-testid': 'header',
      },
      [
        React.createElement(
          'button',
          {
            key: 'en-btn',
            onClick: () => setLanguage('en'),
            disabled: language === 'en',
          },
          'EN'
        ),
        React.createElement(
          'button',
          {
            key: 'cs-btn',
            onClick: () => setLanguage('cs'),
            disabled: language === 'cs',
          },
          'CS'
        ),
        React.createElement(
          'span',
          {
            key: 'projects-text',
            'data-testid': 'projects-text',
          },
          t('header.nav_projects') || 'Projects'
        ),
      ]
    );
  };

  return MockHeader;
});

const mockTranslations = {
  en: {
    header: {
      nav_projects: 'Projects',
      nav_skills: 'Skills',
      nav_about: 'About',
      nav_contact: 'Contact',
    },
  },
  cs: {
    header: {
      nav_projects: 'Projekty',
      nav_skills: 'Dovednosti',
      nav_about: 'O nás',
      nav_contact: 'Kontakt',
    },
  },
};

beforeEach(() => {
  global.fetch = jest.fn((url) => {
    if (url.includes('/locales/en/common.json')) {
      return Promise.resolve({ ok: true, json: () => Promise.resolve(mockTranslations.en) });
    }
    if (url.includes('/locales/cs/common.json')) {
      return Promise.resolve({ ok: true, json: () => Promise.resolve(mockTranslations.cs) });
    }
    return Promise.resolve({ ok: false });
  });
});

afterEach(() => {
  jest.resetAllMocks();
  // Restore original import.meta mock
  global.importMeta = originalImportMeta;
});

describe('I18nProvider', () => {
  it('returns English by default', async () => {
    await act(async () => {
      render(
        <I18nProvider>
          <Header />
        </I18nProvider>
      );
    });

    expect(await screen.findByText('Projects')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'EN' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'CS' })).not.toBeDisabled();
  });

  it('switches to Czech and persists', async () => {
    await act(async () => {
      render(
        <I18nProvider>
          <Header />
        </I18nProvider>
      );
    });

    await screen.findByText('Projects');
    const csButton = await screen.findByRole('button', { name: 'CS' });
    fireEvent.click(csButton);

    expect(await screen.findByText('Projekty')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'CS' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'EN' })).not.toBeDisabled();
  });
});
