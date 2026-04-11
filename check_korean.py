import re
from pathlib import Path
p = Path(r'C:\Users\chan\tabeu\src\App.tsx')
text = p.read_text(encoding='utf-8')
# find Korean text in strings/comments
k = re.findall(r'[\uac00-\ud7a3]+(?:[\uac00-\ud7a3\s.,···?!"\'()\[\]\/\-]+[\uac00-\ud7a3]+)*', text)
unique = list(dict.fromkeys(k))
for i, s in enumerate(unique, 1):
    print(f'{i}: {s}')
print('--- total', len(unique))
