import { useState, useRef, useEffect } from "react";
import axios from "axios";

import './App.css';
import './css/Modal.css'

function App() {
  const [ pets, setPets ] = useState([]);
  const [ display,setDisplay ] = useState();
  const [ displayU,setDisplayU ] = useState();
  const [ idU, setIdU ] = useState();

  const url = 'https://crudcrud.com/api/dc7621b5783b4eb189841961c8a4afd0/pet'

  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);

  const inputRefU1 = useRef(null);
  const inputRefU2 = useRef(null);
  const inputRefU3 = useRef(null);

  const inputRefId = useRef(null);

  const fetchApi = async () => {
    axios.post(url, {
      age: parseInt(inputRef1.current.value),
      name: inputRef2.current.value,
      kind: inputRef3.current.value
    })
    .then(function (response) {
      console.log(response);
      pets.push(response.data)
      closeModalCreate();
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const fetchApiGet = async () => {
    axios.get(url)
    .then(function (response) {
      console.log(response);
      setPets(response.data)
      console.log(pets);
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  const fetchApiGetId = async () => {
    console.log(inputRefId.current.value);
    console.log(pets);
    setPets([])

    axios.get(`${url}/${inputRefId.current.value}`)
    .then(function (response) {
      console.log(response.data);
      setPets(response.data)
      console.log(pets);
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  const fetchApiDelete = async(id) => {
    axios.delete(`${url}/${id}`, {data:{}})
    .then(function (response) {
    console.log(response);
    fetchApiGet()
    })
    .catch(function (error) {
    console.log(error);
    });
  }

  const fetchApiUpdate = async () => {
    axios.put(`${url}/${idU}`, {
      age: parseInt(inputRefU1.current.value),
      name: inputRefU2.current.value,
      kind: inputRefU3.current.value
    })
    .then(function (response) {
      console.log(response);
      fetchApiGet();
      closeModalUpdate();
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  useEffect( () => {
    fetchApiGet();
  },[])

  const showModalCreate = () => {
      setDisplay('block')
  }

  const closeModalCreate = () => {
    setDisplay('none')
  }

  const showModalUpdate = (id) => {
    setIdU(id)
    setDisplayU('block')
  }

  const closeModalUpdate = () => {
    setDisplayU('none')
  }

  return (
    <div className="App">
      <div className="container-bar">
        <div>
          <button type="button" className="btn" onClick={ showModalCreate } >Crear</button>
          <button type="button" className="btn" onClick={ fetchApiGet } >Recargar</button>
        </div>
        <div>
          <input type="text" id="inputBuscar" ref={inputRefId}/>
          <button type="button" className="btn" onClick={ fetchApiGetId }>Buscar</button>
        </div>
      </div>

      <div>
        { !pets ? <h1>Loading...</h1> :
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Edad</th>
                <th>Nombre</th>
                <th>Especie</th>
                <th>Controles</th>
              </tr>
            </thead>
            <tbody>
                { !pets ? <h1>Loading</h1> : Array.isArray(pets) ? pets.map( pet =>
                    <tr>
                      <td>ID: {pet._id}</td>
                      <td>Edad : {pet.age}</td>
                      <td>Nombre : {pet.name}</td>
                      <td>Especie :{pet.kind}</td>
                      <td><a className="btn2" onClick={() => showModalUpdate(pet._id)}>Editar</a><a className="btn2" onClick={ () => fetchApiDelete(pet._id) }>Borrar</a></td>
                </tr>
                ) : 
                <tr>
                      <td>ID: {pets._id}</td>
                      <td>Edad : {pets.age}</td>
                      <td>Nombre : {pets.name}</td>
                      <td>Especie :{pets.kind}</td>
                      <td><a className="btn2" onClick={() => showModalUpdate(pets._id)}>Editar</a><a className="btn2" onClick={ () => fetchApiDelete(pets._id) }>Borrar</a></td>
                </tr>
                }
            </tbody>
          </table>
        }
      </div>

      <div className="container-modal">
        <div className="modal" style={ { display:display}} >
          <div className="modal-content">
            <h3>CREAR Mascota</h3>
            <form>
              <div >
                  <label for="age">Edad</label>
                  <input id="age" type="number" min={0} ref={inputRef1} autoFocus/>
              </div>
              <div >
                  <label for="name" >Nombre</label>
                  <input id="name" type="text" ref={inputRef2}/>
              </div>
              <div >
                  <label for="kind" >Especie</label>
                  <input id="kind" type="text" ref={inputRef3}/>
              </div>
            </form>
            <button type="button" className="btn" onClick={closeModalCreate}>Close</button>
            <button type="submit" className="btn" onClick={fetchApi}>Create</button>
          </div>
        </div>
      </div>

      <div className="container-modal">
        <div className="modal" style={ { display:displayU}} >
          <div className="modal-content">
            <h3>ACTUALIZAR Mascota</h3>
            <form>
              <div >
                  <label for="ageU">Edad</label>
                  <input id="ageU" type="number" ref={inputRefU1} min={0} autoFocus />
              </div>
              <div >
                  <label for="nameU" >Nombre</label>
                  <input id="nameU" type="text" ref={inputRefU2}/>
              </div>
              <div >
                  <label for="kindU" >Especie</label>
                  <input id="kindU" type="text" ref={inputRefU3}/>
              </div>
            </form>
            <button type="button" className="btn" onClick={closeModalUpdate }>Close</button>
            <button type="submit" className="btn" onClick={ fetchApiUpdate }>Update</button>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
