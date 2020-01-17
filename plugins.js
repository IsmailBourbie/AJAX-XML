var sendBtn = document.getElementById("send");

sendBtn.addEventListener("click", function() {
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
        x = xmlDoc.getElementsByTagName('BOOK');
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
            tdIndex.append(i+1);
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
    table.style.display = "table";
    document.getElementById("tableTitle").style.display = "block";
}