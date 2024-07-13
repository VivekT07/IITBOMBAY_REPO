async function parseCSV(file) {
    const text = await file.text();
    const rows = text.split('\n').map(row => row.trim()).filter(row => row);
    const headers = rows[0].split(',').map(header => header.trim());
    return rows.slice(1).map(row => {
        const values = row.split(',');
        return headers.reduce((object, header, index) => {
            object[header] = values[index] ? values[index].trim() : '';
            return object;
        }, {});
    });
}