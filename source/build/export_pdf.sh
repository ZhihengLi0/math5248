#!/bin/zsh
# Export the decks and the script to PDF.
# Decks: LibreOffice headless (brew install --cask libreoffice). Script: headless Chrome (system CJK fonts), LibreOffice as fallback.
set -e
cd "$(dirname "$0")/../../presentation"
soffice --headless --convert-to pdf presentation.pptx full.pptx 2>&1 | grep -v Fontconfig || true
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
if [ -x "$CHROME" ]; then
  "$CHROME" --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf="$PWD/presentation_script.pdf" "file://$PWD/presentation_script.html" >/dev/null 2>&1
else
  soffice --headless --convert-to pdf:writer_web_pdf_Export presentation_script.html
fi
rm -f presentation_script.html
ls -la *.pdf
