// set note / list selector to default at note
let noteListSelector = 1;
//grab universal elements from
let card = document.querySelectorAll('.card')
let footer = document.querySelector('#footer')


// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// note section
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// grasb elements
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


function buildCard(obj, noteList) {
    let div = document.createElement("div");
    div.className = 'card fade-in'
    noteDisplayArea.append(div);
    let h1 = document.createElement("h1");
    h1.className = 'headline'
    h1.innerText = obj.title;
    div.append(h1)

    if (noteList === 'note') {
        let textArea = document.createElement("div")
        textArea.className = 'note-details';
        textArea.innerText = obj.details;
        div.append(textArea)


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

    div.addEventListener('click', function () {

        modalEnergizer(obj)


    })

}
// this function refreshes the display of notes saved.
function refreshNoteDisplay() {
    console.log("refreshNoteDisplay", 'that is all');

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
        console.log(itemToPush.title, itemToPush.details)
        oneArrayNote.push(itemToPush)
    }
}

function setIDNum(arrayToSetFrom) {
    let idNum = arrayToSetFrom.length + 1

    if (arrayToSetFrom === oneArrayNote) {
        noteIdNum = idNum
        console.log('setIDNum', idNum)
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
    console.log('noteSaveButton clicked')
    saveAndPush('note', note)
    console.log(oneArrayNote)
    localStorage.setItem('oneArrayNote', JSON.stringify(oneArrayNote))
    console.log(JSON.parse(localStorage.getItem('oneArrayNote')));
    refreshNoteDisplay();
    console.log('');
    console.log('');
    console.log('');
    console.log('')
})

const modal = document.getElementById("modal-holder");
const closeButton = document.querySelector(".close-button");


function modalEnergizer(item) {
    console.log('item', item)


    console.log('modalEnergizer', item);

    let div = document.createElement('div');
    div.id = 'temp-modal-div';
    let h1 = document.createElement("h1");
    h1.id = 'h1-modal-temp'
    h1.innerText = item.title;
    let divcontent = document.createElement('div')
    divcontent.id = 'divcontent-modal-temp'
    divcontent.innerText = item.details
    let modalContent = document.querySelector('.modal-content')
    // console.log(modalContent)

    div.append(h1)
    div.append(divcontent)
    modalContent.append(div)
    toggleModal()
}

function editNote() {

}

function deEnergizeModal() {
    let tempModalDiv = document.getElementById('temp-modal-div');
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