#!/bin/zsh
# Render a .pptx to slide-NN.jpg images for visual QA, using Microsoft PowerPoint (macOS).
# usage: ./render.sh ../slides/presentation.pptx outdir
set -e
setopt +o nomatch
PPTX="$(cd "$(dirname "$1")" && pwd)/$(basename "$1")"
OUT="$2"; mkdir -p "$OUT"
PDF="$OUT/$(basename "${PPTX%.pptx}").pdf"
rm -f "$PDF" "$OUT"/slide-*.jpg
osascript <<EOF
tell application "Microsoft PowerPoint"
  open (POSIX file "$PPTX")
  set p to active presentation
  save p in (POSIX file "$PDF") as save as PDF
  close p saving no
end tell
EOF
pdftoppm -jpeg -r 110 "$PDF" "$OUT/slide"
ls -1 "$OUT"/slide-*.jpg
