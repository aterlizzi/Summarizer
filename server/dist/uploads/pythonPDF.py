import os
import pdfminer.high_level
import sys
import re

filename = sys.argv[2]
path_to_pdf = sys.argv[1]
try:
    # check if page already has text.
    text = pdfminer.high_level.extract_text(path_to_pdf)

    # if no text, perform ocr
    if not re.search("a", text):
        os.system(f'ocrmypdf {path_to_pdf} {path_to_pdf} --quiet')

        text = pdfminer.high_level.extract_text(path_to_pdf)
        print(text)

except Exception as e:
    print(e)







