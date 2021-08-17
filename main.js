// set note / list selector to default at note
let noteListSelector = 1;
//grab universal elements from
let card = document.querySelectorAll('.card')
let footer = document.querySelector('#footer')


// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// note section
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// grab elements
let noteTitle = document.getElementById("note-title");
let noteDetails = document.getElementById("note-details");
let noteSaveButton = document.getElementById("note-save-button");
let noteDisplayArea = document.getElementById("display-notes")

// Save Array (Add keywqords later?)
let oneArrayNote = [];
let oneArrayList = [];

// idNum
let noteIdNum = 1;
let listIdNum = 1;

function editNote(note) {
    // associate internal text for when person edit note.
    let editStartTitleText = oneArrayNote[note.id - 1].title
    let editStartDetailsText = oneArrayNote[note.id - 1].details
    console.log('editStartText', editStartTitleText, editStartDetailsText)

    // let modalDiv = document.getElementById('modal-div')
    // console.log('')

    let h1 = document.getElementById("h1-modal")
    let divContent = document.getElementById('divcontent-modal');
    let h1EditText = document.createElement('input');
    let divEditText = document.createElement('textarea');

    h1EditText.value = editStartTitleText;
    console.log('h1EditText', h1EditText)

    divEditText.innerText = editStartDetailsText;
    console.log('divEditText', divEditText.innerText)

    h1.innerHTML = `<input value='${editStartTitleText}'/>`
    divContent.innerHTML = `<textarea >${editStartDetailsText}</textarea>`;

    let modalContent = document.querySelector('.modal-content')
    // console.log(modalContent)





}

function deleteNote(note) {
    console.log('deleteNote', note)
    oneArrayNote.splice([note.id - 1], 1)
    deEnergizeModal()
    refreshNoteDisplay()
}




function buildCard(obj, noteList) {
    let card = document.createElement("div");
    card.className = 'card fade-in'
    noteDisplayArea.append(card);
    let h1 = document.createElement("h1");
    h1.className = 'headline'
    h1.innerText = obj.title;
    card.append(h1)

    if (noteList === 'note') {
        let textArea = document.createElement("div")
        textArea.className = 'note-details';
        textArea.innerText = obj.details;
        card.append(textArea)


    }
    if (noteList === 'list') {
        if (noteList === 'list') {
            // define and class ul items to be created
            let ul = document.createElement("ul");
            ul.className = 'list';

            // create, class and populate ol list items
            let ol = document.createElement("ol");
            ol.className = 'list-item';
            ol.innerText = obj.details;
            ul.append(ol)
            div.append(ul)
        }

    }

    card.addEventListener('click', function () {

        modalEnergizer(obj)


    })

}
// this function refreshes the display of notes saved.
function refreshNoteDisplay() {
    // console.log("refreshNoteDisplay", 'that is all');

    // clear Note divs
    noteDisplayArea.textContent = '';

    oneArrayNote.forEach(notem => {
        buildCard(notem, 'note')

    })

}

function saveAndPush(style, itemToPush) {
    if (style === 'note') {
        itemToPush.id = setIDNum(oneArrayNote)
        itemToPush.title = noteTitle.value;
        itemToPush.details = noteDetails.value
        // console.log(itemToPush.title, itemToPush.details)
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

refreshNoteDisplay()

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

    editDeleteDiv.append(editDiv);
    editDeleteDiv.append(deleteDiv);
    modalDiv.append(editDeleteDiv)

    // add event listeners to buttons
    // call apporpriate fuction per listener
    // Send item for editing
    editDiv.addEventListener('click', function () {

        editNote(item)
    })

    deleteDiv.addEventListener('click', function () {

        deleteNote(item)
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