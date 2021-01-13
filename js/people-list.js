const peopleList = [
    {
        idCount: 0,
        imgLink: '../img/avatar_2.png',
        name: 'Nome 0',
        email: 'email@email.com',
        phoneNumber: '(00) 0 0000 0000',
        location: 'Cidade - ES',
        type: 'delete'
    },

    {
        idCount: 1,
        imgLink: '../img/avatar_1.png',
        name: 'Nome 1',
        email: 'email@email.com',
        phoneNumber: '(00) 0 0000 0000',
        location: 'Cidade - ES',
        type: ''
    },

    {
        idCount: 2,
        imgLink: '../img/avatar_2.png',
        name: 'Nome 2',
        email: 'email@email.com',
        phoneNumber: '(00) 0 0000 0000',
        location: 'Cidade - ES',
        type: 'done'
    }
];

document.addEventListener("DOMContentLoaded", () => {
    loadPeopleList('');
});

let currentPageFilter = '';

function loadPeople(personType) {
    const peopleListContainer = document.getElementById("people-list-container");
    peopleListContainer.innerHTML = '';
    currentPageFilter = personType;
    loadPeopleList(personType);
}

function loadPeopleList(personType) {

    const peopleListContainer = document.getElementById("people-list-container");

    var filteredList = peopleList;
    if (personType !== '') {
        filteredList = peopleList.filter((person) =>
            person.type === personType
        );
    }

    for (let person of filteredList) {

        const newPerson = document.createElement('li');
        newPerson.className = "person";
        newPerson.id = "person" + person.idCount;

        const newPersonInfo = document.createElement('div');
        newPersonInfo.className = "person-info";
        newPersonInfo.id = "info" + person.idCount;

        newPerson.appendChild(newPersonInfo);

        peopleListContainer.appendChild(newPerson);

        loadAvatar(person);

        loadPersonInfo(person, "name");
        loadPersonInfo(person, "email");
        loadPersonInfo(person, "phoneNumber");
        loadPersonInfo(person, "location");

        loadIcons(person);

    }

}

function loadAvatar(person) {

    let newPersonInfo = document.getElementById('info' + person.idCount);

    let newPersonLink = document.createElement('a');
    newPersonLink.setAttribute("href", "path");

    let newPersonImg = document.createElement('img');
    newPersonImg.setAttribute("src", person.imgLink);

    newPersonLink.appendChild(newPersonImg);

    newPersonInfo.appendChild(newPersonLink);
}

function loadPersonInfo(person, key) {

    let newPersonInfo = document.getElementById('info' + person.idCount);

    let newPersonData = document.createElement('span');
    newPersonData.className = "person-" + key;
    newPersonData.id = key + person.idCount;
    newPersonData.innerText = person[key];

    newPersonInfo.appendChild(newPersonData);
}

function loadIcons(person) {

    let newPersonInfo = document.getElementById('info' + person.idCount);

    let newPersonIcons = document.createElement('div');
    newPersonIcons.className = "icons";
    newPersonIcons.id = "icons" + person.idCount;

    newPersonInfo.appendChild(newPersonIcons);

    loadButton(person, 'delete');
    loadButton(person, 'done');

}

function loadButton(person, personType) {

    let newPersonIcons = document.getElementById('icons' + person.idCount);

    let newPersonBtnLink = document.createElement('a');
    newPersonBtnLink.className = personType;
    newPersonBtnLink.setAttribute('href', '#');

    if (person.type === personType) {
        newPersonBtnLink.classList.toggle("toggledIcon");
    }

    newPersonBtnLink.onclick = () => { switchPersonType(person, personType); };

    let newPersonBtn = document.createElement('i');
    newPersonBtn.className = "material-icons";
    newPersonBtn.innerText = personType;

    newPersonBtnLink.appendChild(newPersonBtn);

    newPersonIcons.appendChild(newPersonBtnLink);

}

function switchPersonType(person, newType) {

    let currentPerson = document.getElementById("person" + person.idCount);
    if (currentPageFilter !== '') {
        currentPerson.parentNode.removeChild(currentPerson);
    } else {

        if (person.type === '') {
            currentPerson.getElementsByClassName(newType)[0].classList.toggle("toggledIcon");
        } else if (person.type !== newType) {
            currentPerson.getElementsByClassName("done")[0].classList.toggle("toggledIcon");
            currentPerson.getElementsByClassName("delete")[0].classList.toggle("toggledIcon");
        }
    }

    if (person.type !== newType) {
        person.type = newType;
    }

}