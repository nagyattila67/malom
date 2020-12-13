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
finishAndUndecided = false;
whatPlaceIsReservedAllRed = Array();
whatPlaceIsReservedAllBlue = Array();
enginStep = -10;
twoPeople = false;
whatPlaceIsReservedAll2 = 0;
isDontetlen = false;
undecided = false;
gameWithCleverEngine = false;
gameWithEngine=false;
stepNow = "";
nextStep = "";
gameWithStupidEngine = false;
piros = "&#128308";
kek = "&#128309";
szin=" ";

itHappened = false;
kiKlikkel = function (itt) {
    if (twoPeople == true) {
        itHappened = false
        if (document.querySelector("#firstRed").checked == true && stepCounter == 0) { indexKL = 0 };
    };


    if (itHappened == false) {
        index = itt.getAttribute("name");
        index = parseInt(index);
        if (indexKL % 2 == 0) { lastStep = "piros" }
        else { lastStep = "kék"; };







        stepCounter = stepCounter + 1;




        klikkelek(index);
        itHappened = true;








    };
};

klikkelek = function (index) {
    itHappened=false;

    if (thereIsWinner == true || document.querySelector(`.mill[name='${index}']`).innerHTML != "_") { alert("Nana!"); }
    else {
        if (finish == false && indexKL % 2 == 1) { szin = piros; }
        if (finish == false && indexKL % 2 == 0) { szin = kek; };
        if(gameWithEngine==true){szin=kek};
        document.querySelector(`.mill[name='${index}']`).innerHTML = szin;
        whatPlaceIsReserved[whatPlaceIsReserved.length] = index;
        indexKL = indexKL + 1;
        kiLépettElőszörCounter = 0;
        console.log("a játékos lépett - whatPlaceIsReserved: ", whatPlaceIsReserved);
        console.log("indexKL: ", indexKL)
        console.log("lastStep: ", lastStep);
        console.log("stepCounter: ", stepCounter);
        gameWithCleverEngine = false;
        gameWithEngine=false;
        checkWinner()
    };

};

twoPeopleFunction = function (itt) {
    twoPeople = true;
    document.querySelector("#setting").innerHTML = "kétszemélyes játék";
};

gameWithStupidEngineFunction = function () {
    gameWithEngine=true;
    //if (indexKL % 2 == 0) { lastStep = "piros"; }
    //else { lastStep = "kék"; };
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
            placeIsFree = false;
            indexKL = indexKL + 1;
            document.querySelector("#setting").innerHTML = "most a buta gép lépett."
        }
        else {
            if (thisIsEngineLearning == false) { alert("Most Ön lép!"); };
        };

        stepCounter = stepCounter + 1;
        itHappened = false;
        whatPlaceIsReserved[whatPlaceIsReserved.length] = engineStep;
        console.log("a buta gép lépett - whatPlaceIsReserved: ", whatPlaceIsReserved);
        console.log("indexKL: ", indexKL);
        console.log("lasStep: ", lastStep);
        console.log("stepCounter: ", stepCounter);
        checkWinner()
    };

};

stupidEngineFunction = function () {
    gameWithStupidEngine = true;
    gameWithEngine=true;
    if (indexKL == 1) {
        lastStep = "piros";
    }
    if (indexKL % 2 == 1) {
        lastStep = "kék";
    }
    placeIsFree == false;
    while (placeIsFree == false) {
        engineStep = Math.ceil(Math.random() * 9)
        if (document.querySelector(`.mill[name='${engineStep}']`).innerHTML == "_") {
            placeIsFree = true;
        };

        document.querySelector(`.mill[name='${engineStep}']`).innerHTML = "&#128308"
        console.log("buta gép lépett - whatPlaceIsReserved: ", whatPlaceIsReserved);
        whatPlaceIsReserved[whatPlaceIsReserved.length] = engineStep;
    };
    indexKL = indexKL + 1;

    gameWithStupidEngine = false;

    console.log("indexKL: ", indexKL)
    console.log("stepCounter: ", stepCounter)
    console.log("lasStep: ", lastStep)
}

gameWithCleverEngineFunction = function () {
    gameWithCleverEngine = true;
    //if (indexKL % 2 == 0) { lastStep = "piros"; }
    //else { lastStep = "kék"; };
    itIsRight = 0;
    engineStep = 0;
    engineSteps = Array();
    if (stepCounter == 0) {
        engineStep = 5; engineSteps[engineSteps.length] = engineStep; document.querySelector(`.mill[name='${engineSteps[engineSteps.length - 1]}']`).innerHTML = "&#128308"
        whatPlaceIsReserved[whatPlaceIsReserved.length] = engineStep;
    }
    else {
        for (let i = 0; i < whatPlaceIsReservedAllRed.length; i++) {
            for (let j = 0; j < whatPlaceIsReserved.length; j++) {
                if (whatPlaceIsReserved[j] == whatPlaceIsReservedAllRed[i][j] && itIsRight < whatPlaceIsReserved.length + 1) { itIsRight = itIsRight + 1; engineStep = whatPlaceIsReservedAllRed[i][j + 1]; }

            };
        };
        engineSteps[engineSteps.length] = engineStep;
        document.querySelector("#setting").innerHTML = "most az okos gép lépett."
    };

    //console.log(document.querySelector(`.mill[name='${engineSteps[engineSteps.length - 1]}']`).innerHTML == "_");
    if (thereIsWinner == false && itIsRight >= whatPlaceIsReserved.length && document.querySelector(`.mill[name='${engineSteps[engineSteps.length - 1]}']`).innerHTML == "_") {
        engineStep = whatPlaceIsReservedAllRed[i][whatPlaceIsReserved.length]; document.querySelector(`.mill[name='${engineSteps[engineSteps.length - 1]}']`).innerHTML = "&#128308"
        whatPlaceIsReserved[whatPlaceIsReserved.length] = engineSteps[engineSteps.length - 1];
        document.querySelector(`.mill[name='${engineSteps[engineSteps.length - 1]}']`).innerHTML = "&#128308"
        //if (lastStep == "kék") { lastStep = "piros" };
        //if (lastStep == "piros") { lastStep = "kék" };
        document.querySelector("#setting").innerHTML = "most az okos gép lépett."

    }
    /*else {
        //if(gameWithStupidEngine==true){
         gameWithStupidEngineFunction();
        document.querySelector("#setting").innerHTML = "most mégis a buta gép lépett - nem volt még elég a tanulás"   
       // };
        
    }*/
    checkWinner();
    console.log(whatPlaceIsReserved);

    itHappened = false;
    //gameWithCleverEngine = false;
    indexKL = indexKL + 1;
    stepCounter = stepCounter + 1;

    console.log("a játékos lépett - whatPlaceIsReserved: ", whatPlaceIsReserved);
    console.log("indexKL: ", indexKL)
    console.log("lastStep: ", lastStep)
    console.log("stepCounter: ", stepCounter);

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



kiMitTud = Array();
gepiTanulasFunction = function () {
    console.log("gépi tanulás elkezdődött")
    thisIsEngineLearning = true;
    lastStep = "nothing"
    runningNumber = document.querySelector("#runNumber").value;
    runningNumber = parseInt(runningNumber);
    for (let i = 0; i < runningNumber; i++) {
        if (i % 1000 == 0) { console.log("ennyi tanulójáték futott le eddig: ", i) }
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
            if (thereIsWinner == false) { myGame[myGame.length] = engineStep; };
            if (thereIsWinner == false) { ellenGep() };
            if (thereIsWinner == false) { checkWinner() };
            if (thereIsWinner == false) { myGame[myGame.length] = engineStep; };
            indexKL = indexKL + 1;
        };



        kiMitTud[kiMitTud.length] = myGame;
        //whatPlaceIsReservedAll[whatPlaceIsReservedAll.length] = whatPlaceIsReserved;
        whereIStep[whereIStep.length] = engineStep;
    }
    thisIsEngineLearning = false;
    //console.log("gépi tanulás vége");
    for (i = 0; i < whatPlaceIsReservedAll.length; i++) {
        if (whatPlaceIsReservedAll[i][whatPlaceIsReservedAll[i].length - 1] == "piros") {
            whatPlaceIsReservedAllRed[whatPlaceIsReservedAllRed.length] = whatPlaceIsReservedAll[i];
            whatPlaceIsReservedAll[i].shift();
        };
        if (whatPlaceIsReservedAll[i][whatPlaceIsReservedAll[i].length - 1] == "kék") {
            whatPlaceIsReservedAllBlue[whatPlaceIsReservedAllBlue.length] = whatPlaceIsReservedAll[i];
        };
    };

    whatPlaceIsReservedAll2 = whatPlaceIsReservedAll2 + whatPlaceIsReservedAll.length
    numberOfRed = whatPlaceIsReservedAllRed.length;
    numberOfBlue = whatPlaceIsReservedAllBlue.length;
    numberOfUndecided = whatPlaceIsReservedAll2 - numberOfRed - numberOfBlue;
    document.querySelector("#setting").innerHTML = "most a gépi tanulás futott be"
    percentOfRed = ((whatPlaceIsReservedAllRed.length / whatPlaceIsReservedAll.length) * 100).toFixed(1)
    percentOfBlue = ((whatPlaceIsReservedAllBlue.length / whatPlaceIsReservedAll.length) * 100).toFixed(1)
    percentOfUndecided = ((numberOfUndecided / whatPlaceIsReservedAll2) * 100).toFixed(1);

    document.querySelector("#setting").innerHTML = "a tanulójátékok lefutottak";
    document.querySelector("#allGames").innerHTML = whatPlaceIsReservedAll.length;
    document.querySelector("#redWon").innerHTML = `${numberOfRed}`;
    document.querySelector("#redPercent").innerHTML = `${percentOfRed} %`;
    document.querySelector("#blueWon").innerHTML = numberOfBlue;
    document.querySelector("#bluePercent").innerHTML = `${percentOfBlue} %`;
    document.querySelector("#noWon").innerHTML = numberOfUndecided;
    document.querySelector("#noWonPercent").innerHTML = `${percentOfUndecided} % `;
    console.log("gépi tanulás vége");
    console.log("whatPlaceIsReservedAll", whatPlaceIsReservedAll);

};

gepiTanulasLenullázásaFunction = function () {
    kiMitTud = Array();
    whatPlaceIsReserved = Array();
}

checkWinner = function () {
    thereIswinner = false;
    undecided = false;
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
                    document.querySelector("#winner").innerHTML = `nyert a ${lastStep} `
                    whatPlaceIsReserved[whatPlaceIsReserved.length] = lastStep;


                    thereIsWinner = true;

                }
                else { if (stepCounter == 9) { finishAndUndecided = true; }; };
                if (stepCounter == 9 && thereIsWinner == false) {
                    thereIsWinner = true;
                    document.querySelector("#uccsoWinner").innerHTML = "döntetlen";
                    isDontetlen = true;
                    undecided = true;


                };

            };
        };




        if (thereIsWinner == true && isDontetlen == false) { document.querySelector("#uccsoWinner").innerHTML = lastStep; isDontetlen = false; }
        if (thereIsWinner == true) { break };
    };
    //if (thereIsWinner == true) { break };

    document.querySelector("#uccsoWinner").innerHTML = document.querySelector("#uccsoWinner").innerHTML = lastStep;

    if (thereIsWinner == true) { whatPlaceIsReservedAll[whatPlaceIsReservedAll.length] = whatPlaceIsReserved; }
    //console.log("whatPlaceIsReserved: ", whatPlaceIsReserved);
    //console.log("whatPlaceIsReservedAll: ", whatPlaceIsReservedAll);

    if (thisIsEngineLearning) { runningNumber = document.querySelector("#runNumber").value; }



    /*if (thereIsWinner == true) {
        document.querySelector("#winner").innerHTML = `nyert a ${ lastStep } `
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
    if (finishAndUndecided == true) {

        document.querySelector("#winner").innerHTML = "Döntetlen";
    }
    if(thereIsWinner == true){document.querySelector("#winner").innerHTML = lastStep;}
    document.querySelector("#allGames").innerHTML = whatPlaceIsReservedAll.length;

    /*if (thereIsWinner == false && stepCounter==9 && whatPlaceIsReserved[whatPlaceIsReserved.length-1]!="piros" && whatPlaceIsReserved[whatPlaceIsReserved.length-1]!="kék") {
        whatPlaceIsReserved[whatPlaceIsReserved.length]="döntetlen";
    }*/
    /*if(thereIsWinner ==true && isDontetlen==true && stepCounter==9 && whatPlaceIsReserved[whatPlaceIsReserved.length-1]!="piros" && whatPlaceIsReserved[whatPlaceIsReserved.length-1]!="kék"){
        whatPlaceIsReserved[whatPlaceIsReserved.length]="döntetlen"*/
    if (undecided == true && whatPlaceIsReserved[whatPlaceIsReserved.length - 1] != "piros" && whatPlaceIsReserved[whatPlaceIsReserved.length - 1] != "kék") {
        whatPlaceIsReserved[whatPlaceIsReserved.length] = "döntetlen"

    }
    if (thereIsWinner == true) { whatPlaceIsReserved = Array() }
    isDontetlen = false;
    undecided = false;
};

gepiTanulasLenullázásaFunction = function () {
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
    whatPlaceIsReservedAll = Array();
    whatPlaceIsReservedAllRed = Array();
    enginStep = -10;
    whatPlaceIsReservedAll2 = 0;
    noData();
    document.querySelector("#setting").innerHTML = "számlálók lenullázva";
    itHappened = false;
};

newGameFunction = function () {
    whatPlaceIsReserved = Array();
    indexKL = 1;
    stepCounter = 0;

    document.querySelector("#winner").innerHTML = " döntetlen ";
    for (let i = 0; i < 9; i++) {
        document.querySelectorAll(".mill")[i].innerHTML = "_";
    };
    thereIsWinner = false;



    enginStep = -10;
    //whatPlaceIsReservedAll2 = 0;
    document.querySelector("#setting").innerHTML = "új játék";
    document.querySelector("#winner").innerHTML = " - ";
    finish = false;
    //player1 = 0;
    //player2 = 0;
    itHappened = false;

};

szamlaloNullazasa = function () {
    player1 = 0;
    player2 = 0;
    document.querySelector("#resultPlayer1").innerHTML = player1;
    document.querySelector("#resultPlayer2").innerHTML = player2;

};

noData = function () {

    document.querySelector("#allGames").innerHTML = " - ";
    document.querySelector("#redWon").innerHTML = " - ";
    document.querySelector("#redPercent").innerHTML = " - ";
    document.querySelector("#blueWon").innerHTML = " - ";
    document.querySelector("#bluePercent").innerHTML = " - ";
    document.querySelector("#noWon").innerHTML = " - ";
    document.querySelector("#noWonPercent").innerHTML = " - ";;
};


