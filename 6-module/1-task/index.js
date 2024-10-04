// * Компонент, который реализует таблицу
// * с возможностью удаления строк
// *
// * Пример одного элемента, описывающего строку таблицы
// *
// *      {
//   *          name: 'Ilia',
//   *          age: 25,
//   *          salary: '1000',
//   *          city: 'Petrozavodsk'
//     *      }
// *
// */

export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this.elem = this.createTable();
  }

  createTable() {

    // Create head of table

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    const header = ['Имя', 'Возраст', 'Зарплата', 'Город'];
    header.forEach(headerText => {
      const th = document.createElement('th');
      th.textContent = headerText;
      tr.appendChild(th);
    });

    thead.appendChild(tr);
    table.appendChild(thead);

    // Create body of table

    const tbody = document.createElement('tbody');
    this.rows.forEach((rowContent) => {
      const tr = document.createElement('tr');

      Object.values(rowContent).forEach(cellContent => {
        const td = document.createElement('td');
        td.textContent = cellContent;
        tr.appendChild(td);
      });

      //Create delete button

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'X';
      deleteButton.addEventListener('click', () => {
        tbody.removeChild(tr);
      });

      const tdDeleteButton = document.createElement('td');
      tdDeleteButton.appendChild(deleteButton);
      tr.appendChild(tdDeleteButton);

      tbody.appendChild(tr);
    });

    table.appendChild(tbody);

    return table;
  }
}
