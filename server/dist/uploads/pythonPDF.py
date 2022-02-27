try:
    import sys
    import pdfminer.high_level
    import ocrmypdf
    import re

    # initial arguments
    path_to_pdf = sys.argv[1]
    filename = sys.argv[2]

    # non-ocr procedure
    text = pdfminer.high_level.extract_text(path_to_pdf)

    # check to see if ocr is necessary
    if not re.search("a", text):
        if __name__ == '__main__':
            ocrmypdf.ocr(path_to_pdf, path_to_pdf, deskew=True)

    # extract text again
    text = pdfminer.high_level.extract_text(path_to_pdf)
    print(text)
except Exception as e:
    print(e)






