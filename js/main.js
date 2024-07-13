function displayResults(allocation) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    // Create table
    const table = document.createElement('table');
    table.innerHTML = `
        <tr>
            <th>Group ID</th>
            <th>Hostel Name</th>
            <th>Room Number</th>
            <th>Members Allocated</th>
        </tr>
    `;

    allocation.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${row['Group ID']}</td>
            <td>${row['Hostel Name']}</td>
            <td>${row['Room Number']}</td>
            <td>${row['Members Allocated']}</td>
        `;
        table.appendChild(tr);
    });

    resultDiv.appendChild(table);

    // Add download button
    const downloadBtn = document.createElement('button');
    downloadBtn.textContent = 'Download CSV';
    downloadBtn.onclick = () => downloadCSV(allocation);
    resultDiv.appendChild(downloadBtn);
}

function downloadCSV(data) {
    const csvContent = "data:text/csv;charset=utf-8," 
        + "Group ID,Hostel Name,Room Number,Members Allocated\n"
        + data.map(row => `${row['Group ID']},${row['Hostel Name']},${row['Room Number']},${row['Members Allocated']}`).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "room_allocation.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

document.getElementById('allocateButton').addEventListener('click', async () => {
    const groupFile = document.getElementById('groupFile').files[0];
    const hostelFile = document.getElementById('hostelFile').files[0];

    if (!groupFile || !hostelFile) {
        alert('Please select both CSV files.');
        return;
    }

    const groupData = await parseCSV(groupFile);
    const hostelData = await parseCSV(hostelFile);

    const allocation = allocateRooms(groupData, hostelData);
    
    displayResults(allocation);
});
