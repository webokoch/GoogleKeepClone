class App {
    constructor() {
        this.notes = []

        this.$form = document.querySelector("#form")
        this.$noteTitle = document.querySelector("#note-title")
        this.$noteText = document.querySelector("#note-text")
        this.$notes = document.querySelector("#notes-container");
        this.$placeholder = document.querySelector("#placeholder");
        this.$formButtons = document.querySelector("#form-buttons")
  
      this.addEventListeners()
    }
  
    addEventListeners() {
      document.body.addEventListener("click", event => {
        this.handleFormClick(event)
      });

      this.$form.addEventListener('submit', event => {
        event.preventDefault()
    
        const title = this.$noteTitle.value  
        const text = this.$noteText.value   
        const hasNote = title && text
        if (hasNote) {
          this.addNote({ title, text })
        }
      });
    }
  
    handleFormClick(event) {
      const isFormClicked = this.$form.contains(event.target)
        
      if (isFormClicked) {
        this.openForm()
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
        this.$noteTitle.value = "";
        this.$noteText.value = "";
    }

    addNote(note) {
        const newNote = {
          title: note.title,
          text: note.text,
          color: 'white',
          id: this.notes.length > 0 ? this.notes[this.notes.length - 1].id + 1 : 1
        }
        this.notes = [...this.notes, newNote]
        this.displayNotes();
        this.closeForm();
      }

    displayNotes() {
        const hasNotes = this.notes.length > 0;
        this.$placeholder.style.display = hasNotes ? "none" : "flex";

        this.$notes.innerHTML = this.notes
        .map(
            note => `
            <div style="background: ${note.color};" class="note">
            <div class="${note.title && "note-title"}">${note.title}</div>
            <div class="note-text">${note.text}</div>
            <div class="toolbar-container">
                <div class="toolbar">
                <img class="toolbar=color" src="https://img.icons8.com/external-glyphons-amoghdesign/32/000000/external-color-education-vol-02-glyphons-amoghdesign.png"/>
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
  