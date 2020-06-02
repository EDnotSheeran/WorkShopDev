function toggleHide(element) {
    document
        .querySelector(element)
        .classList
        .toggle('hide')
    document
        .querySelector('body')
        .classList
        .toggle('hidescroll')
    document
        .querySelector('#modal')
        .classList
        .toggle('showscroll')
}