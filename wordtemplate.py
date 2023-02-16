from pathlib import Path
from docxtpl import DocxTemplate
import json

document_path = Path(__file__).parent/"my_word_template.docx"
doc = DocxTemplate(document_path)

# context = {"NAME":"SVEN"}
f = open('list.json')
  
# returns JSON object as 
# a dictionary
data = json.load(f)
  
# Iterating through the json
# list
# print(data)
for i in data:
    print(i)
  
# Closing file
f.close()
# sending the json thingy to template
doc.render(i)
doc.save(Path(__file__).parent/"generated_doc.docx")
