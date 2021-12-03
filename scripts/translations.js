const months = {
    January: 'Январь',
    February: 'Февраль',
    March: 'Март',
    April: 'Апрель',
    May: 'Май',
    June: 'Июнь',
    July: 'Июль',
    August: 'Август',
    September: 'Сентябрь',
    October: 'Октябрь',
    November: 'Ноябрь',
    December: 'Декабрь',
};

const daysTranslations = {
    Mon: { long: 'Понедельник', short: 'Пн' },
    Tue: { long: 'Вторник', short: 'Вт' },
    Wed: { long: 'Среда', short: 'Ср' },
    Thu: { long: 'Четверг', short: 'Чт' },
    Fri: { long: 'Пятница', short: 'Пт' },
    Sat: { long: 'Суббота', short: 'Сб' },
    Sun: { long: 'Воскресенье', short: 'Вс' },
};

const updateTranslations = {
    eventHeader() {
        console.log(`Update event header translation`);
        const eventHeader = document.querySelector('.event-header p');
        eventHeader.innerHTML = new Date(eventHeader.innerHTML).toLocaleDateString('ru-RU', {
            weekday: 'short',
            month: 'long',
            day: 'numeric',
        });
    },
    months() {
        console.log(`Update months translation`);
        document
            .querySelectorAll('.calendar-months li.month')
            .forEach((el) => (el.innerHTML = months[el.innerHTML] || el.innerHTML));
    },
    calendarHeader() {
        console.log(`Update calendar header (weekdays) translation`);
        document.querySelectorAll('.calendar-header td.calendar-header-day').forEach((el) => {
            el.innerHTML = daysTranslations[el.innerHTML].short;
        });
    },
    all() {
        console.log(`Update all translation`);
        this.eventHeader();
        this.calendarHeader();
        this.months();
        this.calendarTitle();
    },
};
