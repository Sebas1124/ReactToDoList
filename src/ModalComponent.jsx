import {useState} from 'react'

import './modal.css';

export const ModalComponent = ({closeModal, task}) => {


    const [InputValue, setInputValue] = useState('');

    
    const onInputChange = ({target}) => {
        setInputValue(target.value);
    }


    const onSubmit = (event) => {
        
        event.preventDefault();

        if (task?.id){
                const requestOptions = {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: InputValue })
                };
                fetch(`http://localhost:8000/api/update/${task.id}`, requestOptions)
                
                setInputValue('') 
            }
        else {

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: InputValue })
            };
            fetch('http://localhost:8000/api/save', requestOptions)
            
            setInputValue('') 

        }
        
    }

    

  return (
    <>
        <div className="modal" >
        <div className="model-inner">
            <div className="modal-header">
            <h3>{task?`Edit this`:'What to do today?'}</h3>
            <button onClick={ closeModal } className="modal-close">
                &times;
            </button>
            </div>
                <form onSubmit={ onSubmit }>
                    <label>{task?`Edit ${task.name}`:'Add one activity'}</label>
                    <input 
                        type="text" 
                        onChange={ onInputChange }
                        placeholder={task?task.name:`New activity`}
                        value={InputValue}         
                        />

                    <button>{task?'Edit':'Create'}</button>   
                </form>
            </div>
            </div>
    </>
  )
}