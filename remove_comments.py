
import os
import re

def remove_comments_from_file(file_path):
    if not file_path.endswith(('.js', '.jsx', '.ts', '.tsx', '.css', '.html', '.md', '.mjs', '.cjs')):
        return

    comment_patterns = []
    if file_path.endswith(('.js', '.jsx', '.ts', '.tsx', '.css', '.mjs', '.cjs')):
        comment_patterns = [
            r'//.*',
            r'/\*[\s\S]*?\*/'
        ]
    elif file_path.endswith(('.html', '.md')):
        comment_patterns = [
            r'<!--[\s\S]*?-->'
        ]
    else:
        return

    try:
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()

        original_content = content
        for pattern in comment_patterns:
            content = re.sub(pattern, '', content)

        if content != original_content:
            content = re.sub(r'\\n{3,}', '\\n\\n', content)
            content = content.strip()

            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Removed comments from: {file_path}")

    except Exception as e:
        print(f"Error processing {file_path}: {e}")

def main():
    exclude_dirs = ['.git', 'node_modules', '.idx', 'dist', 'build']
    exclude_files = [
        'bun.lockb',
        'package-lock.json',
        'remove_comments.py'
    ]

    for root, dirs, files in os.walk('.', topdown=True):
        dirs[:] = [d for d in dirs if d not in exclude_dirs]

        for file in files:
            if file in exclude_files:
                continue
            
            file_path = os.path.join(root, file)
            remove_comments_from_file(file_path)

if __name__ == "__main__":
    main()
