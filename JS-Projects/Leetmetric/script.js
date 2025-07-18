document.addEventListener("DOMContentLoaded", function () {
    const searchbtn = document.getElementById("searchBtn");
    const usernameInput = document.querySelector(".userInput");

    const statsContainer = document.querySelector(".statsContainer");

    const easyProgressCircle = document.querySelector(".easyProgress");
    const mediumProgressCircle = document.querySelector(".mediumProgress");
    const hardProgressCircle = document.querySelector(".hardProgress");

    const easyLabel = document.getElementById("easyLevel");
    const mediumLabel = document.getElementById("mediumLevel");
    const hardLabel = document.getElementById("hardLevel");

    const userInfo = document.querySelector(".userContainer");

    const cardStatsContainer = document.querySelector(".statsCard");

    function validateUsername(username) {
        if (username.trim() === "") {
            alert("Username should not be empty");
            return false;
        }

        const regex = /^[a-zA-Z0-9_-]{1,15}$/;
        const isMatching = regex.test(username);
        if (!isMatching) {
            alert("Invalid username");
        }
        return isMatching;
    }

    async function fetchuserDetails(username) {
        // userInfo.style.display = "none";
        // const personName = document.createElement('h2');
        // personName.insertAdjacentElement("afterend", h1);
        // personName.textContent = "Hardik";

        const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
        try {
            searchbtn.textContent = "Searching...";
            searchbtn.disabled = true;

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Unable to fetch user details !");
            }

            const parsedData = await response.json();
            console.log("Logging data : ", parsedData);

            displayuserData(parsedData);
        }

        catch (error) {
            statsContainer.innerHTML = `<p>${Error.message}</p>`;
        }

        finally {
            searchbtn.textContent = "Search"
            searchbtn.disabled = false;
            usernameInput.value = "";
        }
    }

    function updateProgress(solved, total, level, circle) {
        const progressDegree = (solved / total) * 100;
        circle.style.setProperty("--progress-degree", `${progressDegree}%`);
        level.textContent = `${solved}/${total}`;
    }

    function displayuserData(parsedData) {``

        // total questions :- 
        const totalQues = parsedData.totalQuestions;

        // total easy, medium, hard questions :- 
        const totaleasyQues = parsedData.totalEasy;
        const totalmediumQues = parsedData.totalMedium;
        const totalhardQues = parsedData.totalHard;

        // total questions solved :-
        const solvedtotalQues = parsedData.totalSolved;

        // total easy, medium, hard questions solved :- 
        const easySolved = parsedData.easySolved;
        const mediumSolved = parsedData.mediumSolved;
        const hardSolved = parsedData.hardSolved;

        updateProgress(easySolved, totaleasyQues, easyLabel, easyProgressCircle);
        updateProgress(mediumSolved, totalmediumQues, mediumLabel, mediumProgressCircle);
        updateProgress(hardSolved, totalhardQues, hardLabel, hardProgressCircle);

        const cardsData = [
            { label: "Overall Submission", value: totalQues },
            { label: "Overall Easy Submission", value: totaleasyQues },
            { label: "Overall Medium Submission", value: totalmediumQues },
            { label: "Overall Hard Submission", value: totalhardQues }
        ];

        console.log("Cards data : ", cardsData);

        cardStatsContainer.innerHTML = cardsData.map(
            data => {
                return `
                    <div class="card">
                        <h4>${data.label}</h4>
                        <p>${data.value}</p>
                    </div> `
            }
        ).join("");
    }

    searchbtn.addEventListener('click', function () {
        const username = usernameInput.value;
        console.log("logging username :", username);
        if (validateUsername(username)) {
            fetchuserDetails(username);
        }
    })
})