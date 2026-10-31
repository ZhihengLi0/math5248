#!/bin/zsh
# PDF exports: the two decks with LibreOffice (brew install --cask libreoffice), the speech script
# with headless Chrome (bilingual speech_script.pdf and English-only speech_script_en.pdf).
set -e
HERE=$(cd "$(dirname "$0")" && pwd)
P="$HERE/../../presentation"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
cd "$P"
soffice --headless --convert-to pdf presentation.pptx full.pptx 2>&1 | grep -v Fontconfig || true
python3 "$HERE/build_speech_pdf.py" speech_script.md speech_script.html
python3 "$HERE/build_speech_pdf.py" speech_script.md speech_script_en.html --en
for n in speech_script speech_script_en; do
  "$CHROME" --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf="$P/$n.pdf" "file://$P/$n.html" >/dev/null 2>&1
done
rm -f speech_script.html speech_script_en.html
ls -la "$P"/*.pdf
