const form = document.getElementById('fileUploadForm');
const fileInput = document.getElementById('fileInput');
const outputDiv = document.getElementById('output');


form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const file = fileInput.files[0];

  if (!file) {
    outputDiv.innerHTML = "Please select an Excel file.";
    return;
  }

  const reader = new FileReader();

  reader.onload = function (e) {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });

    workbook.Sheets.forEach(sheetName => {
      const sheet = workbook.Sheets[sheetName];
      const range = XLSX.utils.decode_range(sheet['!ref']);
      const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      outputDiv.innerHTML += `<h2>Sheet Name: ${sheetName}</h2>`;
      outputDiv.innerHTML += '<table class="table table-striped">';
      outputDiv.innerHTML += '<thead><tr>';
      data[0].forEach(header => {
        outputDiv.innerHTML += `<th>${header}</th>`;
      });
      outputDiv.innerHTML += '</tr></thead>';
      outputDiv.innerHTML += '<tbody>';
      data.slice(1).forEach(row => {
        outputDiv.innerHTML += '<tr>';
        row.forEach(cell => {
          outputDiv.innerHTML += `<td>${cell}</td>`;
        });
        outputDiv.innerHTML += '</tr>';
      });
      outputDiv.innerHTML += '</tbody></table>';
    });
  };

  reader.readAsArrayBuffer(file);
});