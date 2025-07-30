#!/usr/bin/env python3
import markdown
from weasyprint import HTML, CSS
import os
import yaml
from pathlib import Path
import logging
import argparse
from datetime import datetime
import tempfile
import shutil


class CVGenerator:
    def __init__(self, css_file, output_dir='output'):
        self.css_file = os.path.join(os.getcwd(), css_file)
        self.output_dir = output_dir
        self.logger = logging.getLogger(__name__)
        self.setup_logging()
        self.ensure_output_dir()

    def setup_logging(self):
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
        )

    def ensure_output_dir(self):
        os.makedirs(self.output_dir, exist_ok=True)

    def read_markdown_file(self, file_path):
        """Read and parse markdown file with frontmatter."""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()

            # Split frontmatter and content
            if '---' in content:
                parts = content.split('---', 2)
                if len(parts) == 3:
                    frontmatter = yaml.safe_load(parts[1])
                    content = parts[2].strip()
                else:
                    frontmatter = {}
            else:
                frontmatter = {}

            return frontmatter, content
        except Exception as e:
            self.logger.error(f"Error reading {file_path}: {str(e)}")
            raise

    def generate_html(self, markdown_content, style_type='base'):
        """Convert markdown to HTML with appropriate styling."""
        try:
            # Convert markdown to HTML
            html = markdown.markdown(
                markdown_content,
                extensions=['markdown.extensions.tables', 'markdown.extensions.fenced_code']
            )

            # Add basic HTML structure
            html_content = f"""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CV - {style_type.capitalize()}</title>
    <link rel="stylesheet" href="{self.css_file}">
    <style>
        /* Custom styles for {style_type} */
        body {{
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
        }}

        h1, h2, h3, h4, h5, h6 {{
            color: #2c3e50;
            margin-top: 1.5em;
            margin-bottom: 0.5em;
        }}

        h1 {{ font-size: 2.5em; }}
        h2 {{ font-size: 2em; }}
        h3 {{ font-size: 1.75em; }}
        h4 {{ font-size: 1.5em; }}
        h5 {{ font-size: 1.25em; }}
        h6 {{ font-size: 1em; }}

        p {{
            margin: 1em 0;
            font-size: 1em;
        }}

        ul, ol {{
            margin: 1em 0;
            padding-left: 1.5em;
        }}

        li {{
            margin: 0.5em 0;
        }}

        table {{
            width: 100%;
            border-collapse: collapse;
            margin: 1em 0;
        }}

        th, td {{
            padding: 0.5em;
            border: 1px solid #ddd;
            text-align: left;
        }}

        th {{
            background-color: #f5f5f5;
        }}

        code {{
            background-color: #f8f9fa;
            padding: 0.2em 0.4em;
            border-radius: 3px;
            font-family: 'Fira Code', monospace;
        }}

        pre {{
            background-color: #f8f9fa;
            padding: 1em;
            border-radius: 5px;
            overflow-x: auto;
        }}

        .project-details {{
            margin-left: 1em;
            padding-left: 1em;
            border-left: 3px solid #2c3e50;
        }}

        .tech-stack {{
            display: flex;
            flex-wrap: wrap;
            gap: 0.5em;
            margin-top: 0.5em;
        }}

        .tech-tag {{
            background-color: #f8f9fa;
            padding: 0.2em 0.5em;
            border-radius: 3px;
            font-size: 0.9em;
        }}

        /* Style-specific adjustments */
        {self.get_style_specific_css(style_type)}
    </style>
</head>
<body>
    {html}
</body>
</html>
"""
            return html_content
        except Exception as e:
            self.logger.error(f"Error generating HTML: {str(e)}")
            raise

    def get_style_specific_css(self, style_type):
        """Get CSS specific to the chosen style."""
        style_css = {
            'base': """
                /* Base style - clean and professional */
                body { background-color: #ffffff; }
                h1, h2, h3, h4, h5, h6 { color: #2c3e50; }
                a { color: #3498db; text-decoration: none; }
                a:hover { color: #2980b9; text-decoration: underline; }
            """,
            'modern': """
                /* Modern style - clean lines and subtle shadows */
                body { background-color: #f8f9fa; }
                .section { padding: 1.5em 0; border-bottom: 1px solid #e9ecef; }
                .section:last-child { border-bottom: none; }
                h1, h2, h3, h4, h5, h6 { 
                    color: #2c3e50; 
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }
                .project-details { 
                    background-color: #ffffff;
                    padding: 1em;
                    border-radius: 5px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
            """,
            'tech': """
                /* Tech-focused style - monospace elements and tech colors */
                body { background-color: #1a1a1a; color: #ffffff; }
                code, pre { background-color: #2d2d2d; color: #ffffff; }
                .tech-tag { background-color: #2d2d2d; color: #ffffff; }
                .tech-stack { background-color: #2d2d2d; padding: 1em; border-radius: 5px; }
                h1, h2, h3, h4, h5, h6 { color: #61afef; }
            """,
            'minimal': """
                /* Minimalist style - clean and unobtrusive */
                body { background-color: #ffffff; }
                h1, h2, h3, h4, h5, h6 { color: #333333; }
                .project-details { margin-left: 0; padding-left: 0; border-left: none; }
                .tech-stack { margin-top: 0; }
            """,
            'professional': """
                /* Professional style - formal and business-oriented */
                body { background-color: #ffffff; }
                h1, h2, h3, h4, h5, h6 { color: #2c3e50; }
                .project-details { 
                    background-color: #f8f9fa;
                    padding: 1em;
                    border-radius: 5px;
                    margin: 1em 0;
                }
                .tech-stack { background-color: #f8f9fa; padding: 0.5em; }
            """
        }
        return style_css.get(style_type, style_css['base'])

    def convert_to_pdf(self, markdown_file, output_pdf, style_type='base'):
        """Convert a single markdown file to PDF."""
        try:
            self.logger.info(f"Processing {markdown_file}")
            frontmatter, content = self.read_markdown_file(markdown_file)

            # Use style from frontmatter if specified
            if 'style' in frontmatter:
                style_type = frontmatter['style']

            # Generate HTML
            html_content = self.generate_html(content, style_type)

            # Create temporary directory for HTML file
            with tempfile.TemporaryDirectory() as temp_dir:
                temp_html = os.path.join(temp_dir, 'temp.html')

                # Write HTML to temporary file
                with open(temp_html, 'w', encoding='utf-8') as f:
                    f.write(html_content)

                # Convert to PDF using WeasyPrint
                HTML(filename=temp_html).write_pdf(
                    output_pdf,
                    stylesheets=[CSS(filename=self.css_file)],
                    presentational_hints=True
                )

            self.logger.info(f"Successfully generated {output_pdf}")
            return True
        except Exception as e:
            self.logger.error(f"Error converting {markdown_file} to PDF: {str(e)}")
            return False

    def process_all_markdown_files(self, style_type='base'):
        """Process all markdown files in the current directory."""
        success_count = 0
        total_files = 0
        
        for file in os.listdir('.'):
            if file.endswith('.md') and not file.startswith('README'):
                total_files += 1
                try:
                    output_pdf = os.path.join(
                        self.output_dir,
                        f"{os.path.splitext(file)[0]}_{style_type}.pdf"
                    )
                    if self.convert_to_pdf(file, output_pdf, style_type):
                        success_count += 1
                except Exception as e:
                    self.logger.error(f"Error processing {file}: {str(e)}")
        
        return success_count, total_files


def main():
    parser = argparse.ArgumentParser(
        description='Convert markdown CVs to PDFs with different styles.'
    )
    parser.add_argument(
        '--style',
        choices=['base', 'modern', 'tech', 'minimal', 'professional'],
        default='base',
        help='Style for the generated PDFs'
    )
    parser.add_argument(
        '--css',
        default='base.css',
        help='Path to the CSS file'
    )
    parser.add_argument(
        '--output',
        default='output',
        help='Output directory for PDFs'
    )
    args = parser.parse_args()

    generator = CVGenerator(args.css, args.output)

    print(f"\nGenerating PDFs with style: {args.style}")
    print("-" * 50)

    success_count, total_files = generator.process_all_markdown_files(args.style)

    print("\nSummary:")
    print(f"Processed {total_files} files")
    print(f"Successfully generated {success_count} PDFs")
    print(f"Failed: {total_files - success_count} files")
    print("\nPDFs are located in the 'output' directory.")


if __name__ == "__main__":
    main()
