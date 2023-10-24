
import { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [listaBodegas, setListaBodegas] = useState([]);
  const [listaMarcas, setListaMarcas] = useState([]);
  const [listaModelos, setListaModelos] = useState([]);
  const [listaDispositivos, setListaDispositivos] = useState([]);
  const [selectedMarca, setSelectedMarca] = useState(0);
  const [selectedBodega, setSelectedBodega] = useState(0);
  const [selectedModelo, setSelectedModelo] = useState(0);
  

  useEffect(() => {
    getBodegas();
    getMarcas();
    getModelos();
    getDispositivos();
  }, []);

  const cambioBodega = (event) => {
    setSelectedBodega(event.target.value);
    filtroBodega(event.target.value);

    
    

    console.log("Bodega -> " + event.target.value);
  };
  const cambioMarca = (event) => {
    setSelectedMarca(event.target.value);
    filtroMarca(selectedBodega, event.target.value);

   
      
    console.log("Marca -> " + event.target.value);
  };
  const cambioModelo = (event) => {
    setSelectedModelo(event.target.value);
    console.log("Modelo -> " + event.target.value);
    filtroModelo(selectedModelo, event.target.value);


  };

  async function getBodegas(idBodega) {
    getModelos(idBodega);

    const response = await fetch(`http://localhost:8000/api/bodegas/`);
    const data = await response.json();
    setListaBodegas(data);
    return data;
  }
  async function getMarcas() {
    const response = await fetch(`http://localhost:8000/api/marcas`);
    const data = await response.json();
    setListaMarcas(data);
  
    return data;
  }
  async function getModelos() {
    const response = await fetch("http://localhost:8000/api/modelos");
    const data = await response.json();
    setListaModelos(data);
    return data;
  }

  async function getDispositivos() {
    const response = await fetch("http://localhost:8000/api/dispositivos");
    const data = await response.json();
    setListaDispositivos(data);
    console.log(data);
    return data;
  }

  async function filtroBodega(idBodega) {
    // Obtiene la lista de dispositivos y modelos

    if (idBodega > 0) {
      // Obtiene los modelos
      const responseModelos = await fetch(
        `http://localhost:8000/api/bodegas/${idBodega}/modelos`
      );
      const dataModelos = await responseModelos.json();
      setListaModelos(Object.values(dataModelos));

      // Obtiene las marcas
      const responseMarcas = await fetch(
        `http://localhost:8000/api/bodegas/${idBodega}/marcas`
      );
      const dataMarcas = await responseMarcas.json();
      setListaMarcas(Object.values(dataMarcas));


      // Obtiene los dispositivos
      const responseDispositivos = await fetch(
        `http://localhost:8000/api/bodegas/${idBodega}/dispositivos`
      );
      const dataDispositivos = await responseDispositivos.json();
      setListaDispositivos(Object.values(dataDispositivos));

      console.log("Estoy filtrando por bodega");
    }
  }

  async function filtroMarca(idBodega, idMarca) {
    if (idBodega > 0 && idMarca > 0) {
      // Obtiene las marcas para la bodega seleccionada
      const responseModelos = await fetch(
        `http://127.0.0.1:8000/api/bodegas/${idBodega}/modelos/${idMarca}`
      );
      const dataModelos = await responseModelos.json();
      setListaModelos(Object.values(dataModelos));

      const responseDispositivos = await fetch(
        `http://localhost:8000/api/bodegas/${idBodega}/dispositivos/marcas/${idMarca}`
      );
      const dataDispositivos = await responseDispositivos.json();
      setListaDispositivos(Object.values(dataDispositivos));

      console.log("Estoy filtrando por marca y bodega");
    }
  }

  async function filtroModelo(idBodega, idModelo) {
    if (idBodega > 0 && idModelo > 0) {
      const responseDispositivos = await fetch(
        `http://localhost:8000/api/bodegas/${idBodega}/dispositivos/modelos/${idModelo}`
      );
      const dataDispositivos = await responseDispositivos.json();
      setListaDispositivos(Object.values(dataDispositivos));
    }
  }


 
  return (
    <div className="App">
      <div className="container">
      <h3>BODEGAS</h3>
      <select value={selectedBodega} onChange={cambioBodega}>
        <option value="">Seleccione una bodega</option>
        {listaBodegas.map((bodega) => (
          <option key={bodega.id} value={bodega.id}>
            Bodega #{bodega.id}
          </option>
        ))}
      </select>

      <h3>MARCAS</h3>
      <select value={selectedMarca} onChange={cambioMarca}>
        <option value="">Seleccione una marca</option>
        {listaMarcas?.map((marca) => (
          <option key={marca.id} value={marca.id}>
            {marca.id}-{marca.nombre_marca}
          </option>
        ))}
      </select>

      <h3>MODELOS</h3>
      <select value={selectedModelo} onChange={cambioModelo}>
        <option value="">Seleccione un modelo</option>
        {listaModelos?.map((modelo) => (
          <option key={modelo.id} value={modelo.id}>
            {modelo.nombre_modelo}
          </option>
        ))}
        ;
      </select>
      </div>
      <h3>DISPOSITIVOS</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>

            <th>Modelo id</th>
            <th>Bodega</th>
          </tr>
        </thead>
        <tbody>
          {listaDispositivos?.map((dispositivo) => (
            <tr key={dispositivo.id}>
              <td>{dispositivo.id}</td>
              <td>{dispositivo.nombre_dispositivo}</td>
            
              <td>{dispositivo.modelo_id}</td>
              <td>{selectedBodega}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
