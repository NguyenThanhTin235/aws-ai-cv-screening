import os
import re
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors

CVS_DIR = os.path.join(os.path.dirname(__file__), '..', 'samples', 'cvs')

def md_to_pdf(md_path, pdf_path):
    with open(md_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    doc = SimpleDocTemplate(pdf_path, pagesize=letter,
                            rightMargin=40, leftMargin=40,
                            topMargin=40, bottomMargin=40)
    styles = getSampleStyleSheet()
    
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontSize=16,
        leading=20,
        textColor=colors.HexColor('#1E293B'),
        spaceAfter=6
    )
    h2_style = ParagraphStyle(
        'DocH2',
        parent=styles['Heading2'],
        fontSize=12,
        leading=16,
        textColor=colors.HexColor('#2563EB'),
        spaceBefore=10,
        spaceAfter=4
    )
    body_style = ParagraphStyle(
        'DocBody',
        parent=styles['Normal'],
        fontSize=9,
        leading=13,
        textColor=colors.HexColor('#334155')
    )
    bullet_style = ParagraphStyle(
        'DocBullet',
        parent=styles['Normal'],
        fontSize=9,
        leading=13,
        leftIndent=15,
        textColor=colors.HexColor('#334155')
    )

    story = []
    for line in lines:
        stripped = line.strip()
        if not stripped:
            story.append(Spacer(1, 4))
            continue
        if stripped.startswith('# '):
            text = stripped[2:].replace('&', '&amp;')
            story.append(Paragraph(f"<b>{text}</b>", title_style))
        elif stripped.startswith('## '):
            text = stripped[3:].replace('&', '&amp;')
            story.append(Paragraph(f"<b>{text}</b>", h2_style))
        elif stripped.startswith('### '):
            text = stripped[4:].replace('&', '&amp;')
            story.append(Paragraph(f"<b>{text}</b>", body_style))
        elif stripped.startswith('- ') or stripped.startswith('* '):
            text = stripped[2:].replace('&', '&amp;')
            text = re.sub(r'\*\*(.*?)\*\*', r'<b>\1</b>', text)
            story.append(Paragraph(f"• {text}", bullet_style))
        elif stripped.startswith('---'):
            story.append(Spacer(1, 6))
        else:
            text = stripped.replace('&', '&amp;')
            text = re.sub(r'\*\*(.*?)\*\*', r'<b>\1</b>', text)
            story.append(Paragraph(text, body_style))

    doc.build(story)
    print(f"Generated PDF: {pdf_path}")

def main():
    cv_files = [f for f in os.listdir(CVS_DIR) if f.endswith('.md')]
    for cv in cv_files:
        base_name = os.path.splitext(cv)[0]
        md_path = os.path.join(CVS_DIR, cv)
        
        # Tạo PDF chuẩn hóa cho tất cả CV mẫu
        pdf_path = os.path.join(CVS_DIR, f"{base_name}.pdf")
        md_to_pdf(md_path, pdf_path)

if __name__ == '__main__':
    main()
