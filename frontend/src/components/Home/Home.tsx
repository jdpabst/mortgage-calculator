import { useUserContext } from 'src/contexts/userStore';
import './Home.scss';

export default function Home() {
 const { submit, setSubmit } = useUserContext();

 return (
  <div className='main-container'>

   <div className='mortgage-form-main-container'>

    <span className='heading'>
     <h1>Mortgage Calculator</h1>
     <button>Clear All</button>
    </span>

    <form>
     <label> Mortgage Amount
      <input type='text' />
      <p>$</p>
     </label>

     <label>Mortgage Term
      <input type='text' />
      <p>years</p>
     </label>

     <label>Interest Rate
      <input type='text' />
      <p>%</p>
     </label>

     <label> Mortgage Type
      <input type='radio' name="type" />
      Repayment
      <input type='radio' name='type' />
      Interest Only
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
     <div className='unsubmitted-form'></div>}
    <img src='/assets/illustration-empty.svg' />
    <h1>Results Shown Here</h1>
    <p>Complete the form and click "calculate repayments" to see what your monthly repayments would be.</p>
   </div>

  </div>
 )
}