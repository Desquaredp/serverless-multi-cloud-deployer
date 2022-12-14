import React from "react";
import {selectOptions} from "@testing-library/user-event/dist/select-options";
//import bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';

function handleSubmit(event) {
    event.preventDefault();

    //get the form data
    const data = new FormData(event.target);

    //create an object to store the form data
    const formData = {};

    //iterate over the form data
    for (let [key, value] of data.entries()) {
        formData[key] = value;
    }
    const json = JSON.stringify(formData);



    //show loading animation using bootstrap green loading bar
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




    //post the form data to the server
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

            //remove the loading animation
            const loading = document.getElementById("loading");
            loading.remove();

            //display the data from the server using bootstrap, and pretty print the JSON
            const alert = document.createElement("div");
            //if the response is an error, display it in a red alert
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


            //create a file to download the response from the server as a JSON file using the file-saver package
            const FileSaver = require('file-saver');
            //inclue the formData in the file
            const response = {
                time: new Date().toLocaleString(),
                formData: formData,
                response: data.response
            }
            const blob = new Blob([JSON.stringify(response, null, 2)], {type: "text/plain;charset=utf-8"});

            // const blob = new Blob([JSON.stringify(data.response, null, 2)], {type: "text/plain;charset=utf-8"});
            // FileSaver.saveAs(blob, "response.json");


            //create a button to download the response from the server as a JSON file
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
