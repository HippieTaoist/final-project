// set note / list selector to default at note
// 0 - List  || 1- note
let noteListSelector = 0;
//grab universal elements from

let quoteAPIDiv = document.getElementById('quote-API-section');
let card = document.querySelectorAll('.card')
let switcherButton = document.getElementById('switcher');
let footer = document.querySelector('#footer')
let editSwitch = 'True'
let editObj




// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// note section
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// grab elements
let noteSection = document.getElementById('note-section')
let noteTitle = document.getElementById("note-title");
let noteDetails = document.getElementById("note-details");
let noteSaveButton = document.getElementById("note-save-button");
let noteDisplayArea = document.getElementById("display-notes")
// +++++++++++++++++++++++++++++++
// list section
// +++++++++++++++++++++++++++++++
let listSection = document.getElementById("list-section");
let listTitle = document.getElementById("list-title");
let listDetails = document.getElementById("list-details");
let saveListButton = document.getElementById('save-list-button');
let listDisplayArea = document.getElementById("display-lists");
let select = document.getElementById('list-selector')
let listItemsUL = document.getElementById('list-items-ul');
let listItemInput = document.getElementById('list-item-input');
let listInputButton = document.getElementById('save-list-item')

// setup test array
let makeNewList = {
    id: 1,
    title: 'New List For You',
    details: 'enter your new list item here',
    items: ['milk', 'cheese', 'butter']
}
let oneArrayNote
// Save Array (Add keywqords later?)
if (getFromLocalStorage('oneArrayNote') === null) {
    oneArrayNote = []
    console.log('its null')
} else {
    oneArrayNote = getFromLocalStorage('oneArrayNote')
}

oneArrayNote.forEach(obj => {
    console.log('obj.id', obj.id)
    if (obj.length === 0) {

        deleteNote(obj)
    }
})

// oneArrayNote = getFromLocalStorage('oneArrayNote')
console.log(oneArrayNote)

let oneArrayListTemp = getFromLocalStorage('oneArrayList')

console.log('oneArraList', oneArrayListTemp)

if (oneArrayListTemp === null) {
    oneArrayList = [];
} else {
    oneArrayList = oneArrayListTemp.filter(arrayFilter)
}

function arrayFilter(obj) {
    // console.log('arrayFilter', obj.id)
    if (obj.id !== undefined)
        return obj
}
// console.log('oneArraList', oneArrayList)
// Save Array (Add keywqords later?)
// if (getFromLocalStorage('oneArrayList') === null) {
//     oneArrayList = []
//     console.log('its null')
// } else {
//     oneArrayList = getFromLocalStorage('oneArrayList')
// }

// oneArrayList.forEach(obj => {
//     console.log('obj.id', oneArrayList.indexOf(obj), obj.id)
//     if (obj.id === undefined) {
//         oneArrayList.splice(oneArrayList.indexOf(obj), 1)
//         deleteList(obj)
//     }
// })


let listItems = []

// idNum
let noteIdNum = 1;
let listIdNum = 1;

// modal development
const modal = document.getElementById("modal-holder");
const closeButton = document.querySelector(".close-button");



// +++++++++++++++++++++++++++++++
// NOTE SECTION BELOW
// +++++++++++++++++++++++++++++++

// edit note in modal
function editNote(note) {
    editSwitch = 'True'
    if (noteListSelector === 0) {
        console.log(note.id)
        // associate internal text for when person edit note.
        editObj = oneArrayList[note.id - 1]
        console.log('editNote-editObj-oneArrayList', editObj)
    }


    if (noteListSelector === 1) {
        // associate internal text for when person edit note.
        editObj = oneArrayNote[note.id - 1]
        console.log('editNote-editObj-oneNoteArray', editObj)
    }

    let editStartTitleText = editObj.title
    let editStartDetailsText = editObj.details
    let editStartItems = editObj.items
    // console.log('editStart', editStartItems)
    let saveButton = document.getElementById('edit-div');
    let cancelButton = document.getElementById('delete-div');

    let modalDiv = document.getElementById('modal-div')
    let h1 = document.getElementById("h1-modal")
    let divContent = document.getElementById('divcontent-modal');
    let h1EditText = document.createElement('input');
    let divEditText = document.createElement('textarea');

    saveButton.innerText = 'SAVE';
    saveButton.className = 'save-confirm-buttons'

    cancelButton.innerText = 'CANCEL'
    cancelButton.className = 'save-confirm-buttons'

    h1.style.visibility = 'hidden'
    divContent.style.visibility = 'hidden';

    divEditText.id = 'edited-details'
    let editedDetails = document.getElementById('edited-details')
    // console.log('edited-details', editedDetails)
    h1EditText.value = editStartTitleText;

    // console.log('edited-details', editedDetails)



    // let additionalListItems = collectListItems(makeMoreListItems)
    // console.log('additionalListItems', additionalListItems)

    modalDiv.style.display = 'flex';
    modalDiv.style.flexDirection = 'column';



    divEditText.innerText = editStartDetailsText;
    // console.log('editStartDetailsText', editStartDetailsText)
    // console.log('editNote-divEditText', divEditText.innerText)
    if (noteListSelector === 0) {

        let makeMoreListItem = document.createElement('textarea')
        makeMoreListItem.id = 'item-maker'

        let makeMoreListItemArea = document.getElementById('item-maker')

        divEditText.append(makeMoreListItemArea)

        editStartItems.forEach(item => {
            let listItemInput = document.createElement('input')
            listItemInput.className = 'list-item-input'
            listItemInput.value = item;
            modalDiv.prepend(listItemInput)
        })
    }






    // console.log('editStartDetailsText', editStartDetailsText)
    // console.log('editNote-divEditText', divEditText.innerText)
    let randomText = divEditText.innerText
    console.log('randomText', randomText)

    saveButton.addEventListener('click', function () {
        if (editSwitch === 'True') {
            editObj.title = h1EditText.value
            console.log('editNote-divEditText', divEditText.innerText)

            editObj.details = randomText;
            console.log('editNote-saveButton-editOBJ', editObj)
            if (noteListSelector === 0) {
                oneArrayNote[note.id - 1] = editObj
            }
            if (noteListSelector === 1) {
                let itemInputs = document.querySelectorAll('.list-item-input')
                editObj.items = []
                itemInputs.forEach(item => {
                    if (item.value !== "") {
                        console.log('itemInputs', item.value)
                        editObj.items.push(item.value)
                    }
                })
                console.log('editObj', editObj.items, 'noteid', [note.id - 1])
                oneArrayList.splice([note.id - 1], 1)
                oneArrayList.splice([note.id - 1], 0, editObj)
                console.log('oneArrayList', oneArrayList)
                // oneArrayList.push(editObj)
            }
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

    modalDiv.prepend(divEditText)

    modalDiv.prepend(h1EditText)

}

function collectListItems(textArea) {
    return textArea.split('\n')
}

// delete note from array
function deleteNote(note) {
    console.log('deleteNote', note, [note.id - 1])
    oneArrayNote.splice([note.id - 1], 1)
    console.log('deleteNote-onearray', oneArrayNote[note.id - 1])
    localStorage.removeItem('oneArrayNote', oneArrayNote[note.id - 1]);
    deEnergizeModal();
    refreshNoteDisplay()
}


function deleteList(list) {
    console.log('deleteList', list)
    oneArrayList.splice([list.id - 1], 1)
    localStorage.removeItem('oneArrayList', oneArrayList[list.id - 1]);
    deEnergizeModal();
    refreshNoteDisplay()
}







// +++++++++++++++++++++++++++++++
// LIST SECTION BELOW
// +++++++++++++++++++++++++++++++
function selectList(optionValue) {
    listItemsUL.innerHTML = '';
    let selectedList = oneArrayList[optionValue]
    // console.log(selectedList)

    listTitle.value = selectedList.title;
    listDetails.innerText = selectedList.details
    listItems = selectedList.items;
    console.log('listItems', listItems)
    listItems.forEach(listItem => {
        console.log('selectList', listItem)
        let li = document.createElement('li');
        listItemsUL.append(li);
    })

    refreshNoteDisplay()

}

function dynamicDropdownList() {


    let initialOption = document.createElement('option');
    initialOption.className = 'option-new-list'
    initialOption.value = 0;
    initialOption.innerText = 'Setup New List Below';
    // console.log('initialOption', initialOption);
    select.innerHTML = '' // select.onchange = 'selectList()';
    // listSection.append(select);
    select.prepend(initialOption)

    // build dropdownlist
    oneArrayList.forEach((list, index) => {
        let option = document.createElement('option');
        // console.log('list.title', list.title);
        // console.log('option', option);
        option.value = index;
        option.innerText = list.title
        option.details = list.details
        option.items = list.items
        // console.log('list', list)
        select.append(option)
    })
}



// +++++++++++++++++++++++++++++++
// UNIVERSAL SECTION BELOW
// +++++++++++++++++++++++++++++++

// build cards to display in area
function buildCard(obj, noteList) {


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

        // setup reference for index

        obj.items.forEach(item => {
            if (item.length > 0) {
                let li = document.createElement("li");
                li.className = 'list-item';
                li.innerText = item;
                ul.append(li)
            }


        })
        let h1 = document.createElement("h1");
        h1.className = 'headline'
        h1.innerText = obj.title;
        card.append(h1)


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

    // console.log('oneArrayList', oneArrayList)
    oneArrayList.forEach(listem => {
        buildCard(listem, 'list')
    })

}
// refresh display area for notes and lists
function saveAndPush(style, itemToPush) {
    if (style === 'note') {
        itemToPush.id = setIDNum(oneArrayNote)
        itemToPush.title = noteTitle.value;
        itemToPush.details = noteDetails.value
        itemToPush.style = 'note'
        // console.log(itemToPush.title, itemToPush.details)
        oneArrayNote.push(itemToPush)
        return itemToPush;
    }

    if (style === 'list') {
        itemToPush.id = setIDNum(oneArrayList)
        itemToPush.title = listTitle.value;
        itemToPush.details = listDetails.value
        if (itemToPush.items.length === 0) {
            itemToPush.items = [];
        }
        itemToPush.style = 'list'
        // console.log(itemToPush.title, itemToPush.details)
        oneArrayList.push(itemToPush)
        saveToLocalStorage(oneArrayList)
        // console.log("oneArrayList", oneArrayList)

    }
}
// setID numbers for the objects.
function setIDNum(arrayToSetFrom) {
    let idNum = arrayToSetFrom.length + 1

    if (arrayToSetFrom === oneArrayNote) {
        noteIdNum = idNum
        // console.log('setIDNum', idNum)
        return noteIdNum;
    }
    if (arrayToSetFrom === oneArrayList) {
        listIdNum = idNum
        return listIdNum;
    }
}
// seitch visible aspect of app
function switcher() {
    // console.log('switch hit')

    if (noteSection.style.display === "flex") {
        noteSection.style.display = "none";
        listSection.style.display = "flex";
        noteDisplayArea.style.display = "none";
        listDisplayArea.style.display = "flex";
        refreshNoteDisplay()
        noteListSelector = 0;
        switcherButton.innerText = 'Click For Notes'
        switcherButton.style.backgroundColor = 'purple';
    } else {
        noteSection.style.display = "flex";
        listSection.style.display = "none";
        noteDisplayArea.style.display = "flex";
        listDisplayArea.style.display = "none";
        refreshNoteDisplay()
        noteListSelector = 1;
        switcherButton.innerText = 'Click For Lists'
        switcherButton.style.backgroundColor = 'green';
    }


}



// +++++++++++++++++++++++++++++++
// MODAL SECTION BELOW
// +++++++++++++++++++++++++++++++

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

    console.log('editNote Clicked', item)

    // add event listeners to buttons
    // call apporpriate fuction per listener
    // Send item for editing - secondary half of function
    editDiv.addEventListener('click', function () {
        if (editSwitch === 'False') {
            editNote(item)
        }
    })

    deleteDiv.addEventListener('click', function () {
        if (editSwitch === 'False') {
            if (noteListSelector === 1) {
                deleteNote(item)
            }
            if (noteListSelector === 0) {
                deleteList(item)
            }

        }


    })




    toggleModal()
}

//  deenergize modal and strip divs
function deEnergizeModal() {
    let tempModalDiv = document.getElementById('modal-div');
    tempModalDiv.remove()
    // modal.innerHTML = '<div class = "modal-content"><span class="close-button">×</span></div>'
    toggleModal()
}
// close modal
function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}
//  close modal
function toggleModal() {
    modal.classList.toggle('show-modal')
}


// +++++++++++++++++++++++++++++++
// ACTION!!
// noteSection.style.display === "none"
// save elements to oneArrayNote when button clicked
noteSaveButton.addEventListener('click', function () {
    let note = {}
    // console.log('noteSaveButton clicked')
    note = saveAndPush('note', note)
    console.log("oneArrayNote", oneArrayNote)
    saveToLocalStorage(oneArrayNote);

    refreshNoteDisplay();
    console.log('');
    console.log('');

})
// save and add item to oneArrayList
saveListButton.addEventListener('click', function () {
    let list = {};
    let listItems = document.querySelectorAll('li.clicklist');
    console.log(listItems)
    list.items = []
    listItems.forEach(item => {

        list.items.push(item.innerText)

    })



    saveAndPush("list", list);
    dynamicDropdownList()
    refreshNoteDisplay();
})
// activate deenergize modal when close clicked
closeButton.addEventListener('click', deEnergizeModal);
// watch for the switch
switcherButton.addEventListener('click', switcher);
// popluatedropdownlist
select.addEventListener('click',
    dynamicDropdownList())

listInputButton.addEventListener('click', function () {
    let li = document.createElement('li')
    li.className = 'clicklist'
    li.innerText = listItemInput.value

    listItemsUL.append(li)


})


// refresh display area
refreshNoteDisplay();

switcher();



// window.addEventListener('click', toggleModal);




function saveToLocalStorage(arrayToSave) {
    if (arrayToSave === oneArrayNote) {
        localStorage.setItem('oneArrayNote', JSON.stringify(arrayToSave));
    }
    if (arrayToSave === oneArrayList) {
        localStorage.setItem('oneArrayList', JSON.stringify(arrayToSave));
    }

}


function getFromLocalStorage(arrayName) {
    // editObj
    let tempObj = localStorage.getItem(arrayName)
    console.log('JSON Parse', JSON.parse(tempObj));
    return JSON.parse(tempObj);

}

function removeFromLocalStorage(arrayToRemove, index) {
    if (arrayToRemove === oneArrayNote) {
        localStorage.removeItem('oneArrayNote', );
    }
    if (arrayToRemove === oneArrayList) {
        localStorage.setItem('oneArrayList', JSON.stringify(arrayToSave));
    }

}
// save elements to oneArrayList when button clicked