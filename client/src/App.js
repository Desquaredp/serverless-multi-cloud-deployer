import React, {useEffect, useState} from "react";

function App() {
    const [data, setData] = useState({ hits: [] });

    const handleChange = (event) => {
        // setSelectedOption(event.target.value);

        // You can add your code for handling the selected option here
        switch (event.target.value) {
            case '1':
                // run option 1 function

                // console.log('GCP Cloud Run');
                console.log('GCP Cloud Run');


                break;
            case '2':
                // run option 2 function
                console.log('Azure Container Instances');
                break;

                default:
                    console.log('default');

            }
    }

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch('/index');
            const body = await result.json();
            setData(body);
        };
        fetchData();
    },  []);

  return (


      <div className="App">
        <header className="App-header">
            <h1> Select a provider </h1>


            <select onChange={handleChange}>
            {/* provide the options for the select element. They will be displayed as dropdown items. Proivders
            that can be used should be: GCP Cloud Run and Azure Container Instances */}
                <option value="0">Select a provider</option>
                <option value="1">GCP Cloud Run</option>
                <option value="2">Azure Container Instances</option>


            </select>

        </header>
        </div>


  );
}


export default App;