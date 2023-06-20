// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = "♡";
const FULL_HEART = "♥";

// Target our heart elements
const hearts = document.getElementsByClassName("like-glyph");
const divSelect = document.getElementById("modal");

// Function to remove error message
function removeError() {
  divSelect.classList.add("hidden");
}

// Function to handle the click event and toggle the heart
function handleClick(event) {
  const heart = event.target;

  mimicServerCall()
    .then(() => {
      if (heart.textContent === EMPTY_HEART) {
        heart.textContent = FULL_HEART;
        heart.classList.add("activated-heart");
      } else {
        heart.textContent = EMPTY_HEART;
        heart.classList.remove("activated-heart");
      }
    })
    .catch((error) => {
      divSelect.classList.remove("hidden");
      const modalMessage = document.getElementById("modal-message");
      modalMessage.textContent = error;
      setTimeout(removeError, 3000);
    });
}

// Attach the click event listener to each heart button
for (const heart of hearts) {
  heart.addEventListener("click", handleClick);
}

// Mock server call function
function mimicServerCall(url = "http://mimicServer.example.com", config = {}) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      let isRandomFailure = Math.random() < 0.2;
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
