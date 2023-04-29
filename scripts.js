const chordColors = {
  "CEG": "Red",
  "CFA": "Yellow",
  "HDG": "Blue",
  "ACF": "Black",
  "DGH": "Green",
  "EGC": "Orange",
  "FAC": "Purple",
  "GHD": "Pink",
  "GCE": "Brown"
};

const chordButtons = document.getElementById("chord-buttons");
const startSessionButton = document.getElementById("start-session");
const feedback = document.getElementById("feedback");

// Generate chord buttons
for (const chord in chordColors) {
  const button = document.createElement("button");
  button.innerText = chordColors[chord];
  button.dataset.chord = chord;
  button.onclick = checkChord;
  button.style.backgroundColor = chordColors[chord];
  button.style.color = "white";
  button.style.borderColor = "black";
  button.style.margin = "5px";
  chordButtons.appendChild(button);
}

// Training session logic
let currentChords = [];
let currentChordIndex = 0;

startSessionButton.addEventListener("click", () => {
  // Start a new session
  currentChords = Object.keys(chordColors);
  currentChordIndex = 0;
  feedback.innerText = "Please listen to the chord and click the corresponding color.";
  // Play first chord
  playChord(currentChords[currentChordIndex]);
});

function checkChord(event) {
  if (event.target.dataset.chord === currentChords[currentChordIndex]) {
    feedback.innerText = "Correct!";
    currentChordIndex++;
    if (currentChordIndex === currentChords.length) {
      feedback.innerText = "Session complete!";
    } else {
      playChord(currentChords[currentChordIndex]);
    }
  } else {
    feedback.innerText = "Incorrect. Please try again.";
  }
}

	const synth = new Tone.PolySynth().toDestination();

function playChord(chord) {
  const chordNotes = getChordNotes(chord);
  synth.triggerAttackRelease(chordNotes, "2n");
}

function getChordNotes(chord) {
  // This function converts the chord string (e.g., "CEG") into an array of note strings (e.g., ["C4", "E4", "G4"])
  // You may need to adjust the note mappings to match your desired pitch and octave
  const noteMappings = {
    "C": "C4",
    "D": "D4",
    "E": "E4",
    "F": "F4",
    "G": "G4",
    "A": "A4",
    "H": "B4" // H is used for B in the provided chordColors object
  };

  return chord.split("").map(note => noteMappings[note]);
}
