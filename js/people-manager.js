const peopleList = [
    {
        idCount: 0,
        imgLink: '../img/avatar_2.png',
        name: 'Shirley Savage',
        email: 'shirley@savage.com',
        number: '(00) 0 0000 0000',
        location: 'Cidade - ES',
        birthday: '00-00-0000',
        password: '123456',
        type: 'delete'
    },

    {
        idCount: 1,
        imgLink: '../img/avatar_1.png',
        name: 'Clifford Fitzgerald',
        email: 'clifford@fitzgeral.com',
        number: '(00) 0 0000 0000',
        location: 'Cidade - ES',
        birthday: '00-00-0000',
        password: '123456',
        type: ''
    },

    {
        idCount: 2,
        imgLink: '../img/avatar_2.png',
        name: 'Victoria Wise',
        email: 'victoria@wise.com',
        number: '(00) 0 0000 0000',
        location: 'Cidade - ES',
        birthday: '00-00-0000',
        password: '123456',
        type: 'done'
    }
];

const descriptionList = [
    {
        key: "name",
        value: "Hi, my name is"
    },

    {
        key: "email",
        value: "My e-mail address is"
    },

    {
        key: "birthday",
        value: "My birthday is"
    },

    {
        key: "location",
        value: "My address is"
    },

    {
        key: "number",
        value: "My phone number is"
    },

    {
        key: "password",
        value: "My password is"
    }
];

document.addEventListener("DOMContentLoaded", () => {
    loadPeopleList('');
});

let currentPageFilter = '';

function loadPeople(personType, list) {
    const peopleListContainer = document.getElementById("people-list-container");
    peopleListContainer.innerHTML = '';

    currentPageFilter = personType;
    loadPeopleList(personType, list);

}

function loadPeopleList(personType, list) {

    if (list == undefined) {
        list = peopleList;
    }

    const peopleListContainer = document.getElementById("people-list-container");

    var filteredList = list;
    if (personType !== '') {
        filteredList = list.filter((person) =>
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
        loadPersonInfo(person, "number");
        loadPersonInfo(person, "location");

        loadIcons(person);

    }

}

function loadAvatar(person) {

    let newPersonInfo = document.getElementById('info' + person.idCount);

    let newPersonLink = document.createElement('a');
    newPersonLink.onclick = () => { toggleModal(person); };

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

    if (person.type === newType) {
        return;
    }

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

    person.type = newType;

}

function toggleModal(person) {

    // turns modal on or off

    let modalContainer = document.getElementById("modal-parent");

    let display = modalContainer.style.display.includes("none") ? "flex" : "none";

    modalContainer.setAttribute("style", "display: " + display);

    // person info

    if (person !== undefined) {

        loadModalPersonInfo(person, "name");
        loadModalPersonInfo(person, "email");
        loadModalPersonInfo(person, "birthday");
        loadModalPersonInfo(person, "location");
        loadModalPersonInfo(person, "number");
        loadModalPersonInfo(person, "password");

        let modalPersonImg = document.getElementById("modal-person-img");

        modalPersonImg.setAttribute("src", person["imgLink"]);

        let modalPersonInfo = document.getElementsByClassName("modal-person-info")[0];
        modalPersonInfo.innerText = person["name"];

        let modalPersonDescription = document.getElementsByClassName("modal-person-description")[0];
        modalPersonDescription.innerText = getDescription("name");

    }

}

function loadModalPersonInfo(person, key) {

    let modalPerson = document.getElementById('modal-person-' + key);

    modalPerson.setAttribute("value", person[key]);

}

function showInfoOnHover(modalPersonSpan) {

    let modalPersonInfo = document.getElementsByClassName("modal-person-info")[0];
    modalPersonInfo.innerText = modalPersonSpan.getAttribute("value");

    let modalPersonDescription = document.getElementsByClassName("modal-person-description")[0];
    modalPersonDescription.innerText = getDescription(modalPersonSpan.id);
}

function getDescription(id) {

    let descriptionFilter = '';

    descriptionList.forEach((description) => {

        if (id.includes(description["key"])) {
            descriptionFilter = description["value"];
        }

    });

    return descriptionFilter;
}

function filterByInfo(input) {

    console.log(input.value);

    let filteredList = peopleList.filter((person) => {

        return person["name"].toUpperCase().includes(input.value.toUpperCase())
            || person["email"].toUpperCase().includes(input.value.toUpperCase());
    });

    loadPeople(currentPageFilter, filteredList);

}
