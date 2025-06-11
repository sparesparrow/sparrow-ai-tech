# -*- coding: utf-8 -*-

import requests
from bs4 import BeautifulSoup
import pandas as pd
import time
import random

# --- NASTAVENÍ SKRIPTU ---

# Zde zadejte klíčová slova, která chcete vyhledávat
KEYWORDS = [
    "Bauunternehmen",
    "Gebäudereinigung",
    "Montage",
    "Logistik",
    "Transportunternehmen",
    "Spedition",
    "Installateur",
    "Elektriker"
]

# Zde zadejte lokality. Vídeň bude prohledána jako první.
VIENNA_LOCATION = "Wien"
OTHER_LOCATIONS = [
    "Gänserndorf",
    "Mistelbach",
    "Hollabrunn",
    "Korneuburg",
    "Bruck an der Leitha",
    "Stockerau",
    "Tulln an der Donau"
]

# Název výstupního souboru
OUTPUT_FILE = "firmy_rakousko.csv"

# --- KONEC NASTAVENÍ ---


def scrape_wko(keywords, vienna_location, other_locations):
    """
    Hlavní funkce pro prohledávání webu firmen.wko.at a extrakci dat.
    """
    base_url = "https://firmen.wko.at/suche"
    all_results = []

    # *** OPRAVA 4: Použití Session a robustnější hlavičky ***
    session = requests.Session()
    session.headers.update({
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'Accept-Language': 'en-US,en;q=0.9,cs;q=0.8',
        'Referer': 'https://firmen.wko.at/',
        'Accept-Encoding': 'gzip, deflate, br'
    })

    print("Zahajuji prohledávání webu firmen.wko.at...")

    for keyword in keywords:
        print(f"\n--- Zpracovávám klíčové slovo: '{keyword}' ---")

        print(f"-> Prohledávám lokalitu '{vienna_location}'...")
        results_in_vienna = search_location(session, base_url, keyword, vienna_location, all_results)

        if results_in_vienna == 0:
            print(f"--> Pro klíčové slovo '{keyword}' nebyly ve Vídni nalezeny žádné výsledky. Přeskakuji ostatní lokality.")
            continue

        print(f"-> Prohledávám ostatní lokality pro '{keyword}'...")
        for location in other_locations:
            search_location(session, base_url, keyword, location, all_results)

    print(f"\nProhledávání dokončeno. Celkem nalezeno {len(all_results)} kontaktů.")
    return all_results

def search_location(session, base_url, keyword, location, all_results):
    """
    Pomocná funkce pro prohledání jedné kombinace klíčového slova a lokality.
    Zpracovává stránkování a vrací celkový počet nalezených výsledků pro danou kombinaci.
    """
    page = 1
    total_found_for_location = 0
    while True:
        print(f"Hledám: '{keyword}' v lokalitě '{location}', stránka {page}...")

        params = {
            'search-term': keyword,
            'location': location,
            'source': 'firmenabisz',
            'branch-id': '0',
            'page': page
        }

        try:
            response = session.get(base_url, params=params, timeout=15)
            response.raise_for_status()
            soup = BeautifulSoup(response.text, 'html.parser')
            results = soup.find_all('div', class_='card--company')

            if not results:
                if page == 1:
                    print(f"  -> Pro tuto kombinaci nebyly nalezeny žádné výsledky.")
                else:
                    print(f"  -> Konec výsledků pro tuto kombinaci.")
                break # Ukončí smyčku while, pokud na stránce nejsou výsledky

            print(f"  -> Nalezeno {len(results)} firem. Zpracovávám...")
            total_found_for_location += len(results)

            for item in results:
                company_name_tag = item.find('h3', class_='card-title')
                company_name = company_name_tag.get_text(strip=True) if company_name_tag else 'N/A'

                address_tag = item.find('div', class_='address')
                address = address_tag.get_text(strip=True, separator=', ') if address_tag else 'N/A'

                phone_tag = item.find('a', href=lambda href: href and href.startswith('tel:'))
                phone = phone_tag.get_text(strip=True) if phone_tag else 'N/A'

                links_container = item.find('div', class_='card-links')
                website = 'N/A'
                if links_container:
                    website_tag = links_container.find('a', title=lambda t: t and 'Website' in t)
                    if website_tag and website_tag.has_attr('href'):
                        website = website_tag['href']

                all_results.append({
                    "Název Společnosti": company_name,
                    "Telefonní číslo": phone,
                    "Adresa": address,
                    "Webová stránka": website,
                    "Hledané klíčové slovo": keyword,
                    "Lokalita": location
                })

            # Přejdeme na další stránku
            page += 1
            # Zdvořilostní pauza
            time.sleep(random.uniform(1.5, 3.5))

        except requests.exceptions.RequestException as e:
            print(f"  Chyba při stahování dat: {e}")
            break # V případě chyby ukončíme smyčku pro tuto lokalitu

    return total_found_for_location

if __name__ == "__main__":
    scraped_data = scrape_wko(KEYWORDS, VIENNA_LOCATION, OTHER_LOCATIONS)

    if scraped_data:
        df = pd.DataFrame(scraped_data)
        df.drop_duplicates(subset=['Název Společnosti', 'Adresa'], inplace=True, keep='first')

        df.to_csv(OUTPUT_FILE, index=False, encoding='utf-8-sig')

        print(f"\nData byla úspěšně uložena do souboru: {OUTPUT_FILE}")
        print(f"Počet unikátních firem: {len(df)}")
        print("\nNáhled prvních 5 nalezených firem:")
        print(df.head())
    else:
        print("Nebyly nalezeny žádné firmy, výstupní soubor nebyl vytvořen.")
