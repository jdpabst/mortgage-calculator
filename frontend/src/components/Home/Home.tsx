import { useUserContext } from 'src/contexts/userStore';
import './Home.scss';

export default function Home() {
 const { submit, setSubmit } = useUserContext();

 const handleSubmit = () => {
  setSubmit(!submit)
 }

 return (
  <div className='main-container'>

   <div className='mortgage-form-main-container'>

    <span className='heading'>
     <h1>Mortgage Calculator</h1>
     <button>Clear All</button>
    </span>

    <form onSubmit={handleSubmit}>
     <label> Mortgage Amount
      <input type='text' />
      <p className='dollar-sign icon'>$</p>
     </label>

     <label>Mortgage Term
      <input type='text' />
      <p className='years icon'>years</p>
     </label>

     <label>Interest Rate
      <input type='text' />
      <p className='percent-sign icon'>%</p>
     </label>

     <label className='radio-options-container'> Mortgage Type
      <div className='radio-option-1'>
       <input type='radio' name="type" />
       <p>Repayment</p>
      </div>

      <div className='radio-option-2'>
       <input type='radio' name='type' />
       <p>Interest Only</p>
      </div>

     </label>

     <button className='form-submit-bttn'>
      <img src='/assets/icon-calculator.svg' />
      <p>Calculate Repayments</p>
     </button>

    </form>


   </div>

   <div className='results-container'>
    {submit ?

     <div>submitted</div>
     :
     <div className='unsubmitted-form'>
      <img src='/assets/illustration-empty.svg' />
      <h1>Results shown here</h1>
      <p>Complete the form and click "calculate repayments" to see what your monthly repayments would be.</p>
     </div>
    }

   </div>

  </div>
 )
}