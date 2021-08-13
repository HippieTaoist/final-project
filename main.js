// set note / list selector to default at note
let noteListSelector = 1;

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


// save elements to oneArrayList when button clicked