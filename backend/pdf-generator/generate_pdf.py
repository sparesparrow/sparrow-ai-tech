import markdown
from weasyprint import HTML, CSS
from pathlib import Path

def convert_to_pdf(markdown_file, css_file, output_pdf):
    # Read markdown content
    with open(markdown_file, 'r', encoding='utf-8') as f:
        markdown_content = f.read()
    
    # Convert markdown to HTML
    html_content = markdown.markdown(
        markdown_content,
        extensions=['extra', 'fenced_code', 'sane_lists', 'nl2br']
    )
    
    # Wrap HTML content with proper structure
    full_html = f'''
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Document</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>
        {html_content}
    </body>
    </html>
    '''
    
    # Create PDF with custom CSS
    HTML(string=full_html).write_pdf(
        output_pdf,
        stylesheets=[CSS(filename=css_file)]
    )

if __name__ == "__main__":
    # Convert CV
    convert_to_pdf(
        "cv.md",
        "styles.css",
        "cv.pdf"
    )
    
    # Convert Cover Letter
    convert_to_pdf(
        "cover_letter.md",
        "styles.css",
        "cover_letter.pdf"
    ) 
