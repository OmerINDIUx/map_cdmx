function displayStopTimesData(data) {
    const stopTimesBody = document.getElementById('stop-times-data');
    data.stop_times.forEach((row) => {
        const tr = document.createElement('tr');
        Object.values(row).forEach((value) => {
            const td = document.createElement('td');
            td.textContent = value;
            tr.appendChild(td);
        });
        stopTimesBody.appendChild(tr);
    });
}
