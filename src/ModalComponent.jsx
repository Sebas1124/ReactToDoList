import {useState, useEffect} from 'react'

import './modal.css';

export const ModalComponent = ({closeModal, task}) => {


    const [InputValue, setInputValue] = useState('');

    
    const onInputChange = ({target}) => {
        setInputValue(target.value);
    }

    const update = () => {
    }
    
    const onSubmit = (event) => {
        
        event.preventDefault();
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: InputValue })
        };
        fetch('http://localhost:8000/api/save', requestOptions)
        
        setInputValue('') 
    }

    

  return (
    <>
        <div id="demo-modal" className="modal" role="dialog">
        <div className="model-inner">
            <div className="modal-header">
            <h3>What to do today?</h3>
            <button onClick={ closeModal } className="modal-close" data-id="demo-modal" aria-label="Close">
                &times;
            </button>
            </div>
                <form onSubmit={ onSubmit }>
                    <label htmlFor="work">Add one activity</label>
                    <input 
                        type="text" 
                        name="work" 
                        id=""
                        onChange={ onInputChange }
                        placeholder='New activity'         
                        />

                    <button>Add</button>   
                </form>
            </div>
            </div>
            <button className='modal-open' data-id='demo-modal'>New</button>
    </>
  )
}