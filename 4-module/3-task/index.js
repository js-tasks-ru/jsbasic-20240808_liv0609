function highlight(table) {
  const rows = table.querySelectorAll('tbody tr');

  rows.forEach(row => {
    const cells = row.children;

    const ageCell = cells[1];
    const genderCell = cells[2];
    const statusCell = cells[3];

    //Age
    const age = parseInt(ageCell.textContent.trim(), 10);
    if (age < 18) {
      row.style.textDecoration = 'line-through';
    }

    //Gender
    const gender = genderCell.textContent.trim();
    if (gender === 'm') {
      row.classList.add('male');
    } else if (gender === 'f') {
      row.classList.add('female');
    }

    //Status
    if (statusCell.hasAttribute('data-available')) {
      const isAvailable = statusCell.getAttribute('data-available') === 'true';
      row.classList.add(isAvailable ? 'available' : 'unavailable');
    } else {
      row.setAttribute('hidden', 'true');
    }
  });
}
