import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';


import './ListCss.css'
import { ModalComponent } from './ModalComponent'

export const ListComponent = () => {

  // Realizamos la petición a la API
  const [Lista, setLista] = useState([])

  const [Modal, setModal] = useState(false);

  const [currentTask, setCurrentTask] = useState();

  const handleUpdateTask = (id, name) => {
    setCurrentTask({id, name})
  }


  const openmodal = () => {
    setModal(true)
  }

  const closeModal = () => {
    setModal(false)
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

          {Modal ?<ModalComponent closeModal={ closeModal } task={ currentTask }/> :null}

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
                <div>
                  <h3 id='ListName'>
                    {List.name}
                  </h3>
                </div>
                <div className='options'>
                  <h4>
                    {year + '-' + month + '-' + day} 
                    <button onClick={currentTask}> <i className='uil uil-edit-alt'></i> </button> 
                    <button><i className='uil uil-times'></i></button>
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

