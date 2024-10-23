// Save user data and calculate workout plan and protein intake
function saveUserData() {
    let weight = document.getElementById("weight").value;
    let height = document.getElementById("height").value;
    let experience = document.getElementById("experience").value;
    let days = document.getElementById("days").value;
    
    // Validate inputs
    if (weight === "" || height === "" || days === "") {
        alert("Please fill in all fields.");
        return;
    }

    // Save data to localStorage
    let userData = {
        weight: weight,
        height: height,
        experience: experience,
        days: days
    };
    localStorage.setItem("userData", JSON.stringify(userData));

    // Call function to generate plan
    calculatePlan(weight, experience, days);
}

// Function to calculate daily protein requirement and generate workout plan
function calculatePlan(weight, experience, days) {
    // Calculate protein intake (1.8 to 2.2 grams per kg of body weight)
    let proteinMin = (weight * 1.8).toFixed(2);
    let proteinMax = (weight * 2.2).toFixed(2);

    // Display the calculated protein intake
    document.getElementById("protein-intake").innerHTML = `You need between ${proteinMin}g and ${proteinMax}g of protein per day.`;

    // Generate workout plan based on experience and training days
    let workoutPlan = "";

    if (days == 3) {
        workoutPlan += `<h3>3-Day Split</h3>
                        <ul>
                            <li>Day 1: Full Body (Squats, Bench Press, Deadlifts)</li>
                            <li>Day 2: Rest or Active Recovery</li>
                            <li>Day 3: Lower Body (Lunges, Leg Press, Leg Curls)</li>
                            <li>Day 4: Rest</li>
                            <li>Day 5: Upper Body (Overhead Press, Pull-ups, Rows)</li>
                            <li>Day 6: Rest</li>
                            <li>Day 7: Rest</li>
                        </ul>`;
    } else if (days == 4) {
        workoutPlan += `<h3>4-Day Split</h3>
                        <ul>
                            <li>Day 1: Chest, Shoulders, Triceps</li>
                            <li>Day 2: Back, Biceps, Abs</li>
                            <li>Day 3: Rest</li>
                            <li>Day 4: Legs (Squats, Deadlifts)</li>
                            <li>Day 5: Rest</li>
                            <li>Day 6: Full Body (Compound Lifts)</li>
                            <li>Day 7: Rest</li>
                        </ul>`;
    } else if (days == 5) {
        workoutPlan += `<h3>5-Day Split</h3>
                        <ul>
                            <li>Day 1: Chest & Triceps</li>
                            <li>Day 2: Back & Biceps</li>
                            <li>Day 3: Legs</li>
                            <li>Day 4: Shoulders & Abs</li>
                            <li>Day 5: Full Body (Compound Movements)</li>
                            <li>Day 6: Rest</li>
                            <li>Day 7: Rest</li>
                        </ul>`;
    } else {
        workoutPlan += `<h3>6-Day Advanced Split</h3>
                        <ul>
                            <li>Day 1: Chest & Triceps</li>
                            <li>Day 2: Back & Biceps</li>
                            <li>Day 3: Legs (Quads, Hamstrings, Calves)</li>
                            <li>Day 4: Shoulders & Abs</li>
                            <li>Day 5: Full Body (Heavy Compound Lifts)</li>
                            <li>Day 6: Rest</li>
                            <li>Day 7: Active Recovery or Rest</li>
                        </ul>`;
    }

    // Display the workout plan
    document.getElementById("workout-plan").innerHTML = workoutPlan;
}

// Function to load saved user data from localStorage and auto-fill the form
function loadUserData() {
    let savedData = JSON.parse(localStorage.getItem("userData"));

    if (savedData) {
        document.getElementById("weight").value = savedData.weight;
        document.getElementById("height").value = savedData.height;
        document.getElementById("experience").value = savedData.experience;
        document.getElementById("days").value = savedData.days;

        // Automatically generate plan based on saved data
        calculatePlan(savedData.weight, savedData.experience, savedData.days);
    }
}

// Call loadUserData when the page loads to auto-fill fields
window.onload = loadUserData;
