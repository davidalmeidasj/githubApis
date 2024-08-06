import { replaceInFile } from 'replace-in-file';

const options = {
    files: 'dist/**/*.js',
    from: /from '(\..*)';/g,
    to: (match, p1) => `from '${p1}.js';`,
};

try {
    const results = await replaceInFile(options);
    console.log('Replacement results:', results);
} catch (error) {
    console.error('Error occurred:', error);
}
