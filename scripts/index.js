const ID = () => Math.random().toString(36).substr(2, 9);

const format = (eventObj) => {
    const objCopy = { ...eventObj }

    if (objCopy.description) {
        objCopy.description = objCopy.description.replaceAll('\n', '<br/>')
    }

    if (objCopy?.tags?.length) {
        const formattedTags = objCopy
            .tags
            .split(',')
            .map(tag => tag.trim())
            .map(tag => `<a class="tag-link" href="">${tag}</a>`).join('')
        objCopy.description += '<br><br>' + formattedTags
    }

    return objCopy
}

const eventsStore = (() => {
    let events = JSON.parse(localStorage.getItem('events')) || [ ...defaultEvents ]
    return {
        getEvents() {
            return events
        },
        addEvent(eventObj) {
            events = [ ...events, eventObj ]
            localStorage.setItem('events', JSON.stringify(events))
        }
    }
})()

let selectedDateString;

$(document).ready(function () {
    $('#calendar').evoCalendar({
        firstDayOfWeek: 1,
        todayHighlight: true,
        calendarEvents: eventsStore.getEvents().map(format)
    })

    selectedDateString = $('#calendar').evoCalendar('getActiveDate');

    updateTranslations.all()


    $('#calendar')
        .on('selectDate', function (e, date) {
            if (selectedDateString !== date) {
                updateTranslations.eventHeader()
            }
            selectedDateString = date;
        });

    $('#calendar')
        .on('selectMonth', updateTranslations.calendarTitle);

    $('#calendar')
        .on('selectYear', updateTranslations.calendarTitle);

    document
        .querySelector('.event-form form')
        .addEventListener('submit', (e) => {
            e.preventDefault()
            const formData = [ ...new FormData(e.currentTarget) ]
                .reduce((acc, pair) => ({ ...acc, [pair[0]]: pair[1] }), { id: ID(), date: selectedDateString, type: 'event' })
            eventsStore.addEvent(formData)
            $('#calendar').evoCalendar('addCalendarEvent', format(formData));
        })
})