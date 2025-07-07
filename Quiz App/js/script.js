// Select Elements 
let countSpan = document.querySelector(".count span");
let spnasContainer = document.querySelector(".spans");
let quizArea = document.querySelector(".quiz-area");
let answersArea = document.querySelector(".answers-area");
let submitButton = document.querySelector(".submit");
let bulletsElement = document.querySelector(".bullets");
let results = document.querySelector(".results");
let coundownElement = document.querySelector(".countdown");

// Options
let currentIndex = 0;
let rightAnswers = 0;
let coundownInterval;


function getQuestions () {
  let myRequst = new XMLHttpRequest();

  myRequst.onreadystatechange = function () {

    if(this.readyState === 4 && this.status === 200) {
      
      let questionsObject = JSON.parse(this.responseText);

      let questionsCount = questionsObject.length;

      createBullets(questionsCount);

      addQuestions(questionsObject[currentIndex] , questionsCount);

      coundown(3 , questionsCount);

      submitButton.onclick = () => {

        let theRightAnswer = questionsObject[currentIndex].correct;

        currentIndex++;

        checkRightAnswer(theRightAnswer , questionsCount);

        quizArea.innerHTML = "";
        answersArea.innerHTML = "";

        addQuestions(questionsObject[currentIndex] , questionsCount);

        handleBullets();

        clearInterval(coundownInterval);

        coundown(3 , questionsCount);

        showResult(questionsCount);

      }

    }

  }

  myRequst.open("GET" , "../questions.json" , true);

  myRequst.send();
}

getQuestions();


function createBullets (number) {

  countSpan.innerHTML = number;

  // create spans
  for(let i = 0 ; i < number ; i++) {

    let span = document.createElement("span");

    if(i === 0) {
      span.className = "active";
    }

    spnasContainer.appendChild(span);

  }

}



function addQuestions(object , count) {

  if(currentIndex < count) {
    let questionTitle = document.createElement("h2");

    let questionText = document.createTextNode(object.title);

    questionTitle.appendChild(questionText);

    quizArea.appendChild(questionTitle);

    for(let i = 1 ; i <= 4 ; i++) {

      let mainDiv = document.createElement("div");
      mainDiv.className = "answer";

      let radioInput = document.createElement("input");
      radioInput.type = "radio";
      radioInput.id = `answer_${i}`;
      radioInput.name = "question";
      radioInput.dataset.answer = object[`answer_${i}`];

      if(i === 1) {
        radioInput.checked = true;
      }

      let theLabel = document.createElement("label");
      theLabel.htmlFor = `answer_${i}`;
      let theLabelText = document.createTextNode(object[`answer_${i}`]);
      theLabel.appendChild(theLabelText);

      mainDiv.appendChild(radioInput);
      mainDiv.appendChild(theLabel);

      answersArea.appendChild(mainDiv);

    }
  }

}


function checkRightAnswer(rAnswer , count) {

  let answers = document.getElementsByName("question");
  let theCoosenAnswer;

  for(let i = 0 ; i < answers.length ; i++) {

    if(answers[i].checked) {

      theCoosenAnswer = answers[i].dataset.answer;

    }

  }

  if(rAnswer === theCoosenAnswer) {

    rightAnswers++;

  }

}


function handleBullets() {

  let bullets = document.querySelectorAll(".spans span");

  let arrayOfSpans = Array.from(bullets);

  arrayOfSpans.forEach((span , index) => {
    
    if(currentIndex === index) {
      span.className = "active";
    }

  })

}


function showResult(count) {

  let theResults;

  if(currentIndex === count) {

    quizArea.remove();
    answersArea.remove();
    submitButton.remove();
    bulletsElement.remove();

    if(rightAnswers > (count /2)  && rightAnswers < count) {

      theResults = `<span class="good">Good</sapn> , ${rightAnswers} From ${count}`;

    } else if (rightAnswers === count) {

      theResults = `<span class="perfect">Perfect</sapn>, All Answers Is Good`;

    } else {

      theResults = `<span class="bad">Bad</sapn> , ${rightAnswers} From ${count}`;

    }

    results.innerHTML = theResults;
    results.style.padding = "10px";
    results.style.background = "white";
    results.style.marginTop = "10px";

  }

}


function coundown (duration , count) {

  if(currentIndex < count) {

    let minutes, seconds;
    coundownInterval = setInterval(() => {
      
      minutes = parseInt(duration / 60);
      seconds = parseInt(duration % 60);

      minutes = minutes < 10 ? `0${minutes}` : minutes;
      seconds = seconds < 10 ? `0${seconds}` : seconds;

      coundownElement.innerHTML = `${minutes}:${seconds}`;

      if(--duration < 0) {

        clearInterval(coundownInterval);

        submitButton.click();

      }


    } , 1000)

  }

}