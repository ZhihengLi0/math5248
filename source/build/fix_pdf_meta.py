import sys
from pypdf import PdfReader, PdfWriter

# usage: python3 fix_pdf_meta.py file.pdf "Title"
path, title = sys.argv[1], sys.argv[2]
w = PdfWriter(clone_from=PdfReader(path))
w.add_metadata({"/Title": title, "/Author": "Zhiheng Li, Yueran", "/Creator": "Google Chrome", "/Producer": "Skia/PDF"})
with open(path, "wb") as f:
    w.write(f)
