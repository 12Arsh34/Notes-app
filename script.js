const addBtn = document.querySelector("#addBtn");
const main = document.querySelector("#main");
const searchInput = document.querySelector("#search");
const darkToggle = document.querySelector("#darkToggle");

addBtn.addEventListener("click", () => addNote());
darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Save all notes to localStorage
const saveNotes = () => {
  const notes = document.querySelectorAll(".note");
  const data = [];

  notes.forEach(note => {
    const title = note.querySelector(".title").value;
    const content = note.querySelector(".content").value;
    const timestamp = note.getAttribute("data-timestamp");
    if (title.trim() || content.trim()) {
      data.push({ title, content, timestamp });
    }
  });

  localStorage.setItem("notes-app", JSON.stringify(data));
};

// Create a new note
const addNote = (title = "", content = "", timestamp = new Date().toLocaleString()) => {
  const note = document.createElement("div");
  note.classList.add("note");
  note.setAttribute("data-timestamp", timestamp);

  note.innerHTML = `
    <div class="icons">
      <i class="fas fa-save save"></i>
      <i class="fas fa-trash trash"></i>
    </div>
    <textarea class="title" placeholder="Title...">${title}</textarea>
    <textarea class="content" placeholder="Write your note...">${content}</textarea>
    <div class="footer">${timestamp}</div>
  `;

  // Save on typing
  const inputs = note.querySelectorAll("textarea");
  inputs.forEach(input => {
    input.addEventListener("input", () => {
      note.querySelector(".footer").textContent = new Date().toLocaleString();
      note.setAttribute("data-timestamp", new Date().toLocaleString());
      saveNotes();
    });
  });

  note.querySelector(".save").addEventListener("click", saveNotes);
  note.querySelector(".trash").addEventListener("click", () => {
    note.remove();
    saveNotes();
  });

  main.appendChild(note);
  saveNotes();
};

// Load saved notes
const loadNotes = () => {
  const saved = JSON.parse(localStorage.getItem("notes-app") || "[]");
  saved.forEach(({ title, content, timestamp }) => addNote(title, content, timestamp));
};

// Search Notes
searchInput.addEventListener("input", () => {
  const keyword = searchInput.value.toLowerCase();
  document.querySelectorAll(".note").forEach(note => {
    const title = note.querySelector(".title").value.toLowerCase();
    const content = note.querySelector(".content").value.toLowerCase();
    note.style.display = title.includes(keyword) || content.includes(keyword) ? "flex" : "none";
  });
});

loadNotes();
