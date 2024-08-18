
// Create a new div element
const div = document.createElement('div');

// Set the ID and class of the div
div.id = 'json-container';
div.className = 'container';

// Append the div to the body
document.body.appendChild(div);

// Inject styles into the document
const style = document.createElement('style');
style.textContent = `


.container {
    width: auto;
    display: inline-flex; /* or inline-flex if needed */
    flex-direction: column; /* or row based on layout */
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Choose a modern font */
  line-height: 1.6; /* Improve readability */
}

.section {
  margin-bottom: 30px; /* Increase spacing between sections */
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05); /* Add a subtle shadow */
  border-radius: 8px; /* Round the corners */
}

.section h2 {
  margin: 0; /* Reset default margins */
  padding: 16px 20px;  /* Increase padding */
  cursor: pointer;
  background-color: #f8f9fa; /* Use a lighter gray */
  border-bottom: 1px solid #e9ecef; /* Subtle bottom border */
  border-radius: 8px 8px 0 0; /* Round top corners only */
  font-weight: 500; /* Slightly bolder text */
  transition: background-color 0.2s ease; /* Add a hover effect */
}

.section h2:hover {
  background-color: #f1f3f5; 
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 0; /* Remove default table margin */
}

th, td {
  border: 1px solid #dee2e6; /* Use a lighter border color */
  padding: 12px 16px;  /* Increase padding */
  text-align: left;
}

th {
  background-color: #f8f9fa; /* Match section header background */
  font-weight: 600;
}

.nested-table {
  margin-left: 30px; /* Increase indentation */
}

.array-list {
  margin: 10px 0; /* Add some spacing */
  padding-left: 40px;  /* Increase indentation */
  list-style-type: disc; /* Use a more visually appealing list style */
}

.array-list li {
  margin-bottom: 5px; /* Space out list items */
}

.collapse-content {
  display: none;
  transition: all 0.3s ease;
}

.collapse-content.visible {
  display: block;
}

.collapsed::before, .expanded::before {
  margin-right: 5px; /* Add some space between icon and text */
}

.collapsed::before {
  content: "▶ ";
  font-size: 12px;
}

.expanded::before {
  content: "▼ ";
  font-size: 12px;
}
`;
document.head.appendChild(style);

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
    header.classList.add('collapsed');
    section.appendChild(header);

    const collapseContent = document.createElement('div');
    collapseContent.classList.add('collapse-content');

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
            createVerticalTable(value, nestedTableContainer, key);
            td.appendChild(nestedTableContainer);
        } else if (Array.isArray(value)) {
            const ul = document.createElement('ul');
            ul.classList.add('array-list');
            value.forEach((item, index) => {
                const li = document.createElement('li');
                const nestedContainer = document.createElement('div');
                createTable(item, nestedContainer, `Item ${index + 1}`);
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
    collapseContent.appendChild(table);
    section.appendChild(collapseContent);
    parentElement.appendChild(section);

    // Add event listener to toggle collapse
    header.addEventListener('click', () => {
        header.classList.toggle('expanded');
        header.classList.toggle('collapsed');
        collapseContent.classList.toggle('visible');
    });
}

// Initialize vertical table creation
