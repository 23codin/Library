
const myLibrary = []

function book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = () =>  (`${title} by ${author}, ${pages} pages, ${readInfo()} `) 
    function readInfo () {
        if (read == 'no') {return "not read yet"}
        else {"has read"}
    }
}

let hobbitBook = new book('The Hobbit', 'J.R.R. Tolkien', '200', 'Read' )

let sunsetBook = new book("Sunset", "Joe Tails", "220", "Not Read")

function addBookToLibrary(book) {
myLibrary.push(book)
}

addBookToLibrary(hobbitBook)
addBookToLibrary(sunsetBook)

let libraryTable = document.querySelector('.libraryTable')
let tableBody = document.querySelector('.tableBody')

function removeButton(e) {
    const bookItems = document.querySelectorAll(".book")
    let thisPosition = e.target.dataset.arrayPosition
    myLibrary.splice(thisPosition, 1)
    tableBody.textContent=''
    showLibrary()
        }

function readChange (e) {
    const bookItems = document.querySelectorAll(".book")
    let thisPosition = e.target.dataset.arrayPosition
    let readStatus = myLibrary[thisPosition].read
    if (readStatus === "Read") {
        myLibrary[thisPosition].read = "Not Read"
    }
    else {
        myLibrary[thisPosition].read = "Read"
    }
    tableBody.textContent=''
    showLibrary()
}

function showLibrary() {
    for (let i = 0; i < myLibrary.length; i++) {
        let newRow = document.createElement('tr')
        for(let int = 1 ; int < 7 ; int++){
            let newCell = document.createElement('td')
            newCell.classList.add(`row${i}`)
            newRow.appendChild(newCell)
        }
        const newButton = document.createElement('button')
        newButton.textContent= "REMOVE"
        newButton.dataset.arrayPosition = [i]
        newButton.classList.add('removeBttn')

        const readButton = document.createElement('button')
        readButton.classList.add('readButton')
        readButton.textContent = "READ STATUS"
        readButton.dataset.arrayPosition = [i]

        tableBody.appendChild(newRow)
        let rowSelect = document.querySelectorAll(`.row${i}`)
        rowSelect[0].appendChild(readButton)
        rowSelect[1].textContent = `${myLibrary[i].title}`
        rowSelect[2].textContent = `${myLibrary[i].author}`
        rowSelect[3].textContent= `${myLibrary[i].pages}`
        rowSelect[4].textContent= `${myLibrary[i].read}`
        rowSelect[5].appendChild(newButton)


        let divItem = document.createElement('div')
        divItem.classList.add('book')
        newRow.dataset.arrayPosition = [i]
        let removeBttn = document.querySelectorAll('.removeBttn')
        removeBttn.forEach(btn=> { btn.addEventListener('click', removeButton)})
        let readBttn = document.querySelectorAll('.readButton')
        readBttn.forEach(btn=> {btn.addEventListener('click', readChange)})
    }

}

const dialog = document.getElementById('dialog')
const dialogButton = document.getElementById('dialogButton')
const dialogClose = document.getElementById('dialogClose')
const submitButton = document.getElementById('submitButton')

dialogButton.addEventListener('click', ()=> {
    dialog.showModal()
})
dialogClose.addEventListener('click', ()=>{
    dialog.close()
})

const inputTitle = document.getElementById('inputTitle')
const inputAuthor = document.getElementById('inputAuthor')
const inputPages = document.getElementById('inputPages')
const inputRead = document.getElementById('inputRead')

submitButton.addEventListener('click', (event)=> {
function readOrNot () {
    if(inputRead.checked){
        return "Read"
    }
    else return "Not Read"
}
    addBookToLibrary(
        new book(
            inputTitle.value,
            inputAuthor.value,
            inputPages.value,
            readOrNot()
            )
    )
    tableBody.textContent=''
    showLibrary()
    removeBttn = document.querySelectorAll('.removeBttn')
    removeBttn.forEach(btn=> { btn.addEventListener('click', removeButton)})
      
})



showLibrary()
