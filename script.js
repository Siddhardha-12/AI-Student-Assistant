async function askAI() {
    const question = document.getElementById("question").value;
    const answer = document.getElementById("answer");

    if (question.trim() === "") {
        answer.innerHTML = "Please enter a question.";
        return;
    }

answer.innerHTML = `
    <div class="loading">
        🤖 AI is thinking<span>.</span><span>.</span><span>.</span>
    </div>
`;
    try {
        const response = await fetch("/ask", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ question: question })
        });

        const data = await response.json();

        if (data.answer) {
answer.innerHTML = marked.parse(data.answer);
        } else {
            answer.innerHTML = "❌ " + data.error;
        }

    } catch (error) {
        answer.innerHTML = "❌ Unable to connect to the AI server.";
        console.error(error);
    }
}
async function generateNotes() {
    const question = document.getElementById("question").value;
    const answer = document.getElementById("answer");

    if (question.trim() === "") {
        answer.innerHTML = "Please enter a topic first.";
        return;
    }

    answer.innerHTML = `
        <div class="loading">
            📚 Generating study notes<span>.</span><span>.</span><span>.</span>
        </div>
    `;

    try {
        const response = await fetch("/ask", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                question: `Create short, exam-friendly study notes about "${question}".
Include:
- Definition
- Important points
- Key terms
- One simple example
Keep the explanation easy for a college student.`
            })
        });

        const data = await response.json();

        if (data.answer) {
            answer.innerHTML = marked.parse(data.answer);
        } else {
            answer.innerHTML = "❌ " + data.error;
        }

    } catch (error) {
        answer.innerHTML = "❌ Unable to generate study notes.";
        console.error(error);
    }
}
async function generateQuiz() {
    const question = document.getElementById("question").value;
    const answer = document.getElementById("answer");

    if (question.trim() === "") {
        answer.innerHTML = "Please enter a topic first.";
        return;
    }

    answer.innerHTML = `
        <div class="loading">
            📝 Generating quiz<span>.</span><span>.</span><span>.</span>
        </div>
    `;

    try {
        const response = await fetch("/ask", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                question: `Create a quiz on "${question}".

Generate exactly 5 multiple-choice questions.
For each question give 4 options (A, B, C, D).
Clearly show the correct answer after each question.
Keep the questions suitable for a college student.`
            })
        });

        const data = await response.json();

        if (data.answer) {
            answer.innerHTML = marked.parse(data.answer);
        } else {
            answer.innerHTML = "❌ " + data.error;
        }

    } catch (error) {
        answer.innerHTML = "❌ Unable to generate quiz.";
        console.error(error);
    }
}
async function examMode() {
    const question = document.getElementById("question").value;
    const answer = document.getElementById("answer");

    if (question.trim() === "") {
        answer.innerHTML = "Please enter a question first.";
        return;
    }

    answer.innerHTML = `
        <div class="loading">
            🎯 Preparing exam answer<span>.</span><span>.</span><span>.</span>
        </div>
    `;

    try {
        const response = await fetch("/ask", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                question: `Answer this question in exam-friendly format:

"${question}"

Rules:
- Give a clear definition first.
- Explain the important points.
- Use simple language.
- Include an example if useful.
- Keep it concise and suitable for a 5-mark college exam answer.`
            })
        });

        const data = await response.json();

        if (data.answer) {
            answer.innerHTML = marked.parse(data.answer);
        } else {
            answer.innerHTML = "❌ " + data.error;
        }

    } catch (error) {
        answer.innerHTML = "❌ Unable to generate exam answer.";
        console.error(error);
    }
}
function clearAll() {
    document.getElementById("question").value = "";
    document.getElementById("answer").innerHTML = "Your AI answer will appear here.";
}
document.getElementById("question").addEventListener("keydown", function(event) {
    if (event.ctrlKey && event.key === "Enter") {
        askAI();
    }
});
document.getElementById("question").addEventListener("input", function() {
    document.getElementById("charCount").textContent =
        this.value.length + " characters";
});
function copyAnswer() {
    const answer = document.getElementById("answer");

    navigator.clipboard.writeText(answer.innerText)
        .then(() => {
            alert("✅ Answer copied!");
        })
        .catch(() => {
            alert("❌ Unable to copy answer.");
        });
}