document.addEventListener('DOMContentLoaded', function() {
    const addNoteBtn = document.getElementById('addNoteBtn');
    const noteModal = document.getElementById('noteModal');
    const closeModal = document.querySelector('.close');
    const saveNoteBtn = document.getElementById('saveNoteBtn');
    const deleteNoteBtn = document.getElementById('deleteNoteBtn');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const notesContainer = document.querySelector('.notes-container');
    const noteTitleInput = document.getElementById('noteTitle');
    const noteContentInput = document.getElementById('noteContent');
    const modalTitle = document.getElementById('modalTitle');
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    let currentNoteId = null;
    let isEditMode = false;
    addNoteBtn.addEventListener('click', openAddNoteModal);
    closeModal.addEventListener('click', closeNoteModal);
    saveNoteBtn.addEventListener('click', saveNote);
    deleteNoteBtn.addEventListener('click', deleteNote);
    searchBtn.addEventListener('click', searchNotes);
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            searchNotes();
        }
    });
    renderNotes();
    function openAddNoteModal() {
        isEditMode = false;
        currentNoteId = null;
        noteTitleInput.value = '';
        noteContentInput.value = '';
        modalTitle.textContent = 'Add New Note';
        deleteNoteBtn.style.display = 'none';
        noteModal.style.display = 'block';
    }
    function openEditNoteModal(id) {
        isEditMode = true;
        currentNoteId = id;
        const note = notes.find(note => note.id === id);
        noteTitleInput.value = note.title;
        noteContentInput.value = note.content;
        modalTitle.textContent = 'Edit Note';
        deleteNoteBtn.style.display = 'block';
        noteModal.style.display = 'block';
    }

    function closeNoteModal() {
        noteModal.style.display = 'none';
    }

    function saveNote() {
        const title = noteTitleInput.value.trim();
        const content = noteContentInput.value.trim();

        if (!title || !content) {
            alert('Please fill in both title and content');
            return;
        }

        const now = new Date();
        const dateString = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();

        if (isEditMode) {
          
            const noteIndex = notes.findIndex(note => note.id === currentNoteId);
            if (noteIndex !== -1) {
                notes[noteIndex] = {
                    ...notes[noteIndex],
                    title,
                    content,
                    date: dateString
                };
            }
        } else {
            
            const newNote = {
                id: Date.now().toString(),
                title,
                content,
                date: dateString,
                pinned: false
            };
            notes.unshift(newNote);
        }

        saveToLocalStorage();
        renderNotes();
        closeNoteModal();
    }

    function deleteNote() {
        if (confirm('Are you sure you want to delete this note?')) {
            notes = notes.filter(note => note.id !== currentNoteId);
            saveToLocalStorage();
            renderNotes();
            closeNoteModal();
        }
    }

    function searchNotes() {
        const searchTerm = searchInput.value.toLowerCase();
        if (!searchTerm) {
            renderNotes();
            return;
        }

        const filteredNotes = notes.filter(note => 
            note.title.toLowerCase().includes(searchTerm) || 
            note.content.toLowerCase().includes(searchTerm)
        );

        renderNotes(filteredNotes);
    }

    function renderNotes(notesToRender = notes) {
        notesContainer.innerHTML = '';

        if (notesToRender.length === 0) {
            notesContainer.innerHTML = '<p class="no-notes">No notes found. Add a new note to get started!</p>';
            return;
        }
        const pinnedNotes = notesToRender.filter(note => note.pinned);
        const unpinnedNotes = notesToRender.filter(note => !note.pinned);
        pinnedNotes.forEach(note => {
            createNoteCard(note);
        });
        unpinnedNotes.forEach(note => {
            createNoteCard(note);
        });
    }

    function createNoteCard(note) {
        const noteCard = document.createElement('div');
        noteCard.className = 'note-card';
        noteCard.innerHTML = `
            <i class="fas fa-thumbtack pin" style="display: ${note.pinned ? 'block' : 'none'}"></i>
            <h3>${note.title}</h3>
            <p>${note.content}</p>
            <div class="date">${note.date}</div>
        `;
        noteCard.addEventListener('click', () => openEditNoteModal(note.id));
        notesContainer.appendChild(noteCard);
    }

    function saveToLocalStorage() {
        localStorage.setItem('notes', JSON.stringify(notes));
    }
    window.addEventListener('click', function(event) {
        if (event.target === noteModal) {
            closeNoteModal();
        }
    });
});
