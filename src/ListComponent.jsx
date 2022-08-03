import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';


import './ListCss.css'
import { ModalComponent } from './ModalComponent'

export const ListComponent = () => {

  // Realizamos la petición a la API
  const [Lista, setLista] = useState([])

  const [Modal, setModal] = useState(false);

  const [currentTask, setCurrentTask] = useState();

  const UpdateStateCheckbox = (event, id) => {
    
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: id })
    };
    fetch(`http://localhost:8000/api/updatestate/${id}`, requestOptions)
    
  }

  const handleUpdateTask = (event,id, name) => {
    event.preventDefault();
    setCurrentTask({id, name})
    setModal(true);
}

  const openmodal = (event) => {
    event.preventDefault();
    setModal(true)
  }

  const closeModal = () => {
    setModal(false)
  }

  const deleteItem = (event,id) => {
    event.preventDefault();

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: id })
    };
    fetch(`http://localhost:8000/api/delete/${id}`, requestOptions)
    

  }


  useEffect ( () => {
    fetch('http://localhost:8000/api/showResults')
    .then( (response) => {
      return response.json()
    })
    .then( (Lista) => {
      setLista(Lista)
    });
  }, [])

  // ===========================================

  return (
    <>
      <div className='ListContainer'>
        <div className='List__Title' >
          <h1>List / Lista</h1>

          {/* Componente de Modal */}

          {Modal ?<ModalComponent task={currentTask} closeModal={ closeModal } /> :null}

          <button onClick={ openmodal }>
              new
          </button>

        </div>
        {/* Iterar resultados del objeto */}
        <div className='List'>
          {Lista.map( List => {
            const fecha = new Date (List.created_at)
            const day = fecha.getDate();
            const month = fecha.getMonth();
            const year = fecha.getFullYear();
          return (
            <form className='dates' key={List.id}>
              <>
                <div className='name__check'>

                  <input onChange={ (event) =>  UpdateStateCheckbox(event,List.id) } type="checkbox"/>

                  {List.status == 2?<del id='ListName'>
                    {List.name}
                  </del>:<h3 id='ListName'>
                    {List.name}
                  </h3>}

                  {/* {checkbox?<h3 id='ListName'>
                    {List.name}
                  </h3>:<del id='ListName'>
                    {List.name}
                  </del>} */}
                </div>
                <div className='options'>
                  <h4>
                    {year + '-' + month + '-' + day} 
                    <button onClick={ (event) =>  handleUpdateTask(event,List.id,List.name) }> 
                      <i className='uil uil-edit-alt'></i> 
                    </button> 

                    <button onClick={  (event) =>  deleteItem(event,List.id) }>
                      <i className='uil uil-times'></i>
                    </button>
                  </h4>
                </div>
              </>
            </form>
          );
          })}
        </div>
      </div>
    </>
  )
}

