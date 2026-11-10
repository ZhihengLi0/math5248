#!/bin/zsh
# PDF exports. Decks: LibreOffice (brew install --cask libreoffice).
# Worksheet and speech script: headless Chrome (bilingual 演讲稿.pdf, English-only 演讲稿_英文.pdf).
set -e
HERE=$(cd "$(dirname "$0")" && pwd)
P="$HERE/../../presentation"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
print_pdf() { "$CHROME" --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf="$P/$1.pdf" "file://$P/$1.html" >/dev/null 2>&1; }
cd "$P"
soffice --headless --convert-to pdf PPT演讲版.pptx PPT完整版.pptx 2>&1 | grep -v Fontconfig || true
mv -f PPT演讲版.pdf PDF演讲版.pdf && mv -f PPT完整版.pdf PDF完整版.pdf
node "$HERE/build_worksheet.js" && print_pdf Worksheet提交版
python3 "$HERE/build_speech_pdf.py" 演讲稿.md 演讲稿.html
python3 "$HERE/build_speech_pdf.py" 演讲稿.md 演讲稿_英文.html --en
print_pdf 演讲稿 && print_pdf 演讲稿_英文
rm -f 演讲稿.html 演讲稿_英文.html Worksheet提交版.html
python3 "$HERE/fix_pdf_meta.py" Worksheet提交版.pdf "Divisibility worksheet"
python3 "$HERE/fix_pdf_meta.py" 演讲稿.pdf "演讲稿"
python3 "$HERE/fix_pdf_meta.py" 演讲稿_英文.pdf "Speaker script"
ls -la "$P"/*.pdf
