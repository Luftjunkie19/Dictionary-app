const form = document.querySelector(`.form`);
const searchField = document.querySelector(`.search-input`);
const searchBtn = document.querySelector(`.search-btn`);
const wordContainer = document.querySelector(`.word-container`);
const wordDescripition = document.querySelector(`.word-des`);
const synonymContainer = document.querySelector(`.synonyms`);
const examplesContainer = document.querySelector(`.examples`);
const titleContainer = document.querySelector(`.word`);
const errorContainer = document.querySelector(`.show-error`);

const showError = function (msg) {
  searchField.value = ``;
  wordContainer.style.display = `none`;
  errorContainer.classList.add(`display`);
  errorContainer.innerHTML = `<p>${msg}</p>`;
  setTimeout(() => {
    errorContainer.classList.remove(`display`);
  }, 3000);
};

const noVoiceError = function (msg) {
  errorContainer.classList.add(`display`);
  errorContainer.innerHTML = `<p>${msg}</p>`;
  setTimeout(() => {
    errorContainer.classList.remove(`display`);
  }, 3000);
};

const displayWord = function (e) {
  e.preventDefault();
  const searchedValue = searchField.value;

  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchedValue}`)
    .then((res) => res.json())
    .then((data) => {
      try {
        const wordTaken = data[0];
        const wordDefinitions = wordTaken.meanings[0].definitions;
        const wordSynonyms = wordTaken.meanings[0].synonyms;

        console.log(wordTaken);
        console.log(wordDefinitions);
        console.log(wordSynonyms);
        console.log(wordTaken.phonetics[0].audio);

        wordContainer.innerHTML = ` 
      <button class="play-btn">
     <i class="fas fa-volume-high fa-2x"></i>
   </button>

   <audio src="${
     wordTaken.phonetics[0].audio || wordTaken.phonetics[1].audio
       ? wordTaken.phonetics[0].audio || wordTaken.phonetics[1].audio
       : ``
   }"></audio>
   
   <h3 class="word">${wordTaken.word}</h3>

   <h4>Desciption:</h4>
   <div class="word-des">
     <p class="des">${wordDefinitions[0].definition}</p>
   </div>


   <h4>Synonyms:</h4>
   <div class="synonyms">
     <p class="synonym">${
       wordSynonyms.length === 0
         ? `Sorry no synonyms has been found`
         : wordSynonyms.join(`, `)
     }</p>
   </div>

   <h4>Examples:</h4>
   <div class="examples">
     <p class="usage">${
       wordDefinitions[0].example
         ? wordDefinitions[0].example
         : `Sorry no example has been found`
     }</p>
   </div>`;

        const playBtn = document.querySelector(`.play-btn`);
        const audio = document.querySelector(`audio`);

        function playAudio() {
          audio.play();
        }

        playBtn.addEventListener(`click`, playAudio);

        wordContainer.style.display = `block`;

        searchField.value = ``;
      } catch (error) {
        showError(
          `Something went wrong, cannot find the word with value of ${searchedValue}`
        );
      }
    });
};

form.addEventListener(`submit`, displayWord);
