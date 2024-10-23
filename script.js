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

    // Define workout exercises for different muscle groups
    const chestExercises = [
        "Bench Press", "Incline Dumbbell Press", "Chest Dips", 
        "Push-ups", "Cable Fly", "Pec Deck Machine", "Incline Barbell Press"
    ];
    const backExercises = [
        "Pull-ups", "Deadlifts", "Barbell Rows", "T-Bar Rows", 
        "Lat Pulldown", "One-arm Dumbbell Row", "Seated Cable Row"
    ];
    const legExercises = [
        "Squats", "Leg Press", "Romanian Deadlift", 
        "Lunges", "Leg Curl Machine", "Leg Extensions", "Bulgarian Split Squat"
    ];
    const shoulderExercises = [
        "Overhead Press", "Lateral Raises", "Front Raises", 
        "Arnold Press", "Face Pulls", "Dumbbell Shrugs", "Cable Lateral Raise"
    ];
    const armExercises = [
        "Barbell Curls", "Hammer Curls", "Tricep Dips", 
        "Skull Crushers", "Tricep Pushdown", "Concentration Curls", "Close-Grip Bench Press"
    ];
    const absExercises = [
        "Plank", "Russian Twists", "Leg Raises", 
        "Cable Crunch", "Bicycle Crunches", "Hanging Leg Raises", "Mountain Climbers"
    ];

    // Function to randomly pick 5-7 exercises from a list
    function getExercises(exerciseList, numExercises = 5) {
        return exerciseList
            .sort(() => Math.random() - 0.5)
            .slice(0, numExercises)
            .join(", ");
    }

    if (days == 3) {
        workoutPlan += `<h3>3-Day Split</h3>
                        <ul>
                            <li>Day 1: Full Body - ${getExercises([...chestExercises, ...backExercises, ...legExercises], 7)}</li>
                            <li>Day 2: Rest or Active Recovery</li>
                            <li>Day 3: Lower Body Focus - ${getExercises(legExercises, 7)}</li>
                            <li>Day 4: Rest</li>
                            <li>Day 5: Upper Body Focus (Chest, Back, Arms) - ${getExercises([...chestExercises, ...backExercises, ...armExercises], 7)}</li>
                            <li>Day 6: Rest</li>
                            <li>Day 7: Rest</li>
                        </ul>`;
    } else if (days == 4) {
        workoutPlan += `<h3>4-Day Split</h3>
                        <ul>
                            <li>Day 1: Chest & Triceps - ${getExercises([...chestExercises, ...armExercises], 7)}</li>
                            <li>Day 2: Back & Biceps - ${getExercises([...backExercises, ...armExercises], 7)}</li>
                            <li>Day 3: Rest</li>
                            <li>Day 4: Legs - ${getExercises(legExercises, 7)}</li>
                            <li>Day 5: Shoulders & Abs - ${getExercises([...shoulderExercises, ...absExercises], 7)}</li>
                            <li>Day 6: Rest</li>
                            <li>Day 7: Rest</li>
                        </ul>`;
    } else if (days == 5) {
        workoutPlan += `<h3>5-Day Split</h3>
                        <ul>
                            <li>Day 1: Chest & Triceps - ${getExercises([...chestExercises, ...armExercises], 7)}</li>
                            <li>Day 2: Back & Biceps - ${getExercises([...backExercises, ...armExercises], 7)}</li>
                            <li>Day 3: Legs - ${getExercises(legExercises, 7)}</li>
                            <li>Day 4: Shoulders & Abs - ${getExercises([...shoulderExercises, ...absExercises], 7)}</li>
                            <li>Day 5: Full Body - ${getExercises([...chestExercises, ...backExercises, ...legExercises], 7)}</li>
                            <li>Day 6: Rest</li>
                            <li>Day 7: Rest</li>
                        </ul>`;
    } else {
        workoutPlan += `<h3>6-Day Advanced Split</h3>
                        <ul>
                            <li>Day 1: Chest & Triceps - ${getExercises([...chestExercises, ...armExercises], 7)}</li>
                            <li>Day 2: Back & Biceps - ${getExercises([...backExercises, ...armExercises], 7)}</li>
                            <li>Day 3: Legs - ${getExercises(legExercises, 7)}</li>
                            <li>Day 4: Shoulders & Abs - ${getExercises([...shoulderExercises, ...absExercises], 7)}</li>
                            <li>Day 5: Full Body - ${getExercises([...chestExercises, ...backExercises, ...legExercises], 7)}</li>
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
