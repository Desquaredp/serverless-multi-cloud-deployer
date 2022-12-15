import React, {useEffect, useState} from "react";
import handleChange from "./handleChange";

import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * This function is called when the user selects a provider from the dropdown menu.
 * **/

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

        <div className="container-fluid"  style={{marginTop: 50}}>
            <div className="row">
                <div className="col-md-6 offset-md-3"  style={{textAlign: "center"}}>
                    <h1> Select a provider </h1>
                    <select onChange={handleChange} id="select"  style={{marginBottom: 20}}>
                        <option value="0">Select a provider</option>
                        <option value="GCP Cloud Run">GCP Cloud Run</option>
                        <option value="Azure Container Instances">Azure Container Instances</option>
                    </select>
                </div>
            </div>
        </div>

  );
}


export default App;