#!/usr/bin/env python3

import os
import shutil
from pathlib import Path
import logging
import argparse
from datetime import datetime

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

def create_category_folders(output_dir):
    """Create category folders in the output directory."""
    categories = [
        'AI & Machine Learning',
        'C++ Systems Programming',
        'Container & Infrastructure',
        'Full Stack & Developer Tools',
        'Specialized Projects',
        'General'
    ]
    
    for category in categories:
        category_dir = os.path.join(output_dir, category)
        os.makedirs(category_dir, exist_ok=True)
        logger.info(f"Created category folder: {category}")

def organize_pdfs(output_dir):
    """Organize PDFs into their respective category folders."""
    # Define category mappings
    category_mappings = {
        'AI & Machine Learning': [
            'cv_ai_mcp',
            'cv_ai_mcp_enhanced',
            'cv_ai_audiobook'
        ],
        'C++ Systems Programming': [
            'cv_cpp_systems',
            'cv_cpp_systems_enhanced',
            'cv_container_infrastructure'
        ],
        'Container & Infrastructure': [
            'cv_container_infrastructure',
            'cv_hybrid_advanced',
            'cv_developer_tools'
        ],
        'Full Stack & Developer Tools': [
            'cv_fullstack',
            'cv_developer_tools',
            'cv_security'
        ],
        'Specialized Projects': [
            'cv_trezor',
            'cv_ai_audiobook',
            'cv_open_source'
        ],
        'General': [
            'cv',
            'cv-enhancement-solution',
            'motivacni_dopis_trezor',
            'updated-cv',
            'cv_template',
            'repository_descriptions'
        ]
    }

    # Get all PDF files in the output directory
    pdf_files = [f for f in os.listdir(output_dir) if f.endswith('.pdf')]
    
    # Organize each PDF
    for pdf_file in pdf_files:
        moved = False
        
        # Try to match the PDF to a category
        for category, patterns in category_mappings.items():
            if any(pattern in pdf_file for pattern in patterns):
                category_dir = os.path.join(output_dir, category)
                source_path = os.path.join(output_dir, pdf_file)
                target_path = os.path.join(category_dir, pdf_file)
                
                # Move the file
                shutil.move(source_path, target_path)
                logger.info(f"Moved {pdf_file} to {category}")
                moved = True
                break
        
        # If file wasn't moved, it should be in the General category
        if not moved:
            category_dir = os.path.join(output_dir, 'General')
            source_path = os.path.join(output_dir, pdf_file)
            target_path = os.path.join(category_dir, pdf_file)
            
            # Move the file
            shutil.move(source_path, target_path)
            logger.info(f"Moved {pdf_file} to General")

def main():
    parser = argparse.ArgumentParser(
        description='Organize CV PDFs into category folders'
    )
    parser.add_argument(
        '--output',
        default='output',
        help='Output directory containing the PDFs'
    )
    args = parser.parse_args()

    # Create category folders
    create_category_folders(args.output)
    
    # Organize PDFs
    organize_pdfs(args.output)

if __name__ == "__main__":
    main()
