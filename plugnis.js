function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            myFunction(this);
        }
    };
    xhttp.open("GET", "cd_catalog.xml", true);
    xhttp.send();
}
function myFunction(xml) {
    var i;
    var xmlDoc = xml.responseXML;

    console.log(xml);
    var content = "";
    var x = xmlDoc.getElementsByTagName("CD");
    for (i = 0; i < x.length; i++) {
        content += "<tr><td>" +
            (i+1) + "</td><td>" +
            x[i].getElementsByTagName("ARTIST")[0].childNodes[0].nodeValue +
            "</td><td>" +
            x[i].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue +
            "</td><td>" +
            x[i].getElementsByTagName("PRICE")[0].childNodes[0].nodeValue +
            "</td><td>" +
            x[i].getElementsByTagName("YEAR")[0].childNodes[0].nodeValue +
            "</td></tr>";
    }
    document.getElementById("tableBody").innerHTML = content;
    document.getElementById("demo").style.display = "table";
}