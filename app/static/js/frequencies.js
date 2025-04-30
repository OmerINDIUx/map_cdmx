export function llenarFrequenciesTable(frequencies) {
    const tbody = document.getElementById('frequencies-data');
    tbody.innerHTML = '';  // Limpia la tabla antes de agregar filas nuevas

    frequencies.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.trip_id}</td>
            <td>${item.headway_secs}</td>
        `;
        tbody.appendChild(tr);
    });
}

export function createFrequencyChart(data) {
    const frequencies = data.frequencies.map(row => row.headway_secs);
    const tripIds = data.frequencies.map(row => row.trip_id);

    const ctx = document.getElementById('frequencies-chart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
