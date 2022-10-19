class App {
    constructor() {
        this.notes = []
        this.title = ''
        this.text = ''
        this.id = ''

        this.$notes = document.querySelector("#notes-container")
        this.$form = document.querySelector("#form")
        this.$noteTitle = document.querySelector("#note-title")
        this.$noteText = document.querySelector("#note-text")
        this.$placeholder = document.querySelector("#placeholder")
        this.$formButtons = document.querySelector("#form-buttons")
        this.$formCloseButton = document.querySelector("#form-close-button")
        this.$modal = document.querySelector(".modal")
        this.$modalTitle = document.querySelector(".modal-title")
        this.$modalText = document.querySelector(".modal-text")
        this.$modalUpdateButton = document.querySelector('.modal-update-button')
        this.$colorTooltip = document.querySelector('#color-tooltip')
  
      this.addEventListeners()
    }
  
    addEventListeners() {
      document.body.addEventListener("click", event => {
        this.handleFormClick(event)
        this.selectNote(event)
        this.handleNoteClick(event)
      })

      document.body.addEventListener('mouseover', event => {
        this.openTooltip(event);  

      });

      document.body.addEventListener('mouseout', event => {
        this.closeTooltip(event);  
     });
     
      this.$form.addEventListener("submit", event => {
        event.preventDefault()
        const title = this.$noteTitle.value
        const text = this.$noteText.value
        const hasNote = title && text
        if (hasNote) {
          this.addNote({ title, text })
        }
      });

      this.$formCloseButton.addEventListener("click", (event) => {
        event.stopPropagation()
        this.closeForm()
      })

      this.$modalUpdateButton.addEventListener('click', event => {
        this.updateNote(event) 
      })
    }
  
    handleFormClick(event) {
      const isFormClicked = this.$form.contains(event.target)
        
      const title = this.$noteTitle.value  
      const text = this.$noteText.value   
      const hasNote = title && text

      if (isFormClicked) {
        this.openForm()
      } else if (hasNote) {
        this.addNote({ title, text })
      } else {
        this.closeForm()
      }
    }

    openForm() {
      this.$form.classList.add("form-open")
      this.$noteTitle.style.display = "block"
      this.$formButtons.style.display = "block"
    }
    
    closeForm() {
      this.$form.classList.remove("form-open")
      this.$noteTitle.style.display = "none"
      this.$formButtons.style.display = "none"
      this.$noteTitle.value = ""
      this.$noteText.value = ""
    }

    handleNoteClick(event) {
      if (event.target.closest(".note")) {
        this.$modal.classList.toggle("open-modal")
        this.$modalTitle.value = this.title
        this.$modalText.value = this.text
      }
    }

    updateNote(event) {
      this.editNote(); 
      this.$modal.classList.toggle("open-modal")
    }

    openTooltip(event) {
      if (!event.target.matches('.toolbar-color')) return
      this.id = event.target.dataset.id
      const noteCoordinates = event.target.getBoundingClientRect()
      const horizontal = noteCoordinates.left + window.scrollX
      const vertical = noteCoordinates.top - window.scrollY
      this.$colorTooltip.style.transform = `translate(${horizontal}px, ${vertical}px)`
      this.$colorTooltip.style.display = 'flex'
    }
 
    closeTooltip(event) {
      if (!event.target.matches('.toolbar-color')) return
      this.$colorTooltip.style.display = 'none'
    }
  
    addNote({ title, text }) {
      const newNote = {
        title,
        text,
        color: 'white',
        id: this.notes.length > 0 ? this.notes[this.notes.length - 1].id + 1 : 1
      }
      this.notes = [...this.notes, newNote]
      this.displayNotes();
      this.closeForm();
    }
    
    editNote() {
      const title = this.$modalTitle.value;
      const text = this.$modalText.value;
      this.notes = this.notes.map(note => 
        note.id === Number(this.id) ? { ...note, title, text } : note
        );
        this.displayNotes()
      }
      
    selectNote(event) {
      const $selectedNote = event.target.closest(".note");
      if (!$selectedNote) return;
      const [$noteTitle, $noteText] = $selectedNote.children;
      this.title = $noteTitle.innerText;
      this.text = $noteText.innerText;
      this.id = $selectedNote.dataset.id;
    }

    displayNotes() {
      const hasNotes = this.notes.length > 0;
      this.$placeholder.style.display = hasNotes ? "none" : "flex";

      this.$notes.innerHTML = this.notes
      .map(
          note => `
          <div style="background: ${note.color};" class="note" data-id="${note.id}">
          <div class="note-title">${note.title}</div>
          <div class="note-text">${note.text}</div>
          <div class="toolbar-container">
              <div class="toolbar">
              <img class="toolbar-color" data-id="${note.id}" src="https://img.icons8.com/external-glyphons-amoghdesign/32/000000/external-color-education-vol-02-glyphons-amoghdesign.png"/>
              <img class="toolbar-delete" src="https://img.icons8.com/ios-glyphs/30/000000/filled-trash.png"/>
              </div>
          </div>
          </div>
      `
      )
      .join("");
    }

  }
  
  new App()
  