import React from "react";

import 'bootstrap/dist/css/bootstrap.min.css';


/**
 * Handles the form submission.
 * **/
function handleSubmit(event) {
    event.preventDefault();

    const data = new FormData(event.target);

    const formData = {};

    for (let [key, value] of data.entries()) {
        formData[key] = value;
    }

    const loading = document.createElement("div");
    loading.setAttribute("id", "loading");
    loading.setAttribute("class", "progress");
    const loadingBar = document.createElement("div");
    loadingBar.setAttribute("class", "progress-bar progress-bar-striped progress-bar-animated bg-success");
    loadingBar.setAttribute("role", "progressbar");
    loadingBar.setAttribute("aria-valuenow", "100");
    loadingBar.setAttribute("aria-valuemin", "0");
    loadingBar.setAttribute("aria-valuemax", "100");
    loadingBar.setAttribute("style", "width: 100%");
    loading.appendChild(loadingBar);
    document.body.appendChild(loading);

    fetch('/deployment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            formData: formData
        })

    }).then(res => res.json())
        .then(data => {
            const loading = document.getElementById("loading");
            loading.remove();


            const alert = document.createElement("div");
            alert.setAttribute("class", "alert alert-success");
            alert.setAttribute("role", "alert");

            if (data.response.error) {

                alert.setAttribute("class", "alert alert-danger");
                alert.setAttribute("role", "alert");
                alert.innerHTML = JSON.stringify(data.response, null, 2);
                document.body.appendChild(alert);
            }else {
                alert.setAttribute("class", "alert alert-success");
                alert.setAttribute("role", "alert");
                alert.innerHTML = JSON.stringify(data.response, null, 2);
                document.body.appendChild(alert);
            }


            const FileSaver = require('file-saver');
            const response = {
                time: new Date().toLocaleString(),
                formData: formData,
                response: data.response
            }
            const blob = new Blob([JSON.stringify(response, null, 2)], {type: "text/plain;charset=utf-8"});


            const button = document.createElement("button");
            button.setAttribute("class", "btn btn-primary");
            button.setAttribute("type", "button");
            button.setAttribute("id", "downloadButton");
            button.innerHTML = "Download Response";
            document.body.appendChild(button);
            button.addEventListener("click", function () {
                var fileName = "";
                if(response.response.error) {
                     fileName = response.time + " - " + "failure" + ".json";
                }else{
                        fileName = response.time + " - " + "success" + ".json";
                }
                FileSaver.saveAs(blob, fileName);

            });






        });


}

export default handleSubmit;
