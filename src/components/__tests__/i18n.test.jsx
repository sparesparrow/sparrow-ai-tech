import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { I18nProvider, useI18n } from '../i18n';

const TestComponent = () => {
  const { t, language, setLanguage } = useI18n();
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
  beforeEach(() => {
    localStorage.clear();
  });
  it('returns English by default', () => {
    render(
      <I18nProvider>
        <TestComponent />
      </I18nProvider>
    );
    expect(screen.getByTestId('lang').textContent).toBe('en');
    expect(screen.getByTestId('home').textContent).toBe('Home');
  });
  it('switches to Czech and persists', () => {
    render(
      <I18nProvider>
        <TestComponent />
      </I18nProvider>
    );
    fireEvent.click(screen.getByText('CZ'));
    expect(screen.getByTestId('lang').textContent).toBe('cs');
    expect(screen.getByTestId('home').textContent).toBe('Domů');
    // Simulate reload
    render(
      <I18nProvider>
        <TestComponent />
      </I18nProvider>
    );
    expect(screen.getByTestId('lang').textContent).toBe('cs');
  });
}); 