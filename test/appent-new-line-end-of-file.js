import fs from 'fs/promises';

// 👇️ if you use CommonJS require()
// const fs = require('fs/promises')

async function appendDataToFile() {
  try {
    const filePath = 'my-file-111111111111.txt';

    await fs.appendFile(filePath, 'First line\n', 'utf8');

    await fs.appendFile(filePath, 'Second line\n', 'utf8');

    await fs.appendFile(filePath, 'Third line\n', 'utf8');
  } catch (err) {
    console.log(err.message);
  }
}

appendDataToFile().then(() => {
  console.log('Data appended to the file');
});