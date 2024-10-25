import React from 'react'
import './footerPage.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCcVisa } from "@fortawesome/free-brands-svg-icons";
// import { faCcMastercard } from "@fortawesome/free-brands-svg-icons";
// import { faCcPaypal } from "@fortawesome/free-brands-svg-icons";
// import { faGooglePlay } from "@fortawesome/free-brands-svg-icons";
// import { faCcVisa } from "@fortawesome/free-solid-svg-icons";
// import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
// import { faAppStore } from "@fortawesome/free-brands-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
    // const [year, setYear] = useSate()
    const year = new Date().getFullYear()

    return(
       <div>
        <div className="footer-diveder"  />
         <div className="footer-soulmate-2" >
           
         <div>Copyright &copy; {year} Meet Your SoulMate </div>
         <div className='whatsapp-number-footer'> 
                 <FontAwesomeIcon className='country-icon-whatsapp-footer'  icon={faPhone}  />
                 +31 387-381-122
         </div>
         </div>
         </div>
         
    )
}

export default Footer;

/* To achieve a similar text analysis in JavaScript for use in a React application, you can utilize libraries like Hugging Face's transformers via their transformers.js library. However, because transformers.js is still in development and might not support all models, an alternative approach is to use a service like Hugging Face's Inference API, which allows you to send HTTP requests to their models.

Here's a step-by-step example using the Hugging Face Inference API to classify text in a React application:

Step 1: Set Up React Application
First, make sure you have a React application set up. If you don't already have one, you can create it using Create React App:

sh
Copy code
npx create-react-app text-analysis
cd text-analysis
npm start
Step 2: Install Axios
Install Axios to make HTTP requests:

sh
Copy code
npm install axios
Step 3: Create the Text Analysis Component
Create a component that sends the text to the Hugging Face Inference API and gets the classification result.

javascript
Copy code
// src/TextAnalysis.js
import React, { useState } from 'react';
import axios from 'axios';

const TextAnalysis = () => {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState(null);

  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  const handleAnalyze = async () => {
    try {
      const response = await axios.post(
        'https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english',
        { inputs: inputText },
        {
          headers: {
            Authorization: `Bearer YOUR_HUGGING_FACE_API_KEY`,
          },
        }
      );
      setResult(response.data);
    } catch (error) {
      console.error('Error analyzing text:', error);
    }
  };

  return (
    <div>
      <h1>Text Analysis</h1>
      <textarea
        value={inputText}
        onChange={handleChange}
        placeholder="Enter text to analyze"
      />
      <button onClick={handleAnalyze}>Analyze Text</button>
      {result && (
        <div>
          <h2>Result</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default TextAnalysis;
Step 4: Use the Component in Your App
Integrate the TextAnalysis component into your main application:

javascript
Copy code
// src/App.js
import React from 'react';
import TextAnalysis from './TextAnalysis';

function App() {
  return (
    <div className="App">
      <TextAnalysis />
    </div>
  );
}

export default App;
Step 5: Run Your Application
Start your React application:

sh
Copy code
npm start
Explanation
State Management: We use React's useState to manage the input text and the result.
Text Input: A textarea for the user to input text and a button to trigger the analysis.
API Request: When the user clicks the "Analyze Text" button, an HTTP POST request is made to the Hugging Face Inference API using Axios. Make sure to replace YOUR_HUGGING_FACE_API_KEY with your actual API key.
Display Result: The result from the API is displayed in a preformatted text block.
Note
To use Hugging Face's Inference API, you need an API key. You can get one by signing up on the Hugging Face website and creating a new token from your account settings.

This example provides a basic setup to analyze text in a React application using Hugging Face's models. For production, ensure proper error handling and possibly a more sophisticated UI.
*/