import Calendar from './Сalendar';

class FormDate {
  constructor(form) {
    this.form = form;
    this.there = {};
    this.back = {};
    this.calendarThere = null;
    this.calendarBack = null;
    this._error = null;

    this._init();
  }

  _init() {
    this.form.addEventListener('submit', this._submitForm.bind(this));

    this.there = this.form.elements['date-there'];
    this.back = this.form.elements['date-back'];

    this.calendarThere = new Calendar();
    const calendarThere = this.calendarThere.node;
    calendarThere.classList.add('calendar__hidden');
    calendarThere.classList.add('form__calendar');
    this.there.parentNode.insertBefore(calendarThere, this.there.nextSibling);
    this.there.addEventListener('input', this._onInputThere.bind(this));

    this.there.addEventListener('focus', (e) => {
      if (e.target === e.currentTarget) {
        calendarThere.classList.toggle('calendar__hidden');
      }
    });

    this.calendarThere.chooseDay(this._onChooseDayThere.bind(this));

    this.back.addEventListener('input', e => e.target.value = 'Обратно:');
    this.calendarBack = new Calendar();
    const calendarBack = this.calendarBack.node;
    calendarBack.classList.add('calendar__hidden');
    calendarBack.classList.add('form__calendar');
    this.back.parentNode.insertBefore(calendarBack, this.back.nextSibling);

    this.back.addEventListener('focus', (e) => {
      if (e.target === e.currentTarget) {
        calendarBack.classList.toggle('calendar__hidden');
      }
    });

    this.calendarBack.chooseDay(this._onChooseDayBack.bind(this));
  }

  _submitForm(e) {
    e.preventDefault();

    if (this._error !== null) this._error.remove();

    this._error = document.createElement('p');
    this._error.className = 'error';

    if (this.there.value.trim() === '' || this.there.value.trim() === 'Туда:') {
      this._error.innerHTML = 'Укажите дату отправления';
      this.there.parentNode.insertBefore(this._error, this.there.previousSibling);
    } else if (this.back.value.trim() === '' || this.back.value.trim() === 'Обратно:') {
      this._error.innerHTML = 'Укажите дату возврата';
      this.back.parentNode.insertBefore(this._error, this.back.previousSibling);
    } else {
      alert(`Дата отправление: ${this.there.value}, дата возврата: ${this.back.value}`);
    }
  }

  _onInputThere(e) {
    e.target.value = 'Туда:';
    this.back.value = 'Обратно:';
    this.back.parentNode.classList.add('form__label-hidden');
  }

  _onChooseDayThere(e, calendar) {
    this.there.value = 'Туда:';
    this.back.value = 'Обратно:';
    this.there.value = calendar.value;
    this.back.parentNode.classList.remove('form__label-hidden');

    const { _year, _month } = calendar;

    this.calendarBack.mockDate([
      _year,
      _month,
      Number(e.target.dataset.day),
    ], 'YYYY MM DD');
  }

  _onChooseDayBack(e, calendar) {
    this.back.value = 'Обратно:';
    this.back.value = calendar.value;
  }
}

export default FormDate;
