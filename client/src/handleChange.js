import React, {useEffect, useState} from 'react' ;
import handleSubmit from  './handleSubmit' ;

import 'bootstrap/dist/css/bootstrap.min.css';


/**
 * Handles the form submission.
 * **/
function handleChange(event)  {

    var selectedOption  = event.target.value;
    if(selectedOption !==  '0' ) {

        fetch('/index', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                selectedOption: selectedOption
            })
        })
            .then(res => res.json())
            .then(data => {

                const listOfParams = data.response;

                const form = document.createElement( "form" );
                form.setAttribute( "id" ,  "form" );
                form.setAttribute( "onSubmit" , handleSubmit);
                form.setAttribute( "class" ,  "form-group" );

                listOfParams.forEach(param => {
                    const label = document.createElement( "label" );
                    label.setAttribute( "for" , param);
                    label.innerHTML = param;
                    form.appendChild(label);
                    const input = document.createElement( "input" );
                    input.setAttribute( "type" ,  "text" );
                    input.setAttribute( "name" , param);
                    input.setAttribute( "class" ,  "form-control" );
                    form.appendChild(input);
                }
                );

                const hiddenInput = document.createElement( "input" );
                hiddenInput.setAttribute( "type" ,  "hidden" );
                hiddenInput.setAttribute( "name" ,  "selectedOption" );
                hiddenInput.setAttribute( "value" , selectedOption);
                form.appendChild(hiddenInput);

                form.addEventListener( "submit" , handleSubmit);

                const submitButton = document.createElement( "button" );
                submitButton.setAttribute( "type" ,  "submit" );
                submitButton.setAttribute( "class" ,  "btn btn-primary" );
                submitButton.innerHTML =  "Submit" ;
                form.appendChild(submitButton);

                document.body.appendChild(form);

            })

    }else{
        window.location.href =  "/" ;
    }

}

export default  handleChange;
