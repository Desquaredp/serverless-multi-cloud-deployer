import React, {useEffect, useState} from 'react' ;
import handleSubmit from  './handleSubmit' ;

import 'bootstrap/dist/css/bootstrap.min.css';

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
            //generate a form based on the list of params
            .then(data => {

                const listOfParams = data.response;


                //use bootstrap to style the form and button elements, and to display the form in a modal dialog
                const form = document.createElement( "form" );
                form.setAttribute( "id" ,  "form" );
                form.setAttribute( "onSubmit" , handleSubmit);
                form.setAttribute( "class" ,  "form-group" );

                //iterate over the list of params and create a label and input element for each param
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

                //set a hidden input element to store the selected option
                const hiddenInput = document.createElement( "input" );
                hiddenInput.setAttribute( "type" ,  "hidden" );
                hiddenInput.setAttribute( "name" ,  "selectedOption" );
                hiddenInput.setAttribute( "value" , selectedOption);
                form.appendChild(hiddenInput);


                //onSubmit, call the handleSubmit function
                form.addEventListener( "submit" , handleSubmit);

                //create a submit button
                const submitButton = document.createElement( "button" );
                submitButton.setAttribute( "type" ,  "submit" );
                submitButton.setAttribute( "class" ,  "btn btn-primary" );
                submitButton.innerHTML =  "Submit" ;
                form.appendChild(submitButton);





                //append the form to the body of the page
                document.body.appendChild(form);



            })

    }else{

        window.location.href =  "/" ;

    }




}

export default  handleChange;
