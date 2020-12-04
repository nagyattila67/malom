indexKL = 1
finish = false;
player1 = 0;
player2 = 0;
lastStep = ""
stepCounter = 0;
thereIsWinner = false;
//kiLépettElőszörCounter=0 >> gép fog lépni; kiLépettElőszörCounter >> személy fog lépni
kiLépettElőszörCounter = 0;
thisIsEngineLearning = false;
myGame = Array();
whatPlaceIsReserved = Array();
whatPlaceIsReservedAll = Array();
whatPlaceIsFree = Array();
whereIStep = Array();


kiKlikkel = function (itt) {
    index = itt.getAttribute("name");
    stepCounter = stepCounter + 1;
    if (indexKL % 2 == 1) { lastStep = "piros"; klikkelek(index) }
    else { lastStep = "kék"; klikkelek(index) };
};

twoPeopleFunction = function () {
    kiKlikkel();
};

gameWithStupidEngineFunction = function () {
    if (thereIsWinner == true && thisIsEngineLearning == false) { alert(`A játék véget ért - a ${lastStep} nyert.`) }
    else {
        if (kiLépettElőszörCounter == 0) { indexKL = 0 }
        kiLépettElőszörCounter = 0;
        placeIsFree = false;
        //index = itt.getAttribute("name");
        stepCounter = stepCounter + 1;
        if (indexKL % 2 == 0) {
            lastStep = "piros";

            while (placeIsFree == false) {
                engineStep = Math.ceil(Math.random() * 9)
                if (document.querySelector(`.mill[name='${engineStep}']`).innerHTML == "_") {
                    placeIsFree = true;
                };

            };
            document.querySelector(`.mill[name='${engineStep}']`).innerHTML = "&#128308"
            whatPlaceIsReserved[whatPlaceIsReserved.length] = engineStep;
            console.log("whatPlaceIsReserved", whatPlaceIsReserved);

            placeIsFree = false;
            indexKL = indexKL + 1;
        }
        else {
            if (thisIsEngineLearning == false) { alert("Most Ön lép!"); };

        };
    };
    checkWinner()
};

tanuloGep = function () {

    lastStep = "piros";
    placeIsFree = false
    while (placeIsFree == false) {
        engineStep = Math.ceil(Math.random() * 9)
        if (whatPlaceIsFree[engineStep] == 0) {
            placeIsFree = true;
        };

    };
    document.querySelector(`.mill[name='${engineStep}']`).innerHTML = "&#128308"
    whatPlaceIsReserved[whatPlaceIsReserved.length] = engineStep;
    whatPlaceIsFree[engineStep] = 1;

    placeIsFree = false;
    indexKL = indexKL + 1;
    stepCounter = stepCounter + 1;


    checkWinner()
};

ellenGep = function () {


    stepCounter = stepCounter + 1;
    lastStep = "kék";
    placeIsFree = false
    while (placeIsFree == false) {
        engineStep = Math.ceil(Math.random() * 9)
        if (whatPlaceIsFree[engineStep] == 0) {
            placeIsFree = true;
            whatPlaceIsFree[engineStep] = 1;
        };

    };
    document.querySelector(`.mill[name='${engineStep}']`).innerHTML = "&#128309"
    whatPlaceIsReserved[whatPlaceIsReserved.length] = engineStep;






    checkWinner()
};

klikkelek = function (index) {

    if (thereIsWinner == true || document.querySelector(`.mill[name='${index}']`).innerHTML != "_") { alert("Nana!"); }
    else {
        if (finish == false && indexKL % 2 == 1) { document.querySelector(`.mill[name='${index}']`).innerHTML = "&#128309"; }
        else {
            document.querySelector(`.mill[name='${index}']`).innerHTML = "&#128308";
            whatPlaceIsReserved[whatPlaceIsReserved.length] = index;

        }
    };
    indexKL = indexKL + 1;
    kiLépettElőszörCounter = 0;
    checkWinner()
};

kiMitTud = Array();
gepiTanulasFunction = function () {

    thisIsEngineLearning = true;
    for (let i = 0; i < 1; i++) {
        newGameFunction();
        myGame = Array();
        whatPlaceIsReserved = Array();
        stepCounter = 0;
        for (let i = 0; i < 10; i++) {
            whatPlaceIsFree[i] = 0;
        };
        whatPlaceIsFree[0] = "üres";


        while (thereIsWinner == false) {
            if (thereIsWinner == false) { tanuloGep(); };
            if (thereIsWinner == false) { checkWinner() };
            //console.log(whatPlaceIsReserved, stepCounter);
            if (thereIsWinner == false) { myGame[myGame.length] = engineStep; };
            if (thereIsWinner == false) { ellenGep() };
            if (thereIsWinner == false) { checkWinner() };
            //console.log(whatPlaceIsReserved, stepCounter);
            if (thereIsWinner == false) { myGame[myGame.length] = engineStep; };
            indexKL = indexKL + 1;
        };



        kiMitTud[kiMitTud.length] = myGame;
        whatPlaceIsReservedAll[whatPlaceIsReservedAll.length] = whatPlaceIsReserved;
        whereIStep[whereIStep.length] = engineStep;
        console.log("kiMitTud ", kiMitTud[kiMitTud.length - 1]);
        console.log("whatPlaceIsReserved", whatPlaceIsReservedAll[whatPlaceIsReservedAll.length - 1]);
        console.log("whatPlaceIsFree ", whatPlaceIsFree)
    }
    thisIsEngineLearning = false;
    console.log("gépi tanulás vége");

};

gepiTanulasLenullázásaFunction = function () {
    kiMitTud = Array();
}

checkWinner = function () {
    for (i = 0; i < 9; i++) {
        for (j = i + 1; j < 9; j++) {
            for (k = j + 1; k < 9; k++) {


                sum = 0;
                value1 = 0; value2 = 0; value3 = 0;
                value1 = document.querySelectorAll(".mill")[i].getAttribute("name")
                value1 = parseInt(value1);
                value2 = document.querySelectorAll(".mill")[j].getAttribute("name")
                value2 = parseInt(value2);
                value3 = document.querySelectorAll(".mill")[k].getAttribute("name")
                value3 = parseInt(value3);
                sum = value1 + value2 + value3;
                color1 = document.querySelectorAll(".mill")[i].innerHTML;
                color2 = document.querySelectorAll(".mill")[j].innerHTML;
                color3 = document.querySelectorAll(".mill")[k].innerHTML;
                //console.log(color1, color2, color3, sum)
                if (sum == 15 && color1 != "_" && color1 == color2 && color2 == color3) {
                    document.querySelector("#winner").innerHTML = `Nyert a ${lastStep}`
                    document.querySelector("#uccsoWinner").innerHTML = lastStep;
                    thereIsWinner = true;

                };
                if (stepCounter == 9 && thereIsWinner == false) {
                    document.querySelector("#winner").innerHTML = "Döntetlen";
                    thereIsWinner = true;
                    //lastStep = "döntetlen"
                };
            };





            if (thereIsWinner == true) { break };
        };
        //if (thereIsWinner == true) { break };
    };


    /*if (thereIsWinner == true) {
        document.querySelector("#winner").innerHTML = `nyert a ${lastStep}`
        document.querySelector("#uccsoWinner").innerHTML = lastStep;

    };
    if (stepCounter == 9 && thereIsWinner == false) {
        document.querySelector("#winner").innerHTML = "döntetlen";
    };*/


    if (thereIsWinner == true) {
        if (lastStep == "piros") {
            player1 = player1 + 1;
        };
        if (lastStep == "kék") {
            player2 = player2 + 1;
        };
        document.querySelector("#resultPlayer1").innerHTML = player1;
        document.querySelector("#resultPlayer2").innerHTML = player2;
    };

    if (stepCounter == 9) {
        document.querySelector("#resultPlayer1").innerHTML = player1;
        document.querySelector("#resultPlayer2").innerHTML = player2;

    };
};


szamlaloNullazasa = function () {
    document.querySelector("#winner").innerHTML = " - ";
    for (let i = 0; i < 9; i++) {
        document.querySelectorAll(".mill")[i].innerHTML = "_";
    };
    document.querySelector("#resultPlayer1").innerHTML = 0;
    document.querySelector("#resultPlayer2").innerHTML = 0;
    document.querySelector("#uccsoWinner").innerHTML = " - ";

    thereIsWinner = false;
    stepCounter = 0;
    indexKL = 1;
    whatPlaceIsReserved = Array();
};

newGameFunction = function () {
    document.querySelector("#winner").innerHTML = " - ";
    for (let i = 0; i < 9; i++) {
        document.querySelectorAll(".mill")[i].innerHTML = "_";
    };
    document.querySelector("#winner").innerHTML = " - ";
    thereIsWinner = false;
    stepCounter = 0;
    indexKL = 1;
    whatPlaceIsReserved = Array();
};



