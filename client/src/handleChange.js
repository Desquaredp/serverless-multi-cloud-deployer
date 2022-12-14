import React, {useEffect, useState} from 'react' ;
import handleSubmit from  './handleSubmit' ;


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

                console.log('data', data);
                const listOfParams = data.response;
                console.log('listOfParams', listOfParams);

                //create a form and append it to the body of the page dynamically using React DOM
                const form = document.createElement( "form" );
                form.setAttribute( "id" ,  "form" );
                form.setAttribute( "onSubmit" , handleSubmit);


//iterate over the list of params and create a label and input element for each param
                listOfParams.forEach(param => {
                    const label = document.createElement( "label" );
                    label.setAttribute( "for" , param);
                    label.innerHTML = param;
                    form.appendChild(label);
                    const input = document.createElement( "input" );
                    input.setAttribute( "type" ,  "text" );
                    input.setAttribute( "name" , param);
                    form.appendChild(input);
                });

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
                submitButton.innerHTML =  "Submit" ;
                form.appendChild(submitButton);


                //append the form to the body of the page
                document.body.appendChild(form);








            })



            .then(res => console.log(res));
    }


    //post the selected option to the server
    // console.log('selectedOption', selectedOption);





}

export default  handleChange;
