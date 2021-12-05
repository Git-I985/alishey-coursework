// хранилище событий, все операции
// по добавлению, удалению и изменению событий производятся через него

// !! ===============================================
// ивенты хранятся в папке %AppData% в десктопной верии
// и в localStorage в браузерной версии
// !! ===============================================

const eventsStore = (() => {
  let events = JSON.parse(localStorage.getItem("events")) || [...defaultEvents];
  return {
    getEvents() {
      return events;
    },
    add(eventObj) {
      console.log("Added event", eventObj);
      events = [...events, eventObj];
      localStorage.setItem("events", JSON.stringify(events));
    },
    getEvent(eventId) {
      return events.find(({ id }) => id === eventId);
    },
    editEvent(eventId, data) {
      console.log(`Edited event ${eventId}`);
      events = events.map((event) => {
        return event.id === eventId ? { ...event, ...data } : event;
      });
      localStorage.setItem("events", JSON.stringify(events));
    },
    deleteEvent(eventId) {
      console.log(`Deleted event ${eventId}`);
      events = events.filter(({ id }) => id !== eventId);
      localStorage.setItem("events", JSON.stringify(events));
    },
  };
})();

let selectedDateString;
let selectedEventId;

// Основная функция, в ней лежат все остальные
$(document).ready(function () {
  // инициализации календаря
  $("#calendar").evoCalendar({
    firstDayOfWeek: 1,
    todayHighlight: true,
    calendarEvents: eventsStore.getEvents().map(format),
    sidebarDisplayDefault: false,
    eventDisplayDefault: false,
  });

  selectedDateString = $("#calendar").evoCalendar("getActiveDate");

  // обновление переводов
  updateTranslations.all();

  /** функция которая изменяет режим формы добавления на редактирование */
  const formEdit = (data) => {
    const form = $(".event-form form");
    form[0].reset();
    form.data("edited", true);
    form.find("button[type=submit]").text("Сохранить");
    form.find("input, textarea, select").each(function () {
      const fieldName = this.name;
      data[fieldName] && $(this).val(data[fieldName]);
    });
    form.find("button.stopEdit").show();
    form.find("button.deleteEvent").show();
  };

  /** функция которая сбрасывает форму в начальный режим */
  const formReset = () => {
    const form = $(".event-form form");
    form[0].reset();
    form.data("edited", false);
    form.find("button[type=submit]").text("Добавить");
    form.find("button.stopEdit").hide();
    form.find("button.deleteEvent").hide();
    selectedEventId = null;
  };

  /** обработка нажатия на кнопку отмена (при редактировании) */
  $(document).on("click", "button.stopEdit", (e) => {
    e.preventDefault();
    formReset();
  });

  /** обработка нажатия на кнопку удалить */
  $(document).on("click", "button.deleteEvent", function (e) {
    e.preventDefault();
    $("#calendar").evoCalendar("removeCalendarEvent", selectedEventId);
    eventsStore.deleteEvent(selectedEventId);
    formReset();
  });

  /**
   * Обработка нажатия на кнопку сохранить или добавить
   */
  $(".event-form form").on("submit", function (e) {
    e.preventDefault();

    if ($(this).data("edited")) {
      $("#calendar").evoCalendar("removeCalendarEvent", selectedEventId);
      $("#calendar").evoCalendar(
        "addCalendarEvent",
        format({
          ...eventsStore.getEvent(selectedEventId),
          ...getFormData(e.currentTarget),
        })
      );
      eventsStore.editEvent(selectedEventId, getFormData(e.currentTarget));
      return formReset();
    }

    const defaultEventData = {
      id: ID(),
      date: selectedDateString,
      type: "event",
    };
    const newEvent = { ...defaultEventData, ...getFormData(e.currentTarget) };
    $("#calendar").evoCalendar("addCalendarEvent", format(newEvent));
    eventsStore.add(newEvent);
    formReset();
  });

  /**
   * Обработка нажатия на событие (в боковом правом меню)
   */
  $(document).on(
    "click",
    ".event-container",
    ({ currentTarget: eventContainer }) => {
      if ($(".event-form form").data("edited")) {
        return;
      }
      const { eventIndex: eventId } = eventContainer.dataset;
      selectedEventId = eventId;
      const event = eventsStore.getEvent(eventId);
      formEdit(event);
    }
  );

  /**
   * Нажатие на дату в календаре
   */
  $("#calendar").on("selectDate", (e, date) => {
    selectedDateString !== date && updateTranslations.eventHeader();
    selectedDateString = date;
    /** открытие правого бокового меню */
    $("#calendar").evoCalendar("toggleEventList", true);
  });

  /** Переводы */
  $("#calendar").on("selectMonth", updateTranslations.calendarTitle);
  $("#calendar").on("selectYear", updateTranslations.calendarTitle);

  /** Скрытие боковых меню при изменении масштабов окна */
  window.addEventListener("resize", () => {
    $("#calendar").evoCalendar("toggleSidebar", window.innerWidth >= 1300);
    $("#calendar").evoCalendar("toggleEventList", window.innerWidth >= 1300);
  });
});
