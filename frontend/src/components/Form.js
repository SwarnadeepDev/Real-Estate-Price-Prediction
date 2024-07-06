import React, { useState } from 'react';
import axios from 'axios';

function Form() {
  const [formData, setFormData] = useState({
    CRIM: '', ZN: '', INDUS: '', CHAS: '', NOX: '', RM: '', AGE: '', DIS: '', RAD: '', TAX: '', PTRATIO: '', B: '', LSTAT: ''
  });
  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/predict', formData)
      .then(response => {
        setPrediction(response.data.prediction);
      })
      .catch(error => {
        console.error('There was an error making the request!', error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="number" name="CRIM" placeholder="Per capita crime rate by town (CRIM)" onChange={handleChange} />
        <input type="number" name="ZN" placeholder="Proportion of residential land zoned for lots over 25,000 sq. ft. (ZN)" onChange={handleChange} />
        <input type="number" name="INDUS" placeholder="Proportion of non-retail business acres per town (INDUS)" onChange={handleChange} />
        <input type="number" name="CHAS" placeholder="Charles River dummy variable (CHAS)" onChange={handleChange} />
        <input type="number" name="NOX" placeholder="Nitric oxides concentration (NOX)" onChange={handleChange} />
        <input type="number" name="RM" placeholder="Average number of rooms per dwelling (RM)" onChange={handleChange} />
        <input type="number" name="AGE" placeholder="Proportion of owner-occupied units built prior to 1940 (AGE)" onChange={handleChange} />
        <input type="number" name="DIS" placeholder="Weighted distances to five Boston employment centres (DIS)" onChange={handleChange} />
        <input type="number" name="RAD" placeholder="Index of accessibility to radial highways (RAD)" onChange={handleChange} />
        <input type="number" name="TAX" placeholder="Full-value property tax rate per $10,000 (TAX)" onChange={handleChange} />
        <input type="number" name="PTRATIO" placeholder="Pupil-teacher ratio by town (PTRATIO)" onChange={handleChange} />
        <input type="number" name="B" placeholder="1000(Bk - 0.63)^2 where Bk is the proportion of Black people by town (B)" onChange={handleChange} />
        <input type="number" name="LSTAT" placeholder="Percentage lower status of the population (LSTAT)" onChange={handleChange} />
        <button type="submit">Predict</button>
      </form>
      {prediction && <h2>Predicted Price: ${prediction}</h2>}
    </div>
  );
}

export default Form;
