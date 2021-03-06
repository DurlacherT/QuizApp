class Settings {

  
  constructor() {
    console.log(document.location.href);
    console.log(document.cookie);
    this.quizElement = document.querySelector('.quiz');
    this.settingsElement = document.querySelector('.settings');
    this.category = document.querySelector('#category');
    this.numberOfQuestions = document.querySelector('#questions');
    this.difficulty = [
      document.querySelector('#easy'),
      document.querySelector('#medium'),
      document.querySelector('#hard'),
    ];
    this.startButton = document.querySelector('#start');

    this.quiz = { };

    this.startButton.addEventListener('click', this.startQuiz.bind(this));


    //this.loginButton = document.querySelector('#username');
    //this.startButton.addEventListener('click', alert("tststset"));
  }

   

  async startQuiz() {
    try {
      const amount = this.getAmount();
      const categoryId = this.category.value;
      const difficulty = this.getCurrentDifficulty();

      const url = `https://opentdb.com/api.php?amount=${amount}&category=${categoryId}&difficulty=${difficulty}&type=multiple`;

      let data = await this.fetchData(url);
      this.toggleVisibility();
      this.quiz = new Quiz(this.quizElement, amount, data.results);
 

    } catch (error) {
      alert(error);
    }
  }

  toggleVisibility() {
    this.settingsElement.style.visibility = 'hidden';
    this.quizElement.style.visibility = 'visible';
  }

  async fetchData(url) {
    const response = await fetch(url);
    const result = await response.json();

    return result;
  }

  getCurrentDifficulty() {
    const checkedDifficulty = this.difficulty.filter(element => element.checked);

    if (checkedDifficulty.length === 1) {
      return checkedDifficulty[0].id;
    } else {
      throw new Error('Please select a difficulty!');
    }
  }

  getAmount() {
    const amount = this.numberOfQuestions.value;
    // Not negative, not 0 and not over 50
    if (amount > 0 && amount < 51) {
      return amount;
    }
    throw new Error('Please enter a number of questions between 1 and 50!');
  }
}



//----------------------------

class Quiz {
  constructor(quizElement, amount, questions) {
    this.quizElement = quizElement;
    this.currentElement = document.querySelector('.current');
    this.totalElement = document.querySelector('.total');
    this.nextButton = document.querySelector('#next');
    this.finalElement = document.querySelector('.final')

    this.totalAmount = amount;
    this.answeredAmount = 0;
    this.questions = this.setQuestions(questions);
    
    this.nextButton.addEventListener('click', this.nextQuestion.bind(this));
    this.renderQuestion();
  }

  setQuestions(questions) {
    return questions.map(question => new Question(question));
  }

  renderQuestion() {
    this.questions[this.answeredAmount].render();
    this.currentElement.innerHTML = this.answeredAmount;
    this.totalElement.innerHTML = this.totalAmount;
  }

  nextQuestion() {
    const checkedElement = this.questions[this.answeredAmount].answerElements.filter(el => el.firstChild.checked);
    if (checkedElement.length === 0) {
      alert('You need to select an answer');
    } else {
      this.questions[this.answeredAmount].answer(checkedElement)
      this.showResult();
      this.answeredAmount++;
      (this.answeredAmount < this.totalAmount) ? this.renderQuestion() : this.endQuiz();
    }
  }

  showResult() {
    this.questions[this.answeredAmount].isCorrect ? alert('Correct answer :)') : alert('Wrong answer :(');
  }

  endQuiz() {
    this.quizElement.style.visibility = 'hidden';
    this.finalElement.style.visibility = 'visible';
    const correctAnswersTotal = this.calculateCorrectAnswers();
    this.final = new Final(correctAnswersTotal, this.totalAmount);
  }

  calculateCorrectAnswers() {
    let count = 0;
    this.questions.forEach(el => {
      if (el.isCorrect) {
        count++;
      }
    });
    return count;
  }
}

//----------------------------


class Question {
  constructor(question) {
    this.questionElement = document.querySelector('#question');
    this.answerElements = [
      document.querySelector('#a1'),
      document.querySelector('#a2'),
      document.querySelector('#a3'),
      document.querySelector('#a4'),
    ];


    this.correctAnswer = question.correct_answer;
    this.question = question.question;
    this.isCorrect = false;

    this.answers = this.shuffleAnswers([
      question.correct_answer, 
      ...question.incorrect_answers
    ]);
  }

  shuffleAnswers(answers) {
    for (let i = answers.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * i)
      const temp = answers[i]
      answers[i] = answers[j]
      answers[j] = temp
    }
    return answers;
  }

  answer(checkedElement) {
     this.isCorrect = (checkedElement[0].textContent === this.correctAnswer) ? true : false;
  }

  render() {
    this.questionElement.innerHTML = this.question;
    this.answerElements.forEach((el, index) => {
      el.innerHTML = '<input type="radio" name="radio"><span class="checkmark"></span>' + this.answers[index];
    });
  }
}



function eventHandler(count, totalAmount, userid) {

  const url = `http://localhost:8000/api/users/${userid}`;
  this.fetch(url,{
    method:'PUT',
    headers:{
    'Content-Type':'application/json'
    },
    body:JSON.stringify({  
    score: count,
    question: totalAmount})})
 }

//----------------------------

class Final {
  

  constructor(count, totalAmount) {
    let userid = 1;
    this.scoreElement = document.querySelector('.score');
    this.userdataElement = document.querySelector('.userdata')
    this.againButton = document.querySelector('#again');

    this.render(count, totalAmount);
    this.againButton.addEventListener('click', location.reload.bind(location));
    this.againButton.addEventListener('click', eventHandler(count, totalAmount, userid));
    this.fetchUsers();
  }

  render(count, totalAmount) {
    this.scoreElement.innerHTML = `You answered ${count} out of ${totalAmount} correct!`;
  }

  renderScoreboard(name, questions, score) {
    this.userdataElement.appendChild(document.createTextNode(`${name} answered ${questions} out of ${score} questions correct!`));
    this.userdataElement.appendChild(document.createElement("br"));
}




  async fetchUsers() {
    try {
  
      const url = `http://localhost:8000/api/users/`;
  
      let data = await this.fetchData(url);

      for (let i = 0; i < data.length; i++) {        
        this.renderScoreboard(JSON.stringify(data[i].name).replace(/"([^"]+)":/g, '$1:'), JSON.stringify(data[i].score).replace(/"([^"]+)":/g, '$1:'), JSON.stringify(data[i].question).replace(/"([^"]+)":/g, '$1:'));
       }
    } catch (error) {
      alert(error);
    }
  }


  async fetchData(url) {
    const response = await fetch(url);
    const result = await response.json();

    return result;
  }


}

//----------------------------



new Settings();
