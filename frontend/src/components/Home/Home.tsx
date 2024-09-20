import { useState } from 'react';
import { useUserContext } from 'src/contexts/userStore';
import './Home.scss';

export default function Home() {
 const { submit, setSubmit } = useUserContext();
 const { selectedRadio, setSelectedRadio } = useUserContext();
 const { total, setTotal } = useUserContext();
 const { monthly, setMonthly } = useUserContext();

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

 // const repaymentTotal = () => {
 //  let amount = Number(inputValues.mortgageAmount);
 //  let rate = Number(inputValues.interestRate);
 //  let term = Number(inputValues.mortgageTerm);


 //  let decimalRate = rate % 100;

 //  let monthlyPayments = (amount * decimalRate) % 12;
 //  let onlyInterest = amount * decimalRate * term;

 //  let totalAmount = amount + onlyInterest;

 //  setTotal(totalAmount);
 //  setMonthly(monthlyPayments)

 // }

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
   newErrors.interestOnly = 'This field is required.';
  } else {
   newErrors.repayment = '';
   newErrors.interestOnly = '';
  }

  // Update error state
  setInputErrors(newErrors);

  // If no errors, proceed with form submission
  const hasErrors = Object.values(newErrors).some((error) => error !== '');

  if (!hasErrors) {
   setSubmit(!submit);
   let amount = Number(inputValues.mortgageAmount);
   let rate = Number(inputValues.interestRate);
   let term = Number(inputValues.mortgageTerm);


   let decimalRate = rate / 100;

   let monthlyPayments = (amount * decimalRate) / 12;
   let onlyInterest = amount * decimalRate * term;

   let totalAmount = Number(amount) + Number(onlyInterest);

   console.log(decimalRate)

   setTotal(totalAmount);
   setMonthly(monthlyPayments)
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
  });

  setSelectedRadio('');

  setSubmit(false);
 }


 return (
  <div className='main-container'>
   <div className='mortgage-form-main-container'>
    <span className='heading'>
     <h1>Mortgage Calculator</h1>
     <button onClick={handleClearForm}>Clear All</button>
    </span>

    <form onSubmit={handleSubmit}>
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
     <div className='form-results-container'>
      <div className='results-inner-container'>
       <h1 className='results-h1'>Your results</h1>
       <p className='results-desc'>Your results are shown below based on the information you provided. To adjust the results, edit the form and click "calculate repayments" again.</p>
       <div className='monthly-repayments-container'>
        <div className='repayments-inner-container'>
         <p>Your monthly repayments</p>
         <h1>${monthly}</h1>
        </div>
        <div className='term-container'>
         <p>Total you'll pay over the term</p>
         <h2>${total}</h2>
        </div>
       </div>
      </div>
     </div>
     :
     <div className='form-results-container'>
      <img className='empty-icon' src='/assets/illustration-empty.svg' alt="empty illustration" />
      <h1>Results shown here</h1>
      <p>Complete the form and click "calculate repayments" to see what your monthly repayments would be.</p>
     </div>
    }
   </div>
  </div>
 );
}
