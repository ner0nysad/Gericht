// SELECT

const selectHeader = document.querySelectorAll(".select__header");
const selectItem = document.querySelectorAll(".select__item");

selectHeader.forEach((item) => {
  item.addEventListener("click", selectToggle);
});

selectItem.forEach((item) => {
  item.addEventListener("click", selectChoose);
});

function selectToggle() {
  this.parentElement.classList.toggle("is-active");
  const icon = this.querySelector(".icon-down");
  icon.classList.toggle("icon-down-active");
}

function selectChoose() {
  const text = this.innerText;
  const select = this.closest(".reservation__select");
  const currentText = select.querySelector(".select__current");
  currentText.innerText = text;

  select.classList.remove("is-active");
}

// DATEPICKER

const dateHeader = document.querySelector(".date__header");

dateHeader.addEventListener("click", dateToggle);

function dateToggle() {
  const date = document.querySelector(".reservation__date");
  date.classList.toggle("is-active");
  date.querySelector(".icon-down").classList.toggle("icon-down-active");

  const currentDate = new Date();
  let year = currentDate.getFullYear();
  let month = currentDate.getMonth() + 1;

  if (date.classList.contains("is-active")) showCalendar(year, month);
}

function showCalendar(year, month) {
  const body = document.querySelector(".date__body");

  body.innerHTML = `
    <table class="date__table">
      <tbody>
        <tr>
          <th class="date__th">
            <button class="table__button button__prev-year"><<</button>
          </th>
          <th class="date__th">
            <button class="table__button button__prev-month"><</button>
          </th>
            <th colspan='3'class='date__month-and-year date__th'>
          </th>
          <th class="date__th">
            <button class="table__button button__next-month">></button>
          </th>
          <th class="date__th">
            <button class="table__button button__next-year">>></button>
          </th>
        </tr>
        <tr>
          <th class="date__th">M</th>
          <th class="date__th">Tu</th>
          <th class="date__th">W</th>
          <th class="date__th">Th</th>
          <th class="date__th">F</th>
          <th class="date__th">Sa</th>
          <th class="date__th">Su</th>
        </tr>
      </tbody>
    </table>`;

  let thDate = body.querySelector(".date__month-and-year");

  function getMonth() {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[date.getMonth()];
  }

  function createCalendar(year, month) {
    date = new Date(year, month - 1);
    thDate.innerHTML = `${getMonth()} ${year}`;

    function dayInMonth(month, year) {
      return new Date(year, month, 0).getDate();
    }

    let daysMonth = dayInMonth(month, year);
    let daysPrevMonth = dayInMonth(month - 1, year);
    let dateLast = new Date(year, month - 1, daysMonth);

    let day = date.getDay();
    let row = `<tr>`;

    if (day === 0) {
      let count = daysPrevMonth - 5;
      for (let i = 1; i < 7; i++) {
        row += `<td class="date__td"></td>`;
        count++;
      }
    } else {
      let count = daysPrevMonth - (day - 2);
      for (let i = 1; i < day; i++) {
        row += `<td class="date__td"></td>`;
        count++;
      }
    }

    for (let i = 1; i <= daysMonth; i++) {
      if (day % 7 === 1) {
        row += `</tr><tr>`;
      }
      row += `<td class="date__day date__td">${i}</td>`;
      day++;
    }

    if (dateLast.getDay() !== 0) {
      let count = 1;
      for (let i = dateLast.getDay() + 1; i <= 7; i++) {
        row += `<td class="date__td"></td>`;
        count++;
      }
    }
    
    row += `</tr>`;

    let tbody = document.querySelector("tbody");
    tbody.innerHTML += row;
  }

  createCalendar(year, month);

  document.querySelector(".button__prev-year").addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();

      year--;
      showCalendar(year, month);
    });

  document.querySelector(".button__prev-month").addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();

      if (month > 1) {
        month--;
      } else {
        month = 12;
        year--;
      }

      showCalendar(year, month);
    });

  document.querySelector(".button__next-month").addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();

      if (month < 12) {
        month++;
      } else {
        month = 1;
        year++;
      }

      showCalendar(year, month);
    });

  document.querySelector(".button__next-year").addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();

      year++;

      showCalendar(year, month);
    });

  const days = body.querySelectorAll(".date__day");

  days.forEach((day) => {
    day.addEventListener("click", function () {
      const dateCurrent = document.querySelector(".date__current");
      dateCurrent.textContent = `${
        day.textContent < 10 ? "0" + day.textContent : day.textContent
      }/${month < 10 ? "0" + month : month}/${year}`;

      dateToggle();
    });
  });
}
