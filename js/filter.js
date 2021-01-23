// MAIN BAR

inputBar = document.getElementById("recentInput");

inputBar.addEventListener("input", filter);

function filter() {
    ulSec = document.getElementById("RECENTUSERS");
    listItems = ulSec.getElementsByTagName("li");
    search = inputBar.value.toLowerCase();

    for (let i = 0; i < listItems.length; i++) {
        tagValue = listItems[i].getElementsByTagName("h4")[0];
        text = tagValue.innerHTML.toLowerCase();
        found = text.indexOf(search);
        if (search == '') {
            listItems[i].style.display = "block";
        } else if (found == -1) {
            listItems[i].style.display = "none";
        } else {
            listItems[i].style.display = "block";
        }
    }
}


// USERS BAR
inputBarSec = document.getElementById("AllUsersInput");

inputBarSec.addEventListener("input", filterSec);

function filterSec() {
    ulSec_Sec = document.getElementById("ALLUSERSID");
    listItems_Sec = ulSec_Sec.getElementsByTagName("li");
    search_Sec = inputBarSec.value.toLowerCase();

    for (let i = 0; i < listItems_Sec.length; i++) {
        tagValue = listItems_Sec[i].getElementsByTagName("h4")[0];
        text = tagValue.innerHTML.toLowerCase();
        found = text.indexOf(search_Sec);
        if (search_Sec == '') {
            listItems_Sec[i].style.display = "block";
        } else if (found == -1) {
            listItems_Sec[i].style.display = "none";
        } else {
            listItems_Sec[i].style.display = "block";
        }
    }
}
