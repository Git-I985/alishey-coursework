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

const getFormData = (form) => Array
    .from(new FormData(form))
    .reduce((acc, [ field, value ]) => ({ ...acc, [field]: value }), {})