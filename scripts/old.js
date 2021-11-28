// import { Calendar } from '@fullcalendar/core';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import listPlugin from '@fullcalendar/list';
// import googleCalendarPlugin from '@fullcalendar/google-calendar';
// import interaction from '@fullcalendar/interaction'
// import ruLocale from '@fullcalendar/core/locales/ru'
// import 'bootstrap/dist/css/bootstrap.css';
// import '../styles/main.css';

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