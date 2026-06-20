const vocabulary = [

    { hindi: "नमस्ते", english: "Hello" },
    { hindi: "धन्यवाद", english: "Thank You" },
    { hindi: "पानी", english: "Water" },
    { hindi: "घर", english: "House" },
    { hindi: "स्कूल", english: "School" },
    { hindi: "दोस्त", english: "Friend" },
    { hindi: "पुस्तक", english: "Book" },
    { hindi: "फल", english: "Fruit" },
    { hindi: "सड़क", english: "Road" },
    { hindi: "खाना", english: "Food" }

];

let currentIndex = 0;

let score = 0;

function nextCard() {

    currentIndex++;

    if (currentIndex >= vocabulary.length) {
        currentIndex = 0;
    }

    document.getElementById("hindiWord")
        .innerText =
        vocabulary[currentIndex].hindi;

    document.getElementById("englishWord")
        .innerText =
        vocabulary[currentIndex].english;

}

function speakWord() {

    let text =
        vocabulary[currentIndex].english;

    let speech =
        new SpeechSynthesisUtterance(text);

    speech.lang = "en-US";

    window.speechSynthesis.speak(speech);

}

function showSection(section) {

    document
        .querySelectorAll(".section")
        .forEach(sec =>
            sec.classList.remove("active"));

    document
        .getElementById(section)
        .classList.add("active");

}

function loadQuiz() {

    let random =
        Math.floor(
            Math.random() * vocabulary.length
        );

    document.getElementById(
        "quizQuestion"
    ).innerText =
        `Translate: ${vocabulary[random].hindi}`;

    document.getElementById(
        "quizQuestion"
    ).dataset.answer =
        vocabulary[random].english;

}

function checkAnswer() {

    let userAnswer =
        document
            .getElementById("quizAnswer")
            .value
            .trim()
            .toLowerCase();

    let correct =
        document
            .getElementById("quizQuestion")
            .dataset.answer
            .toLowerCase();

    if (userAnswer === correct) {

        score++;

        document.getElementById(
            "result"
        ).innerText =
            "✅ Correct";

    } else {

        document.getElementById(
            "result"
        ).innerText =
            `❌ Correct Answer:
${correct}`;

    }

    document.getElementById(
        "score"
    ).innerText =
        score;

    let progress =
        (score / 10) * 100;

    document.getElementById(
        "progressBar"
    ).style.width =
        progress + "%";

    localStorage.setItem(
        "languageScore",
        score
    );

    document.getElementById(
        "quizAnswer"
    ).value = "";

    loadQuiz();

}

document
    .getElementById("darkModeBtn")
    .addEventListener("click", () => {

        document.body.classList.toggle("dark");

    });

score =
    Number(
        localStorage.getItem(
            "languageScore"
        )
    ) || 0;

document.getElementById(
    "score"
).innerText =
    score;

document.getElementById(
    "progressBar"
).style.width =
    (score / 10) * 100 + "%";

loadQuiz();