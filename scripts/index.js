const eventsStore = (() => {
    let events = JSON.parse(localStorage.getItem('events')) || [ ...defaultEvents ]
    return {
        getEvents() {
            return events
        },
        add(eventObj) {
            console.log('Added event', eventObj)
            events = [ ...events, eventObj ]
            localStorage.setItem('events', JSON.stringify(events))
        },
        getEvent(eventId) {
            return events.find(({ id }) => id === eventId)
        },
        editEvent(eventId, data) {
            console.log(`Edited event ${eventId}`)
            events = events.map(event => {
                return event.id === eventId ? { ...event, ...data } : event
            })
            localStorage.setItem('events', JSON.stringify(events))
        },
        deleteEvent(eventId) {
            console.log(`Deleted event ${eventId}`)
            events = events.filter(({ id }) => id !== eventId)
            localStorage.setItem('events', JSON.stringify(events))
        }
    }
})()

let selectedDateString;
let selectedEventId;

$(document).ready(function () {
    $('#calendar').evoCalendar({
        firstDayOfWeek: 1,
        todayHighlight: true,
        calendarEvents: eventsStore.getEvents().map(format),
        sidebarDisplayDefault: false,
        eventDisplayDefault: false,

    })

    selectedDateString = $('#calendar').evoCalendar('getActiveDate');

    updateTranslations.all()

    const formEdit = (data) => {
        const form = $('.event-form form')
        form[0].reset()
        form.data('edited', true);
        form.find('button[type=submit]').text('Сохранить');
        form.find('input, textarea, select')
            .each(function () {
                const fieldName = this.name
                data[fieldName] && $(this).val(data[fieldName])
            })
        form.find('button.stopEdit').show()
        form.find('button.deleteEvent').show()
    }

    const formReset = () => {
        const form = $('.event-form form')
        form[0].reset()
        form.data('edited', false);
        form.find('button[type=submit]').text('Добавить');
        form.find('button.stopEdit').hide()
        form.find('button.deleteEvent').hide()
        selectedEventId = null;
    }

    $(document).on('click', 'button.stopEdit', (e) => {
        e.preventDefault()
        formReset()
    })

    $(document).on('click', 'button.deleteEvent', function (e) {
        e.preventDefault()
        $('#calendar').evoCalendar('removeCalendarEvent', selectedEventId);
        eventsStore.deleteEvent(selectedEventId)
        formReset()
    })

    /**
     * Add or edit event
     */
    $('.event-form form').on('submit', function (e) {
        e.preventDefault()

        if ($(this).data('edited')) {
            $('#calendar').evoCalendar('removeCalendarEvent', selectedEventId);
            $('#calendar').evoCalendar('addCalendarEvent', format({
                ...eventsStore.getEvent(selectedEventId), ...getFormData(e.currentTarget)
            }))
            eventsStore.editEvent(selectedEventId, getFormData(e.currentTarget))
            return formReset()
        }

        const defaultEventData = { id: ID(), date: selectedDateString, type: 'event' }
        const newEvent = { ...defaultEventData, ...getFormData(e.currentTarget) }
        $('#calendar').evoCalendar('addCalendarEvent', format(newEvent));
        eventsStore.add(newEvent)
        formReset()
    })

    /**
     * Select event
     */
    $(document).on('click', '.event-container', ({ currentTarget: eventContainer }) => {
        if ($('.event-form form').data('edited')) {
            return
        }
        ;
        const { eventIndex: eventId } = eventContainer.dataset
        selectedEventId = eventId;
        const event = eventsStore.getEvent(eventId)
        formEdit(event)
    })

    /**
     * Calendar events handlers
     */
    $('#calendar')
        .on('selectDate', (e, date) => {
            selectedDateString !== date && updateTranslations.eventHeader()
            selectedDateString = date;
            $('#calendar').evoCalendar('toggleEventList', true)
        });

    $('#calendar')
        .on('selectMonth', updateTranslations.calendarTitle);

    $('#calendar')
        .on('selectYear', updateTranslations.calendarTitle);

    window.addEventListener('resize', () => {
        $('#calendar').evoCalendar('toggleSidebar', window.innerWidth >= 1300)
        $('#calendar').evoCalendar('toggleEventList', window.innerWidth >= 1300)
    })
})