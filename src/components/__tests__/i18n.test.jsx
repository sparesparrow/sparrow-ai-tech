import { jest } from '@jest/globals';
import { act } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { I18nProvider, useI18n } from '../../i18n.jsx';
import React, { useState } from 'react';
import Header from '../Header.jsx';

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
});

// Remove TestI18nProvider and use the real I18nProvider with fetch mocking

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
  it('returns English by default', async () => {
    await act(async () => {
      render(
        <I18nProvider>
          <Header />
        </I18nProvider>
      );
    });
    // Wait for the translation to load
    expect(await screen.findByText('Projects')).toBeInTheDocument();
    // The EN button should be disabled, CS enabled
    expect(screen.getByRole('button', { name: 'EN' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'CS' })).not.toBeDisabled();
  });

  it('switches to Czech and persists', async () => {
    // Step 1: Render and wait for English
    await act(async () => {
      render(
        <I18nProvider>
          <Header />
        </I18nProvider>
      );
    });
    // Debug: Output the DOM after initial render

    console.log('DOM after render:', screen.debug ? screen.debug() : 'no debug');
    await screen.findByText('Projects');

    // Step 2: Click CS
    const csButton = await screen.findByRole('button', { name: 'CS' });
    fireEvent.click(csButton);

    // Debug: Output the DOM after clicking CS

    console.log('DOM after CS click:', screen.debug ? screen.debug() : 'no debug');

    // Step 3: Wait for Czech translation
    expect(await screen.findByText('Projekty')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'CS' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'EN' })).not.toBeDisabled();
  });
});
