import fs from 'fs';

try {
    const data: string = fs.readFileSync('/Users/DPU09/Documents/Projects/codingplayroom-js/people.json', 'utf8');
    const jsonData: any = JSON.parse(data);
    console.log(jsonData);
    console.log(typeof jsonData);
  } catch (err) {
    console.error('Error reading or parsing the file:', err);
  }

