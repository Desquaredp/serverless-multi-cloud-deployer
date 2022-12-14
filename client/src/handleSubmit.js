import React from "react";
import {selectOptions} from "@testing-library/user-event/dist/select-options";

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
        }
    )


}

export default handleSubmit;
