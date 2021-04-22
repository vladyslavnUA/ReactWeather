import { useState } from 'react'
import { gql } from '@apollo/client'
import { client } from './index'
import { useFormik, Field } from 'formik';
// import { Formik,  Form } from 'formik';

export function Weather() {
    const [ zip, setZip ] = useState('')
    const [ picked, setPick ] = useState('')
    const [ weather, setWeather ] = useState(null)
    var errmess = '';

    async function getWeather() {
        try {
          const json = await client.query({
            //   , units: ${picked}
            query: gql`
              query {
                getWeather(zip:${zip}, units: ${picked}) {
                  temperature
                  description
                  feels_like
                  temp_min
                  temp_max
                  pressure
                  humidity
                  cod
                }
              }
            `
          })
          setWeather(json)
          console.log(json)
        } catch(err) {
          console.log(err.message)
        }
    }

    const validate = values => {
        const errors = {};
        if (!values.zip) {
          errors.zip = 'Zip code is required';
        } 
        // else if (values.zip.length > 5) {
        //   errors.zip = 'Zip code must be 5 characters';
        // }
      
        // if (errmess) {
        //   errors.zip = 'Zip is invalid/ 404';
        // } 

        // else if (values.lastName.length > 20) {
        //   errors.lastName = 'Must be 20 characters or less';
        // }
      
        return errors;
    };

    const formik = useFormik({
        initialValues: {
          zip: '',
          picked: ''
        },
        validate,
        onSubmit: values => {
          getWeather()

        //   alert(JSON.stringify(values, null, 2));
        },
    });
  
    return (
        <div className="Weather">

            {weather ? 
                
                (
                    <>
                    <h1>For Zip: {zip}</h1>
                    <table>
                        <tr>
                            <th>Temperature</th>
                            <td>{weather.data.getWeather.temperature}</td>
                        </tr>
                        <tr>
                            <th>Description</th>
                            <td>  {weather.data.getWeather.description}</td>
                        </tr>
                        <tr>
                            <td>Feels Like</td>
                            <td>{weather.data.getWeather.feels_like}</td>
                        </tr>
                        <tr>
                            <th>Min. Temp.</th>
                            <td>{weather.data.getWeather.temp_min}</td>
                        </tr>
                        <tr>
                            <th>Max. Temp.</th>
                            <td>{weather.data.getWeather.temp_max}</td>
                        </tr>
                        <tr>
                            <th>Pressure</th>
                            <td>{weather.data.getWeather.pressure}</td>
                        </tr>
                        <tr>
                            <th>Humidity</th>
                            <td>{weather.data.getWeather.humidity}</td>
                        </tr>
                    </table>
                    </>
                )
            
                : null}

            <br/>
            <h1>Enter Zip Code</h1>
            {/* onSubmit={formik.handleSubmit} */}
            <form onSubmit={(e) => {
                    e.preventDefault()
                    getWeather()
                }}>
                <input
                    value={zip}
                    name="zip"
                    onChange={(e) => setZip(e.target.value)}/>
                <input type="radio" 
                    name="picked" 
                    value="standard"
                    onChange={(e) => setPick(e.target.value)} 
                    checked={picked==='standard'? true : false}
                    />Standard
                <input type="radio" 
                    name="picked" 
                    value="metric"
                    onChange={(e) => setPick(e.target.value)} 
                    checked={picked==='metric'? true : false}/>Metric
                <br/>
                <button type="submit">Submit</button>
            </form>
        </div>


        // <div className="Weather">

        //     {weather ? <h1>{weather.data.getWeather.temperature}</h1>: null}

        //     <form onSubmit={(e) => {
        //             e.preventDefault()
        //             getWeather()
        //         }}>
        //     <input value={zip}
        //         onChange={(e) => setZip(e.target.value)} />
        //         <button type="submit">Submit</button>
        //     </form>
        // </div>
    );
  }


export default Weather