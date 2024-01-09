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
        var div1 = document.createElement("div");
        div1.id = `sem-${i}-input`;
        div1.className = "container";
        form.appendChild(div1);
        var heading = document.createElement("h3");
        heading.innerHTML = `Semester ${i}:`;
        div1.appendChild(heading);
        var div2 = document.createElement("div");
        div2.className = "row";
        div1.appendChild(div2);
        for (var j = 1; j <= array[i - 1]; j++) {
            var div = document.createElement("div");
            div.className = "col";
            div2.appendChild(div);
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
    //console.log(sem);

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

function calculateGPA(array, semCount, sem) {
    var arr = new Array(semCount);
    var cre = new Array(semCount);
    for (var j = 0; j < semCount; j++) {
        var gpa = 0;
        var credit = 0;
        for (var i = 0; i < array[j]; i++) {
            gpa += sem[j][i].credits * sem[j][i].grade;
            credit += sem[j][i].credits;
        }
        //console.log(gpa / credit);
        arr[j] = gpa / credit;
        cre[j] = credit;
    }
    //console.log(arr);
    calculateCGPA(arr, cre);
}

function calculateCGPA(arr, cre) {
    var CGPA = 0;
    var l = 0;
    for (var i = 0; i < arr.length; i++) {
        CGPA += arr[i] * cre[i];
        l += cre[i];
    }

    CGPA = CGPA / l;
    //console.log(CGPA);
    printRes(arr, CGPA);
}


function printRes(sem, CGPA) {
    var form = document.getElementById("form");
    document.body.removeChild(form);
    var h2 = document.createElement('h2');
    h2.innerHTML = 'Result:';
    document.body.appendChild(h2);
    var p = document.createElement("p");
    p.innerHTML = "CGPA is :" + CGPA;
    p.id = "finalCGPA";
    document.body.appendChild(p);
    var lineBreak = document.createElement("br");
    document.body.appendChild(lineBreak);
    var table = document.createElement('table');
    table.setAttribute('border', '1');
    var tr = document.createElement('tr');
    var th1 = document.createElement('th');
    th1.innerHTML = "Semester";
    var th2 = document.createElement('th');
    th2.innerHTML = "GPA";
    tr.appendChild(th1);
    tr.appendChild(th2);
    table.appendChild(tr);
    for (var j = 0; j < sem.length; j++) {
        tr = document.createElement("tr");
        th1 = document.createElement('th');
        th1.innerHTML = romanize(j + 1);
        th2 = document.createElement('th');
        th2.innerHTML = sem[j];
        tr.appendChild(th1);
        tr.appendChild(th2);
        table.appendChild(tr);
    }
    document.body.appendChild(table);
}

function romanize(num) {
    if (isNaN(num))
        return NaN;
    var digits = String(+num).split(""),
        key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
            "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
            "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"
        ],
        roman = "",
        i = 3;
    while (i--)
        roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
}