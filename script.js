var timeoutHandle = null;
var triesWhereLoadButtonIsHidden = 0;

function AddNewRow() {
    var BottomSection = document.getElementsByClassName('load_more_history_area')[0];

    BottomSection.appendChild(document.createElement("br"));
    BottomSection.appendChild(document.createElement("br"));
}

function AddButton( title, callback ) {
    var BottomSection = document.getElementsByClassName('load_more_history_area')[0];

    var link        = document.createElement("a");
    link.onclick = callback;


    var link_div    = document.createElement("div");

    link_div.className  = 'btnv6_blue_hoverfade btn_medium';
    link_div.style  = 'display: inline-block; margin: 5px;';
    link_div.textContent = title;

    link.appendChild(link_div);
    BottomSection.appendChild(link);
}

function AddNewParagraph(text) {
    var BottomSection = document.getElementsByClassName('load_more_history_area')[0];


    var paragraphElement = document.createElement("p");

    paragraphElement.innerHTML = text;

    BottomSection.appendChild(paragraphElement);
    return paragraphElement;
}

function FetchHistory() {
    var LoadButton = document.getElementById('load_more_button');

    if( LoadButton.style.display == "none" ) {

        triesWhereLoadButtonIsHidden += 1;

        if(triesWhereLoadButtonIsHidden > 3) {

            AddNewParagraph("Finished fetching data!");
            SumTotalAmountOfCases();
            return;
        }

        timeoutHandle = setTimeout(FetchHistory, 3000);
        return;
    }

    triesWhereLoadButtonIsHidden = 0;
    LoadButton.click();


    timeoutHandle = setTimeout(FetchHistory, 2000);
}

function StopFetchingHistory() {

    window.clearTimeout(timeoutHandle);
}

function SumTotalAmountOfCases() {
    var totalCasesOpened = 0;
    var totalCapsulesOpened = 0;
    var totalPatchesOpened = 0;
    var totalMissionRewards = 0;
    var openedKnives = [];

    var historyEventDescriptions = document.getElementsByClassName("tradehistory_event_description");

    for (let i = historyEventDescriptions.length - 1; i > 0; i--) 
    {
        let historyEventDescription = historyEventDescriptions[i].textContent.trim();
        if(historyEventDescription == "Unlocked a container") 
        {
            var parentElement = historyEventDescriptions[i].parentElement;
            
            var receivedGroup = null;
            var consumedGroup = null;
            
            var itemsDivs = parentElement.querySelectorAll('.tradehistory_items');
            for (var j = 0; j < itemsDivs.length; j++) {
                var plusMinus = itemsDivs[j].querySelector('.tradehistory_items_plusminus');
                if (plusMinus) {
                    if (plusMinus.textContent.trim() === '+') receivedGroup = itemsDivs[j];
                    if (plusMinus.textContent.trim() === '-') consumedGroup = itemsDivs[j];
                }
            }

            if (!receivedGroup || !consumedGroup) {
                console.log("Missing group for event index " + i, parentElement);
                continue;
            }

            if(consumedGroup.innerHTML.includes("Capsule")) {
                totalCapsulesOpened += 1;
            }
            else if(consumedGroup.innerHTML.includes("Patch")) {
                totalPatchesOpened += 1;
            }
            else {
                totalCasesOpened += 1;
            }
            
            var itemNameElem = receivedGroup.querySelector('.history_item_name');
            if(!itemNameElem) {
                console.log("No item name found for event index " + i, parentElement);
                continue;
            }
            
            var openedItemName = itemNameElem.innerHTML;

            if(openedItemName.includes("★")) {
                var caseGap = totalCasesOpened;
                if(openedKnives.length > 0)
                    caseGap = totalCasesOpened - openedKnives[openedKnives.length - 1].caseID;

                openedKnives.push( { elem: openedItemName, casesSinceLastOpen: caseGap, caseID: totalCasesOpened } );
            }
        }
        else{
            if(historyEventDescription == "Mission reward") {
                totalMissionRewards += 1;
            }
        }
    }

    console.log(openedKnives);

    TotalCasesText.innerHTML = "Total cases: " + totalCasesOpened;

    TotalCapsulesText.innerHTML = "Total capsules: " + totalCapsulesOpened;
    TotalPatchesText.innerHTML = "Total patches: " + totalPatchesOpened;
    TotalMissionRewardsText.innerHTML = "Total mission rewards: " + totalMissionRewards;
    TotalKnivesOpened.innerHTML = "Opened knives: <br>" + openedKnives.map( (e) =>  "It took you <b>" + e.caseID + "</b> cases to open the <p style=\"color: #8650AC;display: inline;\">" + e.elem + "</p>. This was opened <b>" + e.casesSinceLastOpen + "</b> cases after the previous knife<br>" ).join('');
}

AddNewRow();
AddButton("Start fetching history", FetchHistory);
AddButton("Stop fetching history", StopFetchingHistory);

AddButton("Sum total amount of cases", SumTotalAmountOfCases);

let TotalCasesText = AddNewParagraph("Total cases: 0");
let TotalCapsulesText = AddNewParagraph("Total capsules: 0");
let TotalPatchesText = AddNewParagraph("Total patches: 0");
let TotalMissionRewardsText = AddNewParagraph("Total mission rewards: 0");
let TotalKnivesOpened = AddNewParagraph("Opened knives: ");
