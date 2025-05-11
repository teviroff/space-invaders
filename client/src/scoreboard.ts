const tableBody = document.getElementById('scoreboard-body') as HTMLTableElement;
const sortingSelect = document.getElementById('sorting-select') as HTMLSelectElement;
const prevPageButton = document.getElementById('prev-page-button') as HTMLButtonElement;
const nextPageButton = document.getElementById('next-page-button') as HTMLButtonElement;

const recordsPerPage = 25;
let page = 1;

type RecordItem = {
    username: string,
    score: number,
    timestamp: string,
};

function createTableEntry(record: RecordItem, index: number): HTMLTableRowElement {
    let entry = document.createElement('tr');
    entry.appendChild(document.createElement('td')).innerText = index.toString();
    entry.appendChild(document.createElement('td')).innerText = record.username;
    entry.appendChild(document.createElement('td')).innerText = record.score.toString();
    entry.appendChild(document.createElement('td')).innerText = record.timestamp;
    return entry;
}

async function fetch_records() {
    tableBody.innerText = '';
    const response = await fetch(`/api/records?page=${page}&sorting=${sortingSelect.value}`);
    if (response.status === 200) {
        const records = (await response.json()) as RecordItem[];
        records.forEach((record, index) => {
            tableBody.appendChild(createTableEntry(record, index + (page - 1) * recordsPerPage + 1));
        });
        nextPageButton.disabled = (records.length !== recordsPerPage);
        return;
    }
    alert('Failed to load records');
}

prevPageButton.addEventListener('click', () => {
    if (page === 1) {
        prevPageButton.disabled = true;
        return;
    }
    page -= 1;
    fetch_records();
    nextPageButton.disabled = false;
    if (page === 1) {
        prevPageButton.disabled = true;
    }
});

nextPageButton.addEventListener('click', () => {
    page += 1;
    fetch_records();
    prevPageButton.disabled = false;
});

sortingSelect.addEventListener('change', () => {
    page = 1;
    prevPageButton.disabled = true;
    fetch_records();
});

document.addEventListener('DOMContentLoaded', () => {
    fetch_records();
});
