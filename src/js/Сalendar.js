import moment from 'moment';

class Calendar {
  constructor() {
    this._local = '';
    this._date = {};
    this._year = 0;
    this._month = '';
    this._minDay = 0;
    this._minMonth = 0;
    this._minYear = 0;
    this._nodeDate = {};
    this._nodeTbody = {};


    this.node = {};
    this.listDays = [];
    this.value = '';
    this.weeks = 6;
    this.daysWeek = 7;

    this._init();
  }

  mockDate(...params) {
    this._local = 'ru';
    this._date = moment(...params).locale(this._local);
    this._year = Number(this._date.format('YYYY'));
    this._month = Number(this._date.format('MM'));
    this._minDay = Number(this._date.format('DD'));
    this._minMonth = Number(this._date.format('MM'));
    this._minYear = Number(this._date.format('YYYY'));

    this._nodeDate.innerHTML = `${this._date.format('MMMM')}, ${this._year}`;

    this.generateMonth(this._year, this._month);
  }

  _init() {
    this._local = 'ru';
    this._date = moment(new Date()).locale(this._local);
    this._year = Number(this._date.format('YYYY'));
    this._month = Number(this._date.format('MM'));
    this._minDay = Number(this._date.format('DD'));
    this._minMonth = Number(this._date.format('MM'));
    this._minYear = Number(this._date.format('YYYY'));

    this._createNode();
  }

  _createNode() {
    const prev = document.createElement('button');
    prev.className = 'calendar__toggle calendar__toggle-prev calendar__toggle--hidden';
    prev.innerHTML = '<';
    prev.addEventListener('click', this._togglePrevMonth.bind(this));

    this._nodeDate = document.createElement('div');
    this._nodeDate.className = 'calendar__date';
    this._nodeDate.innerHTML = `${this._date.format('MMMM')}, ${this._year}`;

    const next = document.createElement('button');
    next.className = 'calendar__toggle calendar__toggle-next';
    next.innerHTML = '>';
    next.addEventListener('click', this._toggleNextMonth.bind(this));

    const head = document.createElement('div');
    head.className = 'calendar__head';
    head.appendChild(prev);
    head.appendChild(this._nodeDate);
    head.appendChild(next);

    const arrayDaysWeek = ['Пт', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    const trHead = document.createElement('tr');

    for (const dayWeek of arrayDaysWeek) {
      const tdHead = document.createElement('td');
      tdHead.innerHTML = dayWeek;

      trHead.appendChild(tdHead);
    }

    const thead = document.createElement('thead');
    thead.className = 'calendar__table-head';
    thead.appendChild(trHead);

    this._nodeTbody = document.createElement('tbody');
    this._nodeTbody.className = 'calendar__table-body';

    for (let i = 0; i < this.weeks; i++) {
      const tr = document.createElement('tr');

      for (let i = 0; i < this.daysWeek; i++) {
        const td = document.createElement('td');
        td.className = 'calendar__day';

        tr.appendChild(td);
        this.listDays.push(td);
      }

      this._nodeTbody.appendChild(tr);
    }

    this.generateMonth(this._year, this._month);

    const tabel = document.createElement('table');
    tabel.className = 'calendar__table';
    tabel.appendChild(thead);
    tabel.appendChild(this._nodeTbody);


    this.node = document.createElement('div');
    this.node.className = 'calendar';
    this.node.appendChild(head);
    this.node.appendChild(tabel);
  }

  _toggleNextMonth(e) {
    e.preventDefault();

    const date = moment([this._year, this._month], 'YYYY MM').locale(this._local);
    const add = date.add(1, 'month');

    this._year = Number(add.format('YYYY'));
    this._month = Number(add.format('MM'));
    this._nodeDate.innerHTML = `${date.format('MMMM')}, ${this._year}`;
    this.node
      .querySelector('.calendar__toggle-prev')
      .classList.remove('calendar__toggle--hidden');

    this.generateMonth(this._year, this._month);
  }

  _togglePrevMonth(e) {
    e.preventDefault();

    const monthsCalendar = (this._year * 12) + this._month;
    const months = (this._minYear * 12) + this._minMonth;

    e.currentTarget.classList.add('calendar__toggle--hidden');

    if (monthsCalendar > months) {
      const date = moment([this._year, this._month], 'YYYY MM').locale(this._local);
      const subtract = date.subtract(1, 'month');

      this._year = Number(subtract.format('YYYY'));
      this._month = Number(subtract.format('MM'));
      this._nodeDate.innerHTML = `${date.format('MMMM')}, ${this._year}`;
      e.currentTarget.classList.remove('calendar__toggle--hidden');
      this.generateMonth(this._year, this._month);
    }
  }

  generateMonth(year, month) {
    const date = moment([year, month], 'YYYY MM');
    const daysInMonth = Number(date.daysInMonth());
    const isoWeekday = Number(date.isoWeekday());

    return this.listDays.forEach((item, i) => {
      item.className = 'calendar__day';
      item.removeAttribute('data-day');
      item.innerHTML = '';

      if (i >= isoWeekday && i < daysInMonth + isoWeekday) {
        const monthsCalendar = (year * 12) + month;
        const months = (this._minYear * 12) + this._minMonth;
        const indentedMonth = i - isoWeekday + 1;
        item.innerHTML = indentedMonth;

        if (indentedMonth === this._minDay && monthsCalendar === months) {
          item.classList.add('calendar__day--red');
        } else if (indentedMonth < this._minDay && monthsCalendar === months) {
          item.classList.add('calendar__day--hidden');
        } else if (indentedMonth > this._minDay || monthsCalendar > months) {
          item.dataset.day = indentedMonth;
          item.classList.add('calendar__day--show');
        }
      }
    });
  }

  chooseDay(cb = () => {}) {
    this.listDays.forEach((item) => {
      item.addEventListener('click', (e) => {
        if (e.currentTarget.classList.contains('calendar__day--show')) {
          this.value = `${this._year}-${this._month}-${e.target.dataset.day}`;
          cb(e, this);
        }
      });
    });
  }
}

export default Calendar;
