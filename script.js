const word = document.getElementById("word");
const submitButton = document.getElementById("submit");
const meaningList = document.getElementById("meaning-list");
const verbMeaningList = document.getElementById("verb-meaning-list");
const about = document.querySelector(".about");
const myWord = document.querySelector(".wooord");
const spelling = document.querySelector(".spelling");
const audioo = document.querySelector(".audioo");
const synonymsWord = document.querySelector(".synonyms-word");
const sourceLink = document.querySelector(".source-link");

function getData(word) {
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data[0]);
      if (data === undefined || data.title === "No Definitions Found") {
        alert("This Word is not Correct");
        throw new Error("This Word is not Correct");
      }
      makeInfoVisible();
      audioo.addEventListener("click", () => {
        setAudio(data[0]);
      });
      setAboutInformation(data[0]);
      setMeaningSection(data[0]);
      setVerbList(data[0]);
      setLink(data[0]);
    });
}

submitButton.addEventListener("click", () => {
  if (word.value !== "") {
    getData(word.value);
  } else {
    alert("Please Enter a Correct Word.");
  }
});

function makeInfoVisible() {
  about.style.display = "block";
}

function setAboutInformation(data) {
  myWord.innerHTML = data.word;
  spelling.innerHTML = data.phonetic;
}

function setAudio(data) {
  let audio;
  data.phonetics.forEach((phonetic) => {
    if (phonetic.audio !== "") {
      audio = new Audio(phonetic.audio);
    }
  });

  audio.play();
}

function setMeaningSection(data) {
  let listItems = "";
  meaningList.innerHTML = "";
  synonymsWord.innerHTML = "";

  data.meanings.forEach((meaning) => {
    if (meaning.partOfSpeech === "noun") {
      meaning.definitions.forEach((item) => {
        console.log(item.definition);
        listItems += `
          <li class="meaning-list-item">${item.definition}</li>
        `;
      });

      if (meaning.synonyms.length !== 0) {
        synonymsWord.innerHTML = meaning.synonyms[0];
      } else {
        synonymsWord.innerHTML = "There is no Synonyms";
      }
    }
  });

  if (listItems === "") {
    listItems = "There are no Meanings for this Word.";
  }

  meaningList.innerHTML = listItems;
}

function setVerbList(data) {
  let listItems = "";
  verbMeaningList.innerHTML = "";

  data.meanings.forEach((meaning) => {
    if (meaning.partOfSpeech === "verb") {
      meaning.definitions.forEach((item) => {
        listItems += `
        <li class="verb-meaning-list-item">
          <p class="verb-meaning-list-item-header">${item.definition}</p>
          <p class="verb-meaning-list-item-item">${
            item.example ? item.example : ""
          }</p>
        </li>
        `;
      });
    }
  });

  if (listItems === "") {
    listItems = "There are no Verbs for this Word.";
  }

  verbMeaningList.innerHTML = listItems;
}

function setLink(data) {
  sourceLink.innerHTML = `${data.sourceUrls[0]}`;
}
