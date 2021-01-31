
/* Getting Response from the source- github file */

var request = new XMLHttpRequest()

/* Url of JSON data */

var url = 'https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json';
request.open('GET', url, true)
request.send();
request.onload = function () {

    var tableData = JSON.parse(this.response)

/* object creation for pagination */

   var state = {
        'querySet': tableData,
        'page': 1,
        'prev': 1,
        'next': 2,
        'rows': 5,
        'window': 5,
    }


/* Creating DOM Elements for HTML */

    var container = document.createElement("div");
    container.setAttribute("class", "container intro");

    var row1= document.createElement("div");
    row1.setAttribute("class","row align-items-center justify-content-center")

    var col1 = document.createElement("div");
    col1.setAttribute("class","col-md-4");

    var img1= document.createElement('img');
    img1.setAttribute("src","Guvi.gif"); 
    img1.setAttribute("alt","gif");

    var col2= document.createElement('div');
    col2.setAttribute("class","col-md-8 text-center  heading");

    var line1 = document.createElement('h1');
    line1.innerHTML=`Guvi Zenclass Bootcamp- Full Stack`;

    var line2 = document.createElement('h2');
    line2.innerHTML=`WD20 Batch`;

    var line3 = document.createElement('h3');
    line3.innerHTML=`29-01-2021 Task-10`;

    var line4 = document.createElement('p');
    line4.innerHTML=`Prepared By: Myilvaganan S, myilsmp@gmail.com`;

    col2.append(line1,line2,line3,line4);
    col1.append(img1);
    row1.append(col1,col2);

    /* creating a table to show json data  */

    /* Table Title */

    var heading = document.createElement("h2");
    heading.setAttribute("class","table_title")
    heading.innerHTML = 'USERS DATA'

    /* Table */

    var tab = document.createElement("table");
    tab.setAttribute("class", "table table-bordered");
    tab.setAttribute("id", "our-table");

        /* Table- Head */

        var table_head = document.createElement("thead");
        var table_row1 = document.createElement("tr");

        var col1 = document.createElement("th");
        col1.innerHTML = 'ID';
        var col2 = document.createElement("th");
        col2.innerHTML = 'NAME';
        var col3 = document.createElement("th");
        col3.innerHTML = 'E-MAIL';

    table_row1.append(col1, col2, col3);
    table_head.append(table_row1);
  
        /* Table- Head */

        var table_body = document.createElement("tbody");
        table_body.setAttribute("id", "table-body");
            
    tab.append(table_head, table_body);

    /* Table- inner */

    var wrapper_down = document.createElement("div");
    wrapper_down.setAttribute("id", "pagination-wrapper");
    wrapper_down.setAttribute("class", "wrapper_down");

    container.append(row1,heading,tab,wrapper_down);

    document.body.append(container);


        /* invoking table creation function */

           buildTable();

           /* TRIMMING ONLY 10 DATA TO BE SHOWN IN SINGLE PAGE */

            function pagination(querySet, page, rows) {
               
                var trimStart = (page - 1) * rows; 
                var trimEnd = trimStart + rows;

                var trimmedData = querySet.slice(trimStart, trimEnd);

                var pages = Math.round(querySet.length / rows);

                return {
                    'querySet': trimmedData,
                    'pages': pages,
                }
            }

            /* BUTTONS LOGIC */

            function pageButtons(pages) {

                var wrapper = document.getElementById('pagination-wrapper');

                wrapper.innerHTML = ``;
          
                var maxLeft = (state.page - Math.floor(state.window / 2));
                var maxRight = (state.page + Math.floor(state.window / 2));

                if (maxLeft < 1) {
                    maxLeft = 1
                    maxRight = state.window
                }

                if (maxRight > pages) {
                    maxLeft = pages - (state.window - 1)

                    if (maxLeft < 1) {
                        maxLeft = 1
                    }
                    maxRight = pages;
                }

                wrapper.innerHTML += `<button value=${state.prev} class="page btn btn-sm ">&#171; Previous</button>`;
                for (var page = maxLeft; page <= maxRight; page++) {
                    wrapper.innerHTML += `<button value=${page} class="page btn btn-sm ">${page}</button>`
                }
                wrapper.innerHTML += `<button value=${state.next} class="page btn btn-sm ">Next  &#187;</button>`;

                if (state.page != 1) {
                    wrapper.innerHTML = `<button value=${1} class="page btn btn-sm ">First</button>${wrapper.innerHTML}`
                }

                if (state.page != pages) {
                    wrapper.innerHTML = `${wrapper.innerHTML}<button value=${pages} class="page btn btn-sm ">Last</button>`
                }


                [...document.querySelectorAll('.page')].forEach(function (item) {
                    item.addEventListener('click', function () {
                        debugger
                        document.querySelector("#table-body").innerHTML = '';
                        let pageVal = +this.value;
                        state.page = pageVal;
                        state.prev = (pageVal == 1) ? 1 : (pageVal - 1);
                        state.next = (pageVal == pages) ? (pages) : (pageVal + 1);
                        console.log(state.prev, state.next);
                        buildTable();
                    });
                });

            }

            /* Creating inner table elements - filtering only 10 data using pagination function  */

            function buildTable() {
    
                var table = document.querySelector("#table-body");
                var data = pagination(state.querySet, state.page, state.rows);
                var myList = data.querySet;

                for (var i = 1 in myList) {

                    var row = document.createElement("tr");

                    var td1 = document.createElement("td");
                    td1.innerHTML = myList[i].id;

                    var td2 = document.createElement("td");
                    td2.innerHTML = myList[i].name;

                    var td3 = document.createElement("td");
                    td3.innerHTML = myList[i].email;

                    row.append(td1, td2, td3);
                    table_body.append(row);
                }
                pageButtons(data.pages);
            }
}