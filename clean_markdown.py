import re

# Read the original file
with open('/Users/joshmysore/Downloads/Cursor-Design-Downstage.md', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove code blocks (```...```)
content = re.sub(r'```[\s\S]*?```', '', content)

# Remove inline code blocks
content = re.sub(r'`[^`]+`', '', content)

# Remove lines that are just whitespace or very short
lines = content.split('\n')
cleaned_lines = []

for line in lines:
    line = line.strip()
    # Keep lines that are:
    # - Headers (# ## ### etc)
    # - List items (- * 1. etc)
    # - Paragraphs (non-empty lines that aren't code)
    # - Blockquotes (>)
    if (line.startswith('#') or 
        line.startswith('-') or 
        line.startswith('*') or 
        line.startswith('>') or
        (len(line) > 10 and not line.startswith('    ') and not line.startswith('  ')) or
        line == ''):
        cleaned_lines.append(line)

# Join lines back together
cleaned_content = '\n'.join(cleaned_lines)

# Remove multiple empty lines
cleaned_content = re.sub(r'\n\s*\n\s*\n', '\n\n', cleaned_content)

# Write the cleaned file
with open('/Users/joshmysore/Downloads/Cursor-Design-Downstage-cleaned.md', 'w', encoding='utf-8') as f:
    f.write(cleaned_content)

print('Cleaned markdown file created successfully!')
print('Removed all code blocks and kept only the conversation content.')



