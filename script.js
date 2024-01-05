function cal() {
    var semCount = document.getElementById('semCount').value;
    //console.log(semCount);
    var form = document.getElementById("form");
    form.removeChild(document.getElementById("semInput"));
    var subInput = document.getElementById("subInput");
    //subInput.innerHTML = inputTags;
    for (var i = 1; i <= semCount; i++) {
        var subLabel = document.createElement("label");
        subLabel.setAttribute("for", "Course count");
        subLabel.innerHTML = "Semester " + i + " course count: ";
        subInput.appendChild(subLabel);
        var subin = document.createElement("input");
        subin.type = "number";
        subin.id = "course-" + i;
        subInput.appendChild(subin);
        var lineBreak = document.createElement("br");
        subInput.appendChild(lineBreak);
    }
    var btn = document.createElement("input");
    btn.type = "button";
    btn.value = "Submit";
    btn.id = "subbutton";
    subInput.appendChild(btn);
    var btn = document.getElementById("subbutton");
    btn.addEventListener("click", function() {
        createForm(semCount);
    });
}

function createForm(semCount) {
    let array = new Array(semCount);
    for (var i = 1; i <= semCount; i++) {
        array[i - 1] = document.getElementById(`course-${i}`).value;
    }
    var form = document.getElementById("form");
    form.removeChild(document.getElementById("subInput"));
    for (var i = 1; i <= semCount; i++) {
        var div = document.createElement("div");
        div.id = `sem-${i}-input`;
        form.appendChild(div);
        var heading = document.createElement("h3");
        heading.innerHTML = `Semester ${i}:`;
        div.appendChild(heading);
        for (var j = 1; j <= array[i - 1]; j++) {
            var nameLabel = document.createElement("label");
            nameLabel.innerHTML = `Course Name ${j}:`;
            div.appendChild(nameLabel);
            var lineBreak = document.createElement("br");
            div.appendChild(lineBreak);
            var nameInput = document.createElement("input");
            nameInput.type = "text";
            nameInput.id = `Course-${j}-name-sem-${i}`;
            div.appendChild(nameInput);
            var lineBreak = document.createElement("br");
            div.appendChild(lineBreak);
            var creditLabel = document.createElement("label");
            creditLabel.innerHTML = "Credits:";
            div.appendChild(creditLabel);
            var lineBreak = document.createElement("br");
            div.appendChild(lineBreak);
            var creditInput = document.createElement("input");
            creditInput.type = "number";
            creditInput.id = `credit-${j}-sem-${i}`;
            div.appendChild(creditInput);
            var lineBreak = document.createElement("br");
            div.appendChild(lineBreak);
            var gradeLabel = document.createElement("label");
            gradeLabel.innerHTML = "Grade:";
            div.appendChild(gradeLabel);
            var select = document.createElement("select");
            select.id = `grade-${j}-sem-${i}`;
            div.appendChild(select);
            var optionO = document.createElement("option");
            optionO.value = "O";
            optionO.innerHTML = "O";
            select.appendChild(optionO);
            var optionAP = document.createElement("option");
            optionAP.value = "A+";
            optionAP.innerHTML = "A+";
            select.appendChild(optionAP);
            var optionA = document.createElement("option");
            optionA.value = "A";
            optionA.innerHTML = "A";
            select.appendChild(optionA);
            var optionBP = document.createElement("option");
            optionBP.value = "B+";
            optionBP.innerHTML = "B+";
            select.appendChild(optionBP);
            var optionB = document.createElement("option");
            optionB.value = "B";
            optionB.innerHTML = "B";
            select.appendChild(optionB);
            var optionC = document.createElement("option");
            optionC.value = "C";
            optionC.innerHTML = "C";
            select.appendChild(optionC);
            var optionU = document.createElement("option");
            optionU.value = "U";
            optionU.innerHTML = "U";
            select.appendChild(optionU);
            var lineBreak = document.createElement("br");
            div.appendChild(lineBreak);
        }
    }
    var btn = document.createElement("input");
    btn.type = "button";
    btn.value = "Submit";
    btn.id = "resButton";
    form.appendChild(btn);
    var btn = document.getElementById("resButton");
    btn.addEventListener("click", function() {
        getIN(semCount, array);
    });
}

function getIN(semCount, array) {
    let sem = new Array(semCount);
    for (var i = 1; i <= semCount; i++) {
        let course = new Array(array[i - 1]);
        for (var j = 1; j <= array[i - 1]; j++) {
            var courseName = document.getElementById(`Course-${j}-name-sem-${i}`).value;
            var credit = parseInt(document.getElementById(`credit-${j}-sem-${i}`).value);
            var grade = document.getElementById(`grade-${j}-sem-${i}`).value;
            var z = {};
            z.course_name = courseName;
            z.credits = credit;
            z.grade = calGrade(grade);
            course[j - 1] = z;
        }
        sem[i - 1] = course;
    }
    calculateGPA(array, semCount, sem);
    console.log(sem);
}

var calGrade = (grade) => {
    switch (grade) {
        case "O":
            return 10;
        case "A+":
            return 9;
        case "A":
            return 8;
        case "B+":
            return 7;
        case "B":
            return 6;
        case "C":
            return 5;
        case "U":
            return 0;
    }
}

function printRes() {

}

function calculateGPA(array, semCount, sem) {
    var arr = new Array(semCount);
    for (var j = 0; j < semCount; j++) {
        var gpa = 0;
        var credit = 0;
        for (var i = 0; i < array[j]; i++) {
            gpa += sem[j][i].credits * sem[j][i].grade;
            credit += sem[j][i].credits;
        }
        //console.log(gpa / credit);
        arr[j] = gpa / credit;
    }
    console.log(arr);
    calculateCGPA(arr);
}

function calculateCGPA(arr) {
    var CGPA = 0;
    for (var i = 0; i < arr.length; i++) {
        CGPA += arr[i];
    }
    CGPA /= arr.length;
    console.log(CGPA);
}