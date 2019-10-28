Object.keys(localStorage).forEach(function (key) {
    console.log(localStorage.getItem(key))
    var data = localStorage.getItem(key)
    var dataArray = data.split(",")

    var table = document.getElementById("artisTable")
    addRow(table, key, dataArray[0], dataArray[1])
})



function expandForm() {
    var newForm = document.getElementById("newForm");
    // newForm.style.display = "block";
    if (newForm.style.display === "none" || newForm.style.display === '') {
        newForm.style.display = "block";
    } else {
        newForm.reset();
        newForm.style.display = "none";
    }
}

function addArtist() {
    var imageURLForm = document.getElementById("imageURLForm").value
    var name = document.getElementById("artistNameForm").value;
    var aboutArtistForm = document.getElementById("aboutArtistForm").value;
    var table = document.getElementById("artisTable")
    var data = []
    data.push(name)
    data.push(aboutArtistForm)

    // localStorage.setItem(imageURLForm, data);
    addRow(table, imageURLForm, name, aboutArtistForm);
    var newForm = document.getElementById("newForm");
    if (newForm.style.display === "none" || newForm.style.display === '') {
        newForm.style.display = "block";
    } else {
        newForm.reset();
        newForm.style.display = "none";
    }


}

function addRow(table, url, nm, about) {
    var rowCnt = table.rows.length;
    var tr = table.insertRow(rowCnt);
    tr = table.insertRow(rowCnt);
    for (var c = 0; c < 3; c++) {
        var td = document.createElement('td');
        td = tr.insertCell(c);

        if (c == 0) {
            var image = document.createElement('img');
            image.setAttribute('src', url);
            td.appendChild(image)
        }
        if (c == 1) {
            var h3 = document.createElement('h3');
            h3.appendChild(document.createTextNode(nm))
            var p1 = document.createElement('p');
            var p2 = document.createElement('p');
            p2.appendChild(document.createTextNode(about))
            td.appendChild(h3);
            td.appendChild(p1);
            td.appendChild(p2);
        }
        if (c == 2) {
            var button = document.createElement('input');
            button.setAttribute('type', 'button');
            button.setAttribute('class', 'deleteBtn');
            button.setAttribute('value', 'Delete');
            button.setAttribute('onclick', 'removeRow(this)');
            td.appendChild(button);
        }
    }

}

function removeRow(oButton) {
    var table = document.getElementById('artisTable');
    var cell = table.rows[oButton.parentNode.parentNode.rowIndex].cells[1]
    // var url = cell.querySelector('img').src
    // console.log(url)
    var name = cell.querySelector('h3').innerHTML
    // console.log(cell.querySelector('h3').innerHTML)
    
    

    // localStorage.removeItem(url)
    
    
    $.ajax({
        url: "/people/deleteByName/" + name,
        type: "POST",
        data: {'name': name},
        success: function(){
            table.deleteRow(oButton.parentNode.parentNode.rowIndex);
        }

    })
}


function searchbarFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("artisTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}