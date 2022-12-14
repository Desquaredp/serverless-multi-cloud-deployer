import React from "react";
import {selectOptions} from "@testing-library/user-event/dist/select-options";
//import bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';

function handleSubmit(event) {
    event.preventDefault();
    console.log('event', event);

    //get the form data
    const data = new FormData(event.target);

    //create an object to store the form data
    const formData = {};

    //iterate over the form data
    for (let [key, value] of data.entries()) {
        formData[key] = value;
    }
    console.log('formData', formData);
    const json = JSON.stringify(formData);
    console.log('json', json);

    //show loading animation until the response is received
    const loading = document.createElement("div");
    loading.setAttribute("id", "loading");
    loading.innerHTML = "Loading...";
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
            console.log('data', data);

            //remove the loading animation
            const loading = document.getElementById("loading");
            loading.remove();

            //display the data from the server in a bootstrap alert

            const alert = document.createElement("div");
            alert.setAttribute("class", "alert alert-success");
            alert.setAttribute("role", "alert");
            alert.innerHTML = JSON.stringify(data.response);
            document.body.appendChild(alert);




        });


}

export default handleSubmit;
