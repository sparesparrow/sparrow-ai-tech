import markdown
from weasyprint import HTML, CSS
from pathlib import Path
import argparse
import json
import os
import re
from datetime import datetime
import yaml


def parse_frontmatter(content):
    """Extract YAML frontmatter from markdown content if present."""
    frontmatter = {}
    match = re.match(r'^---\s+(.*?)\s+---\s+(.*)', content, re.DOTALL)
    
    if match:
        try:
            frontmatter = yaml.safe_load(match.group(1))
            content = match.group(2)
        except yaml.YAMLError:
            # If YAML parsing fails, assume no valid frontmatter
            pass
            
    return frontmatter, content


def convert_to_pdf(markdown_file, css_file, output_pdf, theme=None, pdf_options=None):
    """
    Convert markdown to PDF with enhanced options
    
    Args:
        markdown_file: Path to markdown file
        css_file: Path to base CSS file
        output_pdf: Path where PDF will be saved
        theme: Optional theme name (applies additional CSS)
        pdf_options: Dictionary of PDF options
    """
    # Default options
    options = {
        "title": Path(markdown_file).stem.capitalize(),
        "author": "",
        "keywords": "",
        "compress": True,
        "optimize_images": True,
        "attachments": False
    }
    
    # Update with provided options
    if pdf_options:
        options.update(pdf_options)
    
    # Read markdown content
    with open(markdown_file, 'r', encoding='utf-8') as f:
        raw_content = f.read()
    
    # Process frontmatter if present
    frontmatter, markdown_content = parse_frontmatter(raw_content)
    
    # Update options with frontmatter data if available
    if frontmatter:
        for key in ['title', 'author', 'keywords']:
            if key in frontmatter:
                options[key] = frontmatter[key]
    
    # Convert markdown to HTML
    html_content = markdown.markdown(
        markdown_content,
        extensions=[
            'extra',             # Tables, footnotes, etc.
            'fenced_code',       # Code blocks
            'sane_lists',        # Better list handling
            'nl2br',             # Line breaks
            'smarty',            # Smart quotes
            'meta',              # Metadata
            'attr_list'          # Add classes and attributes to elements
        ]
    )
    
    # Load base CSS
    stylesheets = [CSS(filename=css_file)]
    
    # Add theme-specific CSS if provided
    if theme:
        theme_css = Path(css_file).parent / f"themes/{theme}.css"
        if theme_css.exists():
            stylesheets.append(CSS(filename=str(theme_css)))
    
    # Wrap HTML content with proper structure
    full_html = f'''
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>{options['title']}</title>
        <meta name="author" content="{options['author']}">
        <meta name="keywords" content="{options['keywords']}">
        <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>
        {html_content}
        <footer>
            <p class="generated-date">Generated on {datetime.now().strftime('%Y-%m-%d')}</p>
        </footer>
    </body>
    </html>
    '''
    
    # Prepare PDF output path
    output_path = Path(output_pdf)
    os.makedirs(output_path.parent, exist_ok=True)
    
    # Create PDF with custom options
    HTML(string=full_html).write_pdf(
        output_pdf,
        stylesheets=stylesheets,
        attachments=options['attachments'],
        optimize_images=options['optimize_images'],
        optimize_size=('normal' if options['compress'] else None)
    )
    
    print(f"PDF generated: {output_pdf}")


def main():
    parser = argparse.ArgumentParser(description='Convert markdown files to PDF')
    parser.add_argument('--input', '-i', help='Input markdown file (default: cv.md)', default='cv.md')
    parser.add_argument('--css', '-c', help='CSS file (default: styles.css)', default='styles.css')
    parser.add_argument('--output', '-o', help='Output PDF file (default: derived from input filename)')
    parser.add_argument('--theme', '-t', help='Apply a theme (e.g., modern, minimal, professional)')
    parser.add_argument('--config', help='JSON configuration file with additional options')
    parser.add_argument('--multi', action='store_true', help='Generate multiple themed versions')
    args = parser.parse_args()
    
    input_file = args.input
    css_file = args.css
    
    # Load configuration if provided
    pdf_options = None
    if args.config and os.path.exists(args.config):
        with open(args.config, 'r') as f:
            pdf_options = json.load(f)
    
    # Handle output filename
    if args.output:
        output_pdf = args.output
    else:
        # Default output is input filename with .pdf extension
        output_pdf = Path(input_file).with_suffix('.pdf')
    
    # Generate multiple themed versions if requested
    if args.multi:
        themes_dir = Path(css_file).parent / "themes"
        if themes_dir.exists():
            for theme_file in themes_dir.glob('*.css'):
                theme = theme_file.stem
                themed_output = Path(output_pdf).with_stem(f"{Path(output_pdf).stem}_{theme}")
                convert_to_pdf(input_file, css_file, themed_output, theme, pdf_options)
                print(f"Generated themed PDF: {themed_output}")
        else:
            print(f"Themes directory not found: {themes_dir}")
            # Fall back to standard version
            convert_to_pdf(input_file, css_file, output_pdf, args.theme, pdf_options)
    else:
        # Generate single PDF
        convert_to_pdf(input_file, css_file, output_pdf, args.theme, pdf_options)


if __name__ == "__main__":
    # Process CV
    main()
