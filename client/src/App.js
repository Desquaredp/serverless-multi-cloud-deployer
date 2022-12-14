import React, {useEffect, useState} from "react";
import handleChange from "./handleChange";

function App() {
    const [data, setData] = useState({ hits: [] });


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

                <option value="0">Select a provider</option>
                <option value="GCP Cloud Run">GCP Cloud Run</option>
                <option value="Azure Container Instances">Azure Container Instances</option>


            </select>

        </header>
        </div>


  );
}


export default App;