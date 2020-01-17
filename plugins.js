var sendBtn = document.getElementById("send");

sendBtn.addEventListener("click", function () {
    var xhttp;

    // Test Support Browsers
    if (window.XMLHttpRequest) {
        // code for modern browsers
        xhttp = new XMLHttpRequest();
    } else {
        // code for old IE browsers
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    // Check the status of the request
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // display data when the request finished and response is ready
            displayResult(this);
        }
    };

    // send the request to the xml file;
    xhttp.open("GET", "book_catalog.xml", true);
    xhttp.send();
});

function displayResult(xml) {
    var i,
        xmlDoc = xml.responseXML,
        table = document.getElementById('demo')
        tbody = document.getElementById('tableBody'),
        x = xmlDoc.getElementsByTagName('BOOK'),
        tbody.innerHTML = '';

    // fill the table with xml data
    for (i = 0; i < x.length; i++) {
        // Create Row of table and Column
        var tr = document.createElement('tr'),
            tdIndex = document.createElement('td'),
            tdAuthor = document.createElement('td'),
            tdTitle = document.createElement('td'),
            tdPrice = document.createElement('td'),
            tdYear = document.createElement('td');

        // append returned data to created columns 
        tdIndex.append(i + 1);
        tdAuthor.append(x[i].getElementsByTagName("AUTHOR")[0].childNodes[0].nodeValue);
        tdTitle.append(x[i].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue);
        tdPrice.append(x[i].getElementsByTagName("PRICE")[0].childNodes[0].nodeValue);
        tdYear.append(x[i].getElementsByTagName("YEAR")[0].childNodes[0].nodeValue);

        // append columns to row 
        tr.appendChild(tdIndex);
        tr.appendChild(tdAuthor);
        tr.appendChild(tdTitle);
        tr.appendChild(tdPrice);
        tr.appendChild(tdYear);

        // append row to Tbody
        tbody.appendChild(tr);
    }
    // append Tbody to the demo table
    table.appendChild(tbody);

    // show the table and title
    document.getElementById("page-desc").style.display = "none";
    document.getElementById("result-container").style.display = "block";
}

// on th Click sort the table and change the style
var th = document.getElementsByTagName('th'),
    j,
    k = 0;
for(let j = 0; j < th.length; j++) {
    th[j].addEventListener("click", function () {
        th[k].classList.remove('selected');
        k = j;
        sortTable(j);
        th[j].classList.add('selected');
    });

}

function sortTable(tdIndex) {
    var tableBody, rows, switching, i, x, y, shouldSwitch;
    tableBody = document.getElementById("tableBody");
    switching = true;
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
        //start by saying: no switching is done:
        switching = false;
        rows = tableBody.rows;
        /*Loop through all table rows (except the
        first, which contains table headers):*/
        for (i = 0; i < (rows.length - 1); i++) {
            //start by saying there should be no switching:
            shouldSwitch = false;
            /*Get the two elements you want to compare,
            one from current row and one from the next:*/
            x = rows[i].getElementsByTagName("TD")[tdIndex];
            // console.log(x);
            y = rows[i + 1].getElementsByTagName("TD")[tdIndex];

            if (tdIndex == 1 || tdIndex == 2) {
                //check if the two rows should switch place:
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            } else {
                    //check if the two rows should switch place:
                if (Number.parseFloat(x.innerHTML) > Number.parseFloat(y.innerHTML)) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }

            }            
        }
        if (shouldSwitch) {
            /*If a switch has been marked, make the switch
            and mark that a switch has been done:*/
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}