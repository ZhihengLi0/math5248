#!/bin/zsh
# PDF exports: the two decks with LibreOffice (brew install --cask libreoffice), the speech script
# with headless Chrome (bilingual 演讲稿.pdf and English-only 演讲稿_英文.pdf).
set -e
HERE=$(cd "$(dirname "$0")" && pwd)
P="$HERE/../../presentation"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
cd "$P"
soffice --headless --convert-to pdf PPT演讲版.pptx PPT提交版.pptx 2>&1 | grep -v Fontconfig || true
mv -f PPT演讲版.pdf PDF演讲版.pdf && mv -f PPT提交版.pdf PDF提交版.pdf
python3 "$HERE/build_speech_pdf.py" 演讲稿.md 演讲稿.html
python3 "$HERE/build_speech_pdf.py" 演讲稿.md 演讲稿_英文.html --en
for n in 演讲稿 演讲稿_英文; do
  "$CHROME" --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf="$P/$n.pdf" "file://$P/$n.html" >/dev/null 2>&1
done
rm -f 演讲稿.html 演讲稿_英文.html
ls -la "$P"/*.pdf
