const quizData = [
  {
    question: "What does OOP stand for in Python?",
    options: [
      "Object-Oriented Programming",
      "Official-Object Protocol",
      "Ordered-Object Procedure",
      "None of the above"
    ],
    correct: [0]
  },
  {
    question: "Which of the following is a core concept of OOP?",
    options: [
      "Inheritance",
      "Recursion",
      "Iteration",
      "Polymorphism"
    ],
    correct: [0, 3] // Both Inheritance and Polymorphism are core OOP concepts
  },
  {
    question: "In Python OOP, what is a 'class'?",
    options: [
      "A blueprint for creating objects",
      "An instance of an object",
      "A function that returns a value",
      "A variable that stores data"
    ],
    correct: [0]
  },
  {
    question: "How do you create an 'object' (instance) of a class in Python?",
    options: [
      "my_object = MyClass()",
      "my_object = new MyClass()",
      "create MyClass as my_object",
      "object MyClass"
    ],
    correct: [0]
  },
  {
    question: "What is the purpose of the `__init__` method in a Python class?",
    options: [
      "To destroy an object",
      "To initialize an object's attributes",
      "To define a class method",
      "To print an object's representation"
    ],
    correct: [1]
  },
  {
    question: "Which keyword is used to define a class in Python?",
    options: [
      "def",
      "class",
      "function",
      "create"
    ],
    correct: [1]
  },
  {
    question: "What is 'encapsulation' in Python OOP?",
    options: [
      "Bundling data and methods that operate on the data within a single unit",
      "Hiding the implementation details of an object",
      "Allowing objects of different classes to be treated as objects of a common type",
      "Creating new classes from existing classes"
    ],
    correct: [0, 1] // Both bundling and hiding are aspects of encapsulation
  },
  {
    question: "What is 'inheritance' in Python OOP?",
    options: [
      "A mechanism where a new class inherits properties and behaviors from an existing class",
      "The process of creating multiple objects from a single class",
      "Restricting access to certain attributes or methods",
      "Defining a function within a class"
    ],
    correct: [0]
  },
  {
    question: "Which of the following is a type of inheritance in Python?",
    options: [
      "Single Inheritance",
      "Multiple Inheritance",
      "Multilevel Inheritance",
      "All of the above"
    ],
    correct: [3]
  },
  {
    question: "What is 'polymorphism' in Python OOP?",
    options: [
      "The ability of an object to take on many forms",
      "The process of creating multiple objects of the same class",
      "Hiding the internal state of an object",
      "Grouping related data and functions into a single unit"
    ],
    correct: [0]
  },
  {
    question: "How do you achieve method overriding in Python?",
    options: [
      "By defining a method with the same name in the subclass as in the superclass",
      "By using the `super()` function",
      "By decorating the method with `@override`",
      "Python does not support method overriding"
    ],
    correct: [0]
  },
  {
    question: "What is the purpose of the `super()` function in Python?",
    options: [
      "To call a method from the parent class",
      "To create a new instance of the current class",
      "To check if an object is an instance of a class",
      "To convert an object to a string"
    ],
    correct: [0]
  },
  {
    question: "What is an 'abstract class' in Python (conceptually, as Python doesn't have true abstract classes natively before ABC module)?",
    options: [
      "A class that cannot be instantiated and is meant to be subclassed",
      "A class with only abstract methods",
      "A class that provides a default implementation for all its methods",
      "A class that has no methods"
    ],
    correct: [0]
  },
  {
    question: "Which module is commonly used for creating abstract base classes (ABCs) in Python?",
    options: [
      "abc",
      "oop",
      "classes",
      "types"
    ],
    correct: [0]
  },
  {
    question: "What is the access modifier for attributes in Python by default?",
    options: [
      "Public",
      "Private",
      "Protected",
      "None of the above (all are public by default)"
    ],
    correct: [0]
  },
  {
    question: "How do you typically denote a 'private' attribute in Python (by convention)?",
    options: [
      "Using a single leading underscore (e.g., `_attribute`)",
      "Using double leading underscores (e.g., `__attribute`)",
      "Using the `private` keyword",
      "Python does not have private attributes"
    ],
    correct: [1]
  },
  {
    question: "What is a 'classmethod' in Python?",
    options: [
      "A method that operates on the class itself, rather than on an instance of the class",
      "A method that can only be called from within the class",
      "A method that returns a new instance of the class",
      "A method that is inherited by all subclasses"
    ],
    correct: [0]
  },
  {
    question: "What is a 'staticmethod' in Python?",
    options: [
      "A method that belongs to the class but doesn't operate on the class or its instances",
      "A method that can only be called from within the class",
      "A method that is shared across all instances of a class",
      "A method that modifies the class state"
    ],
    correct: [0]
  },
  {
    question: "What is the purpose of the `del` keyword in Python OOP?",
    options: [
      "To delete an object and free up memory",
      "To define a destructor method",
      "To remove an attribute from an object",
      "To delete a class definition"
    ],
    correct: [0]
  },
  {
    question: "Which of the following is NOT an advantage of using OOP in Python?",
    options: [
      "Code reusability",
      "Improved code organization and modularity",
      "Increased execution speed for all programs",
      "Easier maintenance and debugging"
    ],
    correct: [2]
  }
];
let currentQuestion = 0;
let score = 0;
let timer = 30;
let timerInterval = null;

const totalQuestions = quizData.length;
document.getElementById('total-questions').textContent = totalQuestions;

function renderQuestion(qIndex) {
  const q = quizData[qIndex];
  document.getElementById('current-question').textContent = qIndex + 1;
  document.getElementById('question-text').textContent = q.question;

  const optionsContainer = document.getElementById('options-container');
  optionsContainer.innerHTML = '';
  q.options.forEach((option, idx) => {
    const label = document.createElement('label');
    label.className = 'option';
    label.tabIndex = 0;

    const input = document.createElement('input');
    input.type = 'radio'; // For single answer use 'radio', for multiple use 'checkbox'
    input.name = 'option';
    input.value = idx;

    label.appendChild(input);
    label.innerHTML += option;
    const checkmark = document.createElement('span');
    checkmark.className = 'checkmark';
    label.appendChild(checkmark);

    // Option selection
    label.addEventListener('click', (e) => {
      // Remove selected from all
      document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
      label.classList.add('selected');
      input.checked = true;
    });

    optionsContainer.appendChild(label);
  });
}

function startTimer() {
  timer = 30;
  updateTimerDisplay(timer);
  updateTimerCircle(timer);
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timer--;
    updateTimerDisplay(timer);
    updateTimerCircle(timer);
    if (timer <= 0) {
      clearInterval(timerInterval);
      handleSubmit(true);
    }
  }, 1000);
}

function updateTimerDisplay(time) {
  document.getElementById('timer').textContent = time;
}

function updateTimerCircle(time) {
  const full = 2 * Math.PI * 28; // circumference
  const value = Math.max(0, Math.min(30, time));
  const offset = full - (full * value / 30);
  document.getElementById('timer-progress').setAttribute('stroke-dashoffset', offset);
}

function handleSubmit(isTimeout = false) {
  clearInterval(timerInterval);
  const q = quizData[currentQuestion];
  const selected = Array.from(document.querySelectorAll('input[name="option"]:checked')).map(input => parseInt(input.value));
  const isCorrect = arraysEqual(selected, q.correct);

  if (isCorrect) score++;

  if (currentQuestion < quizData.length - 1) {
    currentQuestion++;
    renderQuestion(currentQuestion);
    startTimer();
  } else {
    showResult();
  }
}

function showResult() {
  document.querySelector('.quiz-header').innerHTML = `<h2 style="color:#fff;text-align:center;">Quiz Completed!</h2>
    <p style="color:#b9bac6;text-align:center;">Your Score: <span style="color:#6cdb3a;font-weight:700;">${score}</span> / ${totalQuestions}</p>`;
  document.getElementById('quiz-form').style.display = 'none';
  document.querySelector('.timer-circle').style.display = 'none';
}

function arraysEqual(a1, a2) {
  return a1.length === a2.length && a1.every((v, i) => v === a2[i]);
}

document.getElementById('quiz-form').addEventListener('submit', function(e) {
  e.preventDefault();
  handleSubmit();
});

// Initial load
renderQuestion(currentQuestion);
startTimer();