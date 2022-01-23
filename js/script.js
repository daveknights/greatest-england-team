const getElement = element => document.getElementById(element);
const errorMessage = getElement('error-message');
const errorPanel = getElement('error');

const tooManyPlayers = () => document.getElementsByClassName('outfield-player').length;

const setErrorMessage = error => {
    errorMessage.textContent = `You already have the maximum number of ${error} allowed`;
    errorPanel.classList.add('show');
};

const deletePlayer = e => {
    const target = e.target;
    const id = target.parentNode.dataset.id;

    if (target.classList.contains('delete')) {
        target.parentElement.remove();
    }

    const matchingIds = document.querySelectorAll(`[data-id="${id}"]`);
    [...matchingIds].forEach(item => {
        item.classList.remove('chosen', 'disable');
    });
};

const init = () => {
    new Sortable(getElement('gk-list'), {
        animation: 150,
        filter: '.disable',
        group: {
            name: 'goalies',
            pull: 'clone',
            put: false,
        },
        sort: false
    });
    new Sortable(getElement('gk-area'), {
        animation: 150,
        group: {
            name: 'goalies',
            put: function (e) {
                if (e.el.children.length < 1) {
                    errorPanel.classList.remove('show');
                    return 'goalies';
                } else {
                    setErrorMessage('goalkeepers');
                    return false;
                }
            }
        },
        onAdd: function (e) {
            e.clone.classList.add('chosen', 'disable');
        }
    });

    new Sortable(getElement('def-list'), {
        animation: 150,
        filter: '.disable',
        group: {
            name: 'defenders',
            pull: 'clone',
            put: false
        },
        sort: false
    });
    new Sortable(getElement('def-area'), {
        animation: 150,
        group: {
            name: 'defenders',
            put: function (e) {
                const defenders = e.el.children.length;
                const outfieldPlayers = tooManyPlayers();

                if (defenders < 5 && outfieldPlayers < 10) {
                    errorPanel.classList.remove('show');
                    return 'defenders';
                } else {
                    const category = defenders === 5 ? 'defenders' : 'players';
                    setErrorMessage(category);
                    return false;
                }
            }
        },
        onAdd: function (e) {
            e.item.classList.add('outfield-player');
            e.clone.classList.add('chosen', 'disable');
        }
    });

    Sortable.create(getElement('mid-list'), {
        animation: 150,
        filter: '.disable',
        group: {
            name: 'attackers',
            pull: 'clone',
            put: false
        },
        sort: false
    });
    Sortable.create(getElement('mid-area'), {
        animation: 150,
        group: {
            name: 'attackers',
            put: function (e) {
                const defenders = e.el.children.length;
                const outfieldPlayers = tooManyPlayers();

                if (defenders < 5 && outfieldPlayers < 10) {
                    errorPanel.classList.remove('show');
                    return 'attackers';
                } else {
                    const category = defenders === 5 ? 'midfielders' : 'players';
                    setErrorMessage(category);
                    return false;
                }
            }
        },
        onAdd: function (e) {
            e.item.classList.add('outfield-player');
            e.clone.classList.add('chosen', 'disable');
        }
    });

    Sortable.create(getElement('strike-list'), {
        animation: 150,
        filter: '.disable',
        group: {
            name: 'attackers',
            pull: 'clone',
            put: false
        },
        sort: false
    });
    Sortable.create(getElement('strike-area'), {
        animation: 150,
        group: {
            name: 'attackers',
            put: function (e) {
                const defenders = e.el.children.length;
                const outfieldPlayers = tooManyPlayers();

                if (defenders < 3 && outfieldPlayers < 10) {
                    errorPanel.classList.remove('show');
                    return 'attackers';
                } else {
                    const category = defenders === 3 ? 'strikers' : 'players';
                    setErrorMessage(category);
                    return false;
                }
            }
        },
        onAdd: function (e) {
            e.item.classList.add('outfield-player');
            e.clone.classList.add('chosen', 'disable');
        }
    });

    [...document.querySelectorAll('.pitch')].forEach(item => item.addEventListener('click', deletePlayer));
};

window.addEventListener('load', init);
