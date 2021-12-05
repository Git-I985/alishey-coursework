/**
 * В этом файле лежает вспомогательные функции
 */

/**
 * Функция генерации уникального ID
 */
const ID = () => Math.random().toString(36).substr(2, 9);

/**
 * Функция которая обрабатывает содержимое ивента при редактировании и добавлении
 * с её помощью реализован функционал тегов и описания
 */
const format = (eventObj) => {
  const objCopy = { ...eventObj };

  if (objCopy.description) {
    objCopy.description = objCopy.description.replaceAll("\n", "<br/>");
  }

  if (objCopy?.tags?.length) {
    const formattedTags = objCopy.tags
      .split(",")
      .map((tag) => tag.trim())
      .map((tag) => `<a class="tag-link" href="">${tag}</a>`)
      .join("");
    objCopy.description += "<br><br>" + formattedTags;
  }

  return objCopy;
};

/** функция получения анных HTML формы в виде JavaScript объекта (сериализация) */
const getFormData = (form) =>
  Array.from(new FormData(form)).reduce(
    (acc, [field, value]) => ({ ...acc, [field]: value }),
    {}
  );
