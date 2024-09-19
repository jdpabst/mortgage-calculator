import { useState } from 'react';
import { useUserContext } from 'src/contexts/userStore';
import './Home.scss';

export default function Home() {
 const { submit, setSubmit } = useUserContext();
 const { selectedRadio, setSelectedRadio } = useUserContext();

 const [inputValues, setInputValues] = useState({
  mortgageAmount: '',
  mortgageTerm: '',
  interestRate: '',
  repayment: '',
  interestOnly: ''
 });
 const [inputErrors, setInputErrors] = useState({
  mortgageAmount: '',
  mortgageTerm: '',
  interestRate: '',
  repayment: '',
  interestOnly: ''
 });

 console.log(inputValues.mortgageAmount)

 const handleInputChange = (e, field) => {
  const value = e.target.value;
  setInputValues((prevValues) => ({
   ...prevValues,
   [field]: value,
  }));

  // Validate if the input is empty and update corresponding error state
  setInputErrors((prevErrors) => ({
   ...prevErrors,
   [field]: value.trim() ? '' : 'This field is required.',
  }));
 };

 const handleSubmit = (e) => {
  e.preventDefault();

  // Check for errors in all inputs
  let newErrors = { ...inputErrors };

  Object.keys(inputValues).forEach((field) => {
   if (!inputValues[field].trim()) {
    newErrors[field] = 'This field is required.';
   }
  });

  // Check if a radio button is selected
  if (!selectedRadio) {
   newErrors.repayment = 'This field is required.';
  }

  // Update error state
  setInputErrors(newErrors);

  // If no errors, proceed with form submission
  const hasErrors = Object.values(newErrors).some((error) => error !== '');
  if (!hasErrors) {
   setSubmit(!submit);
  }
 };

 const handleRadioChecked = (value) => {
  setSelectedRadio(value);
 };

 const handleClearForm = () => {
  setInputValues({
   mortgageAmount: '',
   mortgageTerm: '',
   interestRate: '',
   repayment: '',
   interestOnly: ''
  });

  setInputErrors({
   mortgageAmount: '',
   mortgageTerm: '',
   interestRate: '',
   repayment: '',
   interestOnly: ''
  })
 }


 return (
  <div className='main-container'>
   <div className='mortgage-form-main-container'>
    <span className='heading'>
     <h1>Mortgage Calculator</h1>
     <button onClick={handleClearForm}>Clear All</button>
    </span>

    <form onSubmit={(e) => handleSubmit(e)}>
     <label> Mortgage Amount
      <input
       type='text'
       value={inputValues.mortgageAmount}
       className={`amount-input ${inputErrors.mortgageAmount ? 'input-error' : ''}`}
       onChange={(e) => handleInputChange(e, 'mortgageAmount')} />
      <p className='dollar-sign icon'>$</p>
      {inputErrors.mortgageAmount && <h3 className='error-message'>{inputErrors.mortgageAmount}</h3>}
     </label>

     <div className='term-rate-container'>
      <label>Mortgage Term
       <input
        type='text'
        value={inputValues.mortgageTerm}
        className={`${inputErrors.mortgageTerm ? 'input-error' : ''}`}
        onChange={(e) => handleInputChange(e, 'mortgageTerm')} />
       <p className='years icon'>years</p>
       {inputErrors.mortgageTerm && <h3 className='error-message'>{inputErrors.mortgageTerm}</h3>}
      </label>

      <label>Interest Rate
       <input
        type='text'
        value={inputValues.interestRate}
        className={`${inputErrors.interestRate ? 'input-error' : ''}`}
        onChange={(e) => handleInputChange(e, 'interestRate')} />
       <p className='percent-sign icon'>%</p>
       {inputErrors.interestRate && <h3 className='error-message'>{inputErrors.interestRate}</h3>}
      </label>
     </div>


     <label className='radio-options-container'> Mortgage Type
      <div className='radio-option-1' onClick={() => handleRadioChecked('repayment')} style={{ borderColor: `${selectedRadio === 'repayment' ? "hsl(61, 70%, 52%)" : 'hsl(200, 24%, 40%)'}`, backgroundColor: `${selectedRadio === 'repayment' ? 'hsl(62, 81%, 92%)' : 'white'}` }}>
       <span
        className='radio-bttn-container'
        style={{
         border: `1.5px solid ${selectedRadio === 'repayment' ? 'hsl(61, 70%, 52%)' : 'hsl(200, 24%, 40%)'}`
        }}>
        <input
         className='radio-bttn'
         type='radio'
         name="type"
         value="repayment"
         checked={selectedRadio === 'repayment'}
         onChange={(e) => { handleRadioChecked('repayment'); handleInputChange(e, 'repayment') }}
        />
       </span>
       <p>Repayment</p>
      </div>

      <div className='radio-option-2' onClick={() => handleRadioChecked('interest-only')} style={{ borderColor: `${selectedRadio === 'interest-only' ? "hsl(61, 70%, 52%)" : 'hsl(200, 24%, 40%)'}`, backgroundColor: `${selectedRadio === 'interest-only' ? 'hsl(62, 81%, 92%)' : 'white'}` }}>
       <span
        className='radio-bttn-container'
        style={{
         border: `1.5px solid ${selectedRadio === 'interest-only' ? 'hsl(61, 70%, 52%)' : 'hsl(200, 24%, 40%)'}`
        }}>
        <input
         className='radio-bttn'
         type='radio'
         name="type"
         value="interest-only"
         checked={selectedRadio === 'interest-only'}
         onChange={(e) => { handleRadioChecked('interest-only'); handleInputChange(e, 'interestOnly') }}
        />
       </span>
       <p>Interest Only</p>
      </div>
      {inputErrors.repayment && inputErrors.interestOnly && <h3 className='radio-error-message'>{inputErrors.repayment}</h3>}
     </label>


     <button className='form-submit-bttn'>
      <div className='submit-bttn-contents'>
       <img src='/assets/icon-calculator.svg' alt="calculator icon" />
       <p>Calculate Repayments</p>
      </div>
     </button>
    </form>
   </div>

   <div className='results-container'>
    {submit ?
     <div>submitted</div>
     :
     <div className='unsubmitted-form'>
      <img className='empty-icon' src='/assets/illustration-empty.svg' alt="empty illustration" />
      <h1>Results shown here</h1>
      <p>Complete the form and click "calculate repayments" to see what your monthly repayments would be.</p>
     </div>
    }
   </div>
  </div>
 );
}
