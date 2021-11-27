// import { Calendar } from '@fullcalendar/core';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import listPlugin from '@fullcalendar/list';
// import googleCalendarPlugin from '@fullcalendar/google-calendar';
// import interaction from '@fullcalendar/interaction'
// import ruLocale from '@fullcalendar/core/locales/ru'
// import 'bootstrap/dist/css/bootstrap.css';
// import '../styles/main.scss';

// document.addEventListener('DOMContentLoaded', function () {
//     const calendarEl = document.getElementById('calendar');
//     const calendar = new Calendar(calendarEl, {
//         plugins: [ dayGridPlugin, timeGridPlugin, listPlugin, googleCalendarPlugin, interaction ],
//         headerToolbar: {
//             start: 'title',
//             center: '',
//             end: 'today prev,next dayGridMonth,timeGridWeek,timeGridDay'
//         },
//         aspectRatio: 2.5,
//         locale: ruLocale,
//         initialView: 'dayGridMonth',
//         buttonIcons: true,
//         nowIndicator: true,
//         firstDay: 1,
//         navLinks: true,
//         selectable: true,
//         editable: true,
//         // eventDisplay: 'list-item',
//         googleCalendarApiKey: 'AIzaSyCpnqF_bXCfU122x9gKf_4nFEUcthse4Fs',
//         displayEventEnd: true,
//         eventSources: [ {
//             googleCalendarId: 'ru.russian#holiday@group.v.calendar.google.com',
//             display: 'background'
//         } ],
//         eventClick(info) {
//             info.jsEvent.preventDefault();
//         },
//     });
//     calendar.render();
// });

const defaultEvents = [
    {
        id: '1',
        name: 'Выходной',
        description: 'Новогодние каникулы',
        date: [ 'January/1/2000', 'January/5/2000' ],
        type: "holiday",
        everyYear: true,
    }, {
        id: '2',
        name: 'Выходной',
        description: 'Рождество',
        date: 'January/7/2000',
        type: "holiday",
        everyYear: true,
    }, {
        id: '3',
        name: 'Выходной',
        description: 'День защитника Отечества',
        date: 'February/23/2000',
        type: "holiday",
        everyYear: true,
    }, {
        id: '4',
        name: 'Выходной',
        description: "Международный жеский день",
        date: 'March/8/2000',
        type: "holiday",
        everyYear: true,
    }, {
        id: '5',
        name: 'Выходной',
        description: "Праздник Весны и Труда;",
        date: 'May/1/2000',
        type: "holiday",
        everyYear: true,
    }, {
        id: '6',
        name: 'Выходной',
        description: "День Победы",
        date: 'May/9/2000',
        type: "holiday",
        everyYear: true,
    }, {
        id: '7',
        name: 'Выходной',
        description: "День России",
        date: 'June/12/2000',
        type: "holiday",
        everyYear: true,
    }, {
        id: '8',
        name: 'Выходной',
        description: "День народного единства",
        date: 'November/4/2000',
        type: "holiday",
        everyYear: true,
    }
]

const events = [ ...defaultEvents,
    {
        id: '123213',
        name: 'Первый',
        date: 'November/27/2021',
        type: 'event'
    },{
        id: '44',
        name: 'Первый',
        date: 'November/27/2021',
        type: 'event'
    },{
        id: '55',
        name: 'Первый',
        date: 'November/27/2021',
        type: 'event'
    },{
        id: '66',
        name: 'Первый',
        date: 'November/27/2021',
        type: 'event'
    },{
        id: '66',
        name: 'Первый',
        date: 'November/27/2021',
        type: 'event'
    },{
        id: '66',
        name: 'Первый',
        date: 'November/27/2021',
        type: 'event'
    },{
        id: '66',
        name: 'Первый',
        date: 'November/27/2021',
        type: 'event'
    },{
        id: '66',
        name: 'Первый',
        date: 'November/27/2021',
        type: 'event'
    },{
        id: '66',
        name: 'Первый',
        date: 'November/27/2021',
        type: 'event'
    },{
        id: '66',
        name: 'Первый',
        date: 'November/27/2021',
        type: 'event'
    },
]

$(document).ready(function () {
    $('#calendar').evoCalendar({
        firstDayOfWeek: 1,
        todayHighlight: true,
        calendarEvents: events
    })
})