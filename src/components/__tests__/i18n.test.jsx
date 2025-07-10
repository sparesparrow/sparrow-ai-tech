import { jest } from '@jest/globals';
import { act } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { I18nProvider } from '../../i18n.jsx';

// ESM-compatible mocking for loadTranslations only
jest.unstable_mockModule('../../i18n.jsx', () => ({
  ...jest.requireActual('../../i18n.jsx'),
  loadTranslations: async (lang) => lang === 'cs' ? { nav: { home: 'Domů' } } : { nav: { home: 'Home' } },
}));

const TestComponent = () => {
  const { t, language, setLanguage } = require('../../i18n.jsx').useI18n();
  return (
    <div>
      <span data-testid="lang">{language}</span>
      <span data-testid="home">{t('nav.home')}</span>
      <button onClick={() => setLanguage('cs')}>CZ</button>
      <button onClick={() => setLanguage('en')}>EN</button>
    </div>
  );
};

describe('I18nProvider', () => {
  it('returns English by default', async () => {
    await act(async () => {
      render(
        <I18nProvider>
          <TestComponent />
        </I18nProvider>
      );
    });
    expect(screen.getByTestId('lang').textContent).toBe('en');
    expect(await screen.findByText('Home')).toBeInTheDocument();
  });

  it('switches to Czech and persists', async () => {
    await act(async () => {
      render(
        <I18nProvider>
          <TestComponent />
        </I18nProvider>
      );
      fireEvent.click(screen.getByText('CZ'));
    });
    expect(screen.getByTestId('lang').textContent).toBe('cs');
    expect(await screen.findByText('Domů')).toBeInTheDocument();
  });
}); 