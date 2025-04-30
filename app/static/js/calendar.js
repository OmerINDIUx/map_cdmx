function displayCalendarData(data) {
    const calendarBody = document.getElementById('calendar-data');
    data.calendar.forEach((row) => {
        const tr = document.createElement('tr');
        Object.values(row).forEach((value) => {
            const td = document.createElement('td');
            td.textContent = value;
            tr.appendChild(td);
        });
        calendarBody.appendChild(tr);
    });
}
