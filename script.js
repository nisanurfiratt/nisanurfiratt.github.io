
let round = 1;
let score = 0;
let history = [];

const scenarios = [
    {
        question: "Your friend helped you yesterday. Today, they need your help. What do you do?",
        options: [
            ["Help them", "help"],
            ["Help them later", "later"],
            ["Refuse", "refuse"]
        ]
    },
    {
        question: "A different friend shares their notes with you. Later, you need their help. What do you do?",
        options: [
            ["Help them too", "help"],
            ["Offer help later", "later"],
            ["Keep what they gave you, but refuse", "refuse"]
        ]
    },
    {
        question: "Someone has helped you several times. They ask for a favour, but you are busy. What do you do?",
        options: [
            ["Make time to help", "help"],
            ["Explain and offer another time", "later"],
            ["Say no", "refuse"]
        ]
    }
];

function choose(choice) {
    history.push(choice);

    if (choice === "help") score += 1;
    if (choice === "refuse") score -= 1;

    const response = document.getElementById("response");

    if (history.length === 1) {
        response.textContent = choice === "help"
            ? "You chose to return the favour. Let's see how your next choice builds on this."
            : choice === "later"
            ? "You chose to delay your response. Your next decision may add a new layer."
            : "You chose not to return the favour. This decision will remain part of your story.";
    } else {
        response.textContent = score > 0
            ? "Your earlier choices show a pattern of giving. The system remembers your willingness to help."
            : score < 0
            ? "Your choices show that you do not always return favours. The system remembers this pattern."
            : "Your choices show a balance between giving and refusing. The system remembers both.";
    }

    if (round < scenarios.length) {
        round++;
        showScenario();
    } else {
        document.getElementById("round").textContent = "YOUR STORY";
        document.getElementById("scenario").textContent =
            "Your choices have shaped this interaction.";
        document.getElementById("choices").innerHTML = "";
        document.getElementById("restart").hidden = false;

        document.getElementById("history").textContent =
            "Choices made: " + history.length +
            " · Giving score: " + score;
    }
}

function showScenario() {
    const current = scenarios[round - 1];

    document.getElementById("round").textContent = "ROUND " + round;
    document.getElementById("scenario").textContent = current.question;

    document.getElementById("choices").innerHTML = "";

    current.options.forEach(function(option) {
        const button = document.createElement("button");
        button.textContent = option[0];
        button.onclick = function() {
            choose(option[1]);
        };
        document.getElementById("choices").appendChild(button);
    });

    document.getElementById("history").textContent =
        "Previous choices: " + history.length;
}

function restart() {
    round = 1;
    score = 0;
    history = [];

    document.getElementById("response").textContent =
        "Your choices will shape what happens next.";
    document.getElementById("restart").hidden = true;

    document.getElementById("choices").innerHTML = `
        <button onclick="choose('help')">Help them</button>
        <button onclick="choose('later')">Help them later</button>
        <button onclick="choose('refuse')">Refuse</button>
    `;

    document.getElementById("history").textContent =
        "Your story is just beginning.";

    showScenario();
}
