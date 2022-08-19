const fs = require('fs')
const chalk = require('chalk')


const getNotes = () => {
    return "Your Notes..."
}

const addNote = (title, body) => {
    const notes = loadNotes()

    const duplicateNotes = notes.filter(function (note) {
        return note.title === title
    })

    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log("new note added!")
    }
    else {
        console.log("Note title taken!")
    }

}

const removeNote = (title) => {
    const notes = loadNotes()

    const notesToKeep = notes.filter((note) => note.title !== title)

    if (notes.length > notesToKeep.length) {
        console.log(chalk.blue.bgRed.bold('note is removed!'));
        saveNotes(notesToKeep)
    } else {
        console.log(chalk.green.bgGreen.bold('note not found'));
    }


}

const listOfNotes = () => {
    const notes = loadNotes();

    console.log(chalk.inverse('Your All Notes'))
    notes.forEach((note) => {
        console.log(note.title)
    });
}

const readNotes = (title) => {
    const notes = loadNotes();
    const note = notes.find((note) => note.title === title)
    if (note) {
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    }
    else {

        console.log(chalk.bgRed("No Note Found"));
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return []
    }
}


module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listOfNotes: listOfNotes,
    readNotes: readNotes
}