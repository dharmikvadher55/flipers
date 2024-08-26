// Create a new div element
const div = document.createElement('div');

// Set the ID and class of the div
div.id = 'json-container';
div.className = 'container';

// Append the div to the body
document.body.appendChild(div);

// Create a <link> element for the CSS
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'style.css'; // Path to your CSS file

document.head.appendChild(link);

// Function to create vertical table from JSON
export function createTable(data, parentElement, title = "Data") {
    if (typeof data !== 'object' || data === null) {
        const p = document.createElement('p');
        p.textContent = `${title}: ${data}`;
        parentElement.appendChild(p);
        return;
    }

    const section = document.createElement('div');
    section.classList.add('section');

    const header = document.createElement('h2');
    header.textContent = title;
    section.appendChild(header);

    const table = document.createElement('table');
    const tbody = document.createElement('tbody');

    for (const [key, value] of Object.entries(data)) {
        const row = document.createElement('tr');

        const th = document.createElement('th');
        th.textContent = key;
        row.appendChild(th);

        const td = document.createElement('td');
        
        if (typeof value === 'object' && !Array.isArray(value)) {
            const nestedTableContainer = document.createElement('div');
            nestedTableContainer.classList.add('nested-table');
            createTable(value, nestedTableContainer, key);
            td.appendChild(nestedTableContainer);
        } else if (Array.isArray(value)) {
            const ul = document.createElement('ul');
            ul.classList.add('array-list');
            value.forEach((item, index) => {
                const li = document.createElement('li');
                const nestedContainer = document.createElement('div');
                createTable(item, nestedContainer, `${index + 1}`);
                li.appendChild(nestedContainer);
                ul.appendChild(li);
            });
            td.appendChild(ul);
        } else {
            td.textContent = value;
        }
        
        row.appendChild(td);
        tbody.appendChild(row);
    }

    table.appendChild(tbody);
    section.appendChild(table);
    parentElement.appendChild(section);
}

// Initialize vertical table creation