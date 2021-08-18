// set note / list selector to default at note
let noteListSelector = 1;
//grab universal elements from
let card = document.querySelectorAll('.card')
let footer = document.querySelector('#footer')

let editSwitch = 'True'
let editObj




// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// note section
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// grab elements
let noteTitle = document.getElementById("note-title");
let noteDetails = document.getElementById("note-details");
let noteSaveButton = document.getElementById("note-save-button");
let noteDisplayArea = document.getElementById("display-notes")
// +++++++++++++++++++++++++++++++
// list section
// +++++++++++++++++++++++++++++++
let listSection = document.getElementById("list-section");
let listTitle = document.getElementById("list-title");
let listSaveButton = document.getElementById("list-save")
let listDisplayArea = document.getElementById("display-lists")

let makeNewList = {
    title: 'New List For You',
    details: 'enter your new list item here',
    items: ['milk', 'cheese', 'butter']
}

console.log(makeNewList.title);

// Save Array (Add keywqords later?)
let oneArrayNote = [];
let oneArrayList = [makeNewList];

// idNum
let noteIdNum = 1;
let listIdNum = 1;

function selectList(optionValue) {
    console.log('optionValue', optionValue);

}

function dynamicDropdownList(oneArrayList) {

    let select = document.getElementById('list-selector')
    let initialOption = document.getElementById('option-new-list');
    // console.log('initialOption', initialOption);
    // select.id = 'list-selector';
    // select.onchange = 'selectList()';
    // listSection.append(select);

    oneArrayList.forEach(list => {
        let option = document.createElement('option');
        console.log('list.title', list.title);
        option.innerText = list.title
        option.details = list.details
        console.log('list', list)
        select.append(option)
    })
}

// edit note in modal
function editNote(note) {
    editSwitch = 'True'
    // associate internal text for when person edit note.
    editObj = oneArrayNote[note.id - 1]
    console.log(editObj)
    let editStartTitleText = editObj.title
    let editStartDetailsText = editObj.details
    console.log('editStartText', editStartTitleText, editStartDetailsText, editObj)

    // let modalDiv = document.getElementById('modal-div')
    // console.log('')

    let saveButton = document.getElementById('edit-div');
    let cancelButton = document.getElementById('delete-div');
    saveButton.innerText = 'SAVE';
    saveButton.className = 'save-confirm-buttons'


    cancelButton.innerText = 'CANCEL'
    cancelButton.className = 'save-confirm-buttons'

    let modalDiv = document.getElementById('modal-div')
    let h1 = document.getElementById("h1-modal")
    let divContent = document.getElementById('divcontent-modal');
    let h1EditText = document.createElement('input');
    let divEditText = document.createElement('textarea');
    divEditText.className = 'edited-details'

    h1EditText.value = editStartTitleText;
    console.log('h1EditText', h1EditText.value)

    divEditText.innerText = editStartDetailsText;

    console.log('divEditText', divEditText.innerText)

    h1.style.visibility = 'hidden'
    // h1.innerHTML = `<input value='${editStartTitleText}'/>`
    divContent.style.visibility = 'hidden';
    // divContent.innerHTML = `<textarea id='edited-details'>${editStartDetailsText}</textarea>`;
    modalDiv.style.display = 'flex';
    modalDiv.style.flexDirection = 'column';
    modalDiv.prepend(divEditText)

    modalDiv.prepend(h1EditText)


    let editedDetails = document.querySelector('.edited-details')
    console.log('editedDetails', editedDetails)



    saveButton.addEventListener('click', function () {
        if (editSwitch === 'True') {

            editObj.title = h1EditText.value
            console.log('editedDetails', editedDetails.value)
            editObj.details = editedDetails.value;
            console.log('editOBJ', editObj)
            oneArrayNote[note.id - 1] = editObj
            modalDiv.remove(divEditText);
            h1EditText.remove()
            refreshNoteDisplay()
            toggleModal()
        }
    })
    cancelButton.addEventListener('click', function () {
        if (editSwitch === 'True') {
            deEnergizeModal()
        }
    })

}

// refresh display area
refreshNoteDisplay();

// delete note from array
function deleteNote(note) {
    console.log('deleteNote', note)
    oneArrayNote.splice([note.id - 1], 1)
    deEnergizeModal()
    refreshNoteDisplay()
}



// build cards to display in area
function buildCard(obj, noteList) {

    console.log('notelist', noteList)
    if (noteList === 'note') {
        let card = document.createElement("div");
        card.className = 'card fade-in'
        noteDisplayArea.append(card);
        let h1 = document.createElement("h1");
        h1.className = 'headline'
        h1.innerText = obj.title;
        card.append(h1)
        let textArea = document.createElement("div")
        textArea.className = 'note-details';
        textArea.innerText = obj.details;
        card.append(textArea)
        card.addEventListener('click', function () {

            modalEnergizer(obj)


        })

    }
    if (noteList === 'list') {
        let card = document.createElement("div");
        card.className = 'card fade-in';
        listDisplayArea.append(card);
        // define and class ul items to be created
        let ul = document.createElement("ul");
        ul.className = 'list';
        card.append(ul)
        // create, class and populate ol list items
        console.log('obj', obj)
        // setup reference for index
        console.log('items', obj.items)
        obj.items.forEach(item => {
            let li = document.createElement("li");
            li.className = 'list-item';
            li.innerText = item;
            ul.append(li)

        })


        // card.append(div)

        card.addEventListener('click', function () {

            modalEnergizer(obj)


        })
    }

    // card.addEventListener('click', function () {

    //     modalEnergizer(obj)


    // })

}
// this function refreshes the display of notes saved.
function refreshNoteDisplay() {

    // clear Note divs
    noteDisplayArea.textContent = '';

    // clear list divs
    listDisplayArea.textContent = '';

    oneArrayNote.forEach(notem => {
        buildCard(notem, 'note')

    })

    console.log('oneArrayList', oneArrayList)
    oneArrayList.forEach(listem => {
        buildCard(listem, 'list')
    })

    dynamicDropdownList(oneArrayList)

}

function saveAndPush(style, itemToPush) {
    if (style === 'note') {
        itemToPush.id = setIDNum(oneArrayNote)
        itemToPush.title = noteTitle.value;
        itemToPush.details = noteDetails.value
        console.log(itemToPush.title, itemToPush.details)
        oneArrayNote.push(itemToPush)
    }

    if (style === 'list') {
        itemToPush.id = setIDNum(oneArrayList)
        itemToPush.title = listTitle.value;
        itemToPush.details = listDetails.value
        console.log(itemToPush.title, itemToPush.details)
        oneArrayNote.push(itemToPush)
    }
}

function setIDNum(arrayToSetFrom) {
    let idNum = arrayToSetFrom.length + 1

    if (arrayToSetFrom === oneArrayNote) {
        noteIdNum = idNum
        // console.log('setIDNum', idNum)
        return noteIdNum;
    }
    if (arrayToSetFrom === oneArrayList) {
        listIdNum = idNum
    }
}

// save elements to oneArrayNote when button clicked
noteSaveButton.addEventListener('click', function () {
    let note = []
    // console.log('noteSaveButton clicked')
    saveAndPush('note', note)
    // console.log(oneArrayNote)
    localStorage.setItem('oneArrayNote', JSON.stringify(oneArrayNote))
    // console.log(JSON.parse(localStorage.getItem('oneArrayNote')));
    refreshNoteDisplay();
    console.log('');
    console.log('');

})

// modal development
const modal = document.getElementById("modal-holder");
const closeButton = document.querySelector(".close-button");

// bring modal to the front
function modalEnergizer(item) {
    editSwitch = 'False'
    // console.log('item', item)
    let divModal = document.createElement('div')
    divModal.id = 'modal-div';
    let divH1 = document.createElement('h1')
    divH1.id = 'h1-modal'
    let divCon = document.createElement('div')
    divCon.id = 'divcontent-modal'
    let modalContent = document.querySelector('.modal-content')


    divModal.append(divH1)
    divModal.append(divCon)
    modalContent.append(divModal)


    let itemID = item.id

    // bring in and display note selected
    let modalDiv = document.getElementById('modal-div');
    let h1 = document.getElementById('h1-modal');
    let divcontent = document.getElementById('divcontent-modal')

    h1.innerText = item.title;
    divcontent.innerText = item.details


    // create and call - edit / delete div
    let editDeleteDiv = document.createElement('div');
    editDeleteDiv.id = 'edit-delete-div';
    editDeleteDiv.className = 'edit-delete-buttons'

    // call create edit button
    let editDiv = document.createElement('button');
    editDiv.className = 'edit-delete-buttons'
    editDiv.id = 'edit-div';
    editDiv.innerText = 'EDIT'

    // call create delete button
    let deleteDiv = document.createElement('button');
    deleteDiv.className = 'edit-delete-buttons';
    deleteDiv.id = 'delete-div';
    deleteDiv.innerText = 'DELETE'

    editDeleteDiv.append(editDiv);
    editDeleteDiv.append(deleteDiv);
    modalDiv.append(editDeleteDiv)

    // add event listeners to buttons
    // call apporpriate fuction per listener
    // Send item for editing
    editDiv.addEventListener('click', function () {
        if (editSwitch === 'False') {
            editNote(item)
        }

    })

    deleteDiv.addEventListener('click', function () {
        if (editSwitch === 'False') {
            deleteNote(item)

        }


    })




    toggleModal()
}



function deEnergizeModal() {
    let tempModalDiv = document.getElementById('modal-div');
    tempModalDiv.remove()
    // modal.innerHTML = '<div class = "modal-content"><span class="close-button">×</span></div>'
    toggleModal()

}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

function toggleModal() {
    modal.classList.toggle('show-modal')
}

closeButton.addEventListener('click', deEnergizeModal);

// window.addEventListener('click', toggleModal);

// save elements to oneArrayList when button clicked