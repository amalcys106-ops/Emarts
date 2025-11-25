// script.js

const questions = [
    {
        question: "من هو صاحب فكرة اتحاد دولة الإمارات العربية المتحدة؟",
        options: ["الشيخ خليفة", "الشيخ زايد", "الشيخ راشد", "الشيخ محمد"],
        answer: "الشيخ زايد"
    },
    {
        question: "متى أُعلن عن قيام اتحاد دولة الإمارات العربية المتحدة؟",
        options: ["2 ديسمبر 1975", "2 ديسمبر 1971", "2 يناير 1971", "2 ديسمبر 1981"],
        answer: "2 ديسمبر 1971"
    },
    {
        question: "كم عدد الإمارات التي تتكون منها دولة الإمارات العربية المتحدة؟",
        options: ["خمس إمارات", "ست إمارات", "سبع إمارات", "ثماني إمارات"],
        answer: "سبع إمارات"
    },
    {
        question: "ما هو شعار دولة الإمارات العربية المتحدة الذي فازت به ظبية خميس؟",
        options: ["النخلة", "الصقر", "الخيل", "الغزال"],
        answer: "الصقر"
    },
    {
        question: "أي من هذه المدن هي إحدى الإمارات السبع؟",
        options: ["الرياض", "المنامة", "الشارقة", "الدوحة"],
        answer: "الشارقة"
    },
    {
        question: "ما هي الصفات المشتركة التي رأى الشيخ زايد أنها تجمع أهل الإمارات؟",
        options: ["اللغة والدين والتاريخ", "المهنة واللون", "الطعام والملابس", "المدارس والجامعات"],
        answer: "اللغة والدين والتاريخ"
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById('question');
const optionsGrid = document.getElementById('options-grid');
const resultElement = document.getElementById('result');
const scoreElement = document.getElementById('score');
const nextButton = document.getElementById('next-button');
const restartButton = document.getElementById('restart-button');

function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        showResults();
        return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsGrid.innerHTML = '';
    resultElement.textContent = '';
    nextButton.style.display = 'none';

    // Shuffle options for better interactivity
    const shuffledOptions = [...currentQuestion.options].sort(() => Math.random() - 0.5);

    shuffledOptions.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-button');
        button.addEventListener('click', () => checkAnswer(option, currentQuestion.answer, button));
        optionsGrid.appendChild(button);
    });
    updateScoreDisplay();
}

function checkAnswer(selectedOption, correctAnswer, button) {
    // Disable all buttons after an answer is selected
    Array.from(optionsGrid.children).forEach(btn => btn.disabled = true);

    if (selectedOption === correctAnswer) {
        button.classList.add('correct');
        resultElement.textContent = 'إجابة صحيحة! أحسنت يا بطل.';
        score++;
    } else {
        button.classList.add('incorrect');
        resultElement.textContent = 'إجابة خاطئة. الإجابة الصحيحة هي: ' + correctAnswer;
        // Highlight the correct answer
        Array.from(optionsGrid.children).forEach(btn => {
            if (btn.textContent === correctAnswer) {
                btn.classList.add('correct');
            }
        });
    }

    updateScoreDisplay();
    nextButton.style.display = 'block';
}

function updateScoreDisplay() {
    scoreElement.textContent = `النقاط: ${score} / ${questions.length}`;
}

function nextQuestion() {
    currentQuestionIndex++;
    loadQuestion();
}

function showResults() {
    questionElement.textContent = 'انتهت اللعبة!';
    optionsGrid.innerHTML = '';
    resultElement.textContent = `لقد حصلت على ${score} من أصل ${questions.length} أسئلة.`;
    
    if (score === questions.length) {
        resultElement.textContent += ' ممتاز! أنت خبير في تاريخ الاتحاد!';
    } else if (score >= questions.length / 2) {
        resultElement.textContent += ' جيد جداً! يمكنك مراجعة صفحة المعلومات لتحصل على علامة كاملة.';
    } else {
        resultElement.textContent += ' تحتاج إلى مراجعة صفحة المعلومات والبدء من جديد.';
    }

    nextButton.style.display = 'none';
    restartButton.style.display = 'block';
}

function restartGame() {
    currentQuestionIndex = 0;
    score = 0;
    restartButton.style.display = 'none';
    loadQuestion();
}

// Event Listeners
nextButton.addEventListener('click', nextQuestion);
restartButton.addEventListener('click', restartGame);

// Initial load
document.addEventListener('DOMContentLoaded', loadQuestion);
