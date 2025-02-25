// Ganti dengan Spreadsheet ID dan API Key milikmu
const sheetId = "1M1fvwdPn5-RaEUYZs2t2On_8Xc8Fhync9IbXBN0jRx8";  
const apiKey = "AIzaSyAYu25karzBNotEDbchsiRKQmQbGh0bWAE";
const sheetName = "Sheet1";  

// Fungsi mengambil data dari Google Sheets
async function fetchData() {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.values.slice(1); // Hapus header
}

// Fungsi pencarian
async function searchData() {
    const query = document.getElementById("search").value.toLowerCase();
    const resultsTable = document.getElementById("results");
    resultsTable.innerHTML = "<tr><td colspan='3'>Loading...</td></tr>";

    const rows = await fetchData();
    const filtered = rows.filter(row => row.some(cell => cell.toLowerCase().includes(query)));

    resultsTable.innerHTML = filtered.length
        ? filtered.map(row => `<tr><td>${row[0]}</td><td>${row[1]}</td><td>${row[2]}</td></tr>`).join("")
        : "<tr><td colspan='3'>Data tidak ditemukan</td></tr>";
}

// Load data saat pertama kali dibuka
fetchData();
