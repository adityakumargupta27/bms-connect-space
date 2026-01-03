
import fs from 'fs';
import path from 'path';

const removeCommentsFromFile = (filePath) => {
    const fileExtension = path.extname(filePath);
    const validExtensions = ['.js', '.jsx', '.ts', '.tsx', '.css', '.html', '.md', '.mjs', '.cjs'];

    if (!validExtensions.includes(fileExtension)) {
        return;
    }

    let commentPatterns = [];
    if (['.js', '.jsx', '.ts', '.tsx', '.css', '.mjs', '.cjs'].includes(fileExtension)) {
        commentPatterns = [
            /\/\/.*$/gm,
            /\/\*[\s\S]*?\*\//gm
        ];
    } else if (['.html', '.md'].includes(fileExtension)) {
        commentPatterns = [
            /<!--[\s\S]*?-->/gm
        ];
    } else {
        return;
    }

    try {
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });
        let newContent = fileContent;

        for (const pattern of commentPatterns) {
            newContent = newContent.replace(pattern, '');
        }

        newContent = newContent.replace(/\n{3,}/g, '\n\n').trim();

        if (newContent !== fileContent.trim()) {
            fs.writeFileSync(filePath, newContent, { encoding: 'utf-8' });
            console.log(`Removed comments from: ${filePath}`);
        }
    } catch (e) {
        console.error(`Error processing ${filePath}: ${e}`);
    }
};

const traverseDir = (dir) => {
    const excludeDirs = ['.git', 'node_modules', '.idx', 'dist', 'build'];
    const excludeFiles = [
        'bun.lockb',
        'package-lock.json',
        'remove_comments.py',
        'remove_comments.js'
    ];

    try {
        const files = fs.readdirSync(dir, { withFileTypes: true });
        for (const file of files) {
            const fullPath = path.join(dir, file.name);
            if (file.isDirectory()) {
                if (!excludeDirs.includes(file.name)) {
                    traverseDir(fullPath);
                }
            } else if (file.isFile()) {
                if (!excludeFiles.includes(file.name)) {
                    removeCommentsFromFile(fullPath);
                }
            }
        }
    } catch (err) {
        console.error(`Error reading directory ${dir}: ${err}`);
    }
};

traverseDir(process.cwd());
