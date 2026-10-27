let round = 1;
let choices = [];

const scenarios = [
    "Your friend helped you yesterday. Today, they need your help. What do you do?",
    "Another friend shares their notes with you. Later, they need your help. What do you do?",
    "Someone has helped you several times. Now they ask for a favour. What do you do?"
];

function choose(choice) {
    choices.push(choice);

    let message = "";

    if (choice === "help") {
        message = "You chose to help. Your willingness to give may shape your next interaction.";
    } else if (choice === "later") {
        message = "You offered help later. You are willing to help, but timing matters to you.";
    } else {
        message = "You refused to help. Sometimes people have their own reasons for saying no.";
    }

    document.getElementById("response").textContent = message;

    document.getElementById("history").textContent =
        "Choices made: " + choices.length;

    if (round < scenarios.length) {
        round++;

        document.getElementById("round").textContent = "ROUND " + round;
        document.getElementById("scenario").textContent = scenarios[round - 1];

        showOptions();
    } else {
        showResult();
    }
}

function showOptions() {
    const options = [
        ["Help them", "help"],
        ["Help them later", "later"],
        ["Refuse", "refuse"]
    ];

    document.getElementById("choices").innerHTML = "";

    options.forEach(option => {
        const button = document.createElement("button");

        button.textContent = option[0];
        button.onclick = () => choose(option[1]);

        document.getElementById("choices").appendChild(button);
    });
}

function showResult() {
    const helped = choices.filter(c => c === "help").length;
    const later = choices.filter(c => c === "later").length;
    const refused = choices.filter(c => c === "refuse").length;

    let title = "";
    let comment = "";

    if (helped >= 2) {
        title = "THE GIVER 💗";

        comment =
            "You seem willing to be there for others when they need you. " +
            "Helping people may come naturally to you, especially when someone " +
            "has been there for you before. But remember: being a good friend " +
            "doesn't mean you always have to say yes. You deserve support, too.";
    } 
    
    else if (refused >= 2) {
        title = "THE INDEPENDENT SOUL 🦋";

        comment =
            "You don't automatically feel obligated to return every favour. " +
            "You may value your independence and prefer to make your own decisions. " +
            "That's okay! Still, reciprocity isn't about keeping score. " +
            "Sometimes, a small act of kindness can mean a lot to someone.";
    } 
    
    else if (later >= 2) {
        title = "THE THOUGHTFUL BALANCER ⚖️";

        comment =
            "You're not necessarily against helping others, but you may need " +
            "time or the right circumstances before you act. You seem to look " +
            "for a balance between your own needs and other people's expectations. " +
            "Just remember that even a small gesture can make someone feel valued.";
    } 
    
    else {
        title = "THE COMPLEX GIVER 🎭";

        comment =
            "Your choices change depending on the situation. Sometimes you help, " +
            "sometimes you hesitate, and sometimes you say no. That doesn't make " +
            "you selfish or selfless. Reciprocity is complicated, and healthy " +
            "relationships aren't about keeping an exact score of who owes whom.";
    }

    document.getElementById("round").textContent = "YOUR RESULTS";

    document.getElementById("scenario").textContent =
        "Three situations. Three choices. What do they reveal about you?";

    document.getElementById("response").textContent =
        title + "\n\n" + comment;

    document.getElementById("history").textContent =
        "Helped: " + helped +
        " | Helped later: " + later +
        " | Refused: " + refused;

    document.getElementById("choices").innerHTML = "";

    document.getElementById("restart").hidden = false;
}

function restart() {
    round = 1;
    choices = [];

    document.getElementById("round").textContent = "ROUND 1";

    document.getElementById("scenario").textContent = scenarios[0];

    document.getElementById("response").textContent =
        "Your choices will shape what happens next.";

    document.getElementById("history").textContent =
        "Your story is just beginning.";

    document.getElementById("restart").hidden = true;

    document.getElementById("choices").innerHTML = `
        <button onclick="choose('help')">Help them</button>
        <button onclick="choose('later')">Help them later</button>
        <button onclick="choose('refuse')">Refuse</button>
    `;
}