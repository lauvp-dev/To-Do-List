import React, {useState, useEffect} from 'react';
import './../styles/App.css';
import Header from '../components/Header';
import FormularioTareas from '../components/FormularioTareas';
import ListaTareas from '../components/ListaTareas';

const App = () => {
  //Obtengo las tareas guardadas de local storage
  const tareasGuardadas = localStorage.getItem('tareas') ? JSON.parse(localStorage.getItem('tareas')) : [];
  
  //Establezco el estado de las tareas
  const [tareas, cambiarTareas] = useState(tareasGuardadas);
  
  //Guardo el estado dentro de local storage
  useEffect(() => {
    localStorage.setItem('tareas', JSON.stringify(tareas));
  }, [tareas]);
  
  //Accedo a local storage y compruebo si mostrarCompletadas es nulo
  let configMostrarCompletadas = '';
  if (localStorage.getItem('mostrarCompletadas') === null) {
    configMostrarCompletadas = true;
  } else {
    configMostrarCompletadas = localStorage.getItem('mostrarCompletadas') === 'true'
  }
  
  //Establezco el estado de mostrarCompletadas
  const [mostrarCompletadas, cambiarMostrarCompletadas] = useState(configMostrarCompletadas);
  
  //Guardo el estado de mostrarCompletadas dentro de local storage
  useEffect(() => {
    localStorage.setItem('mostrarCompletadas', mostrarCompletadas.toString());
  }, [mostrarCompletadas]);

  return (
    <div className='contenedor'>
      <Header 
        mostrarCompletadas={mostrarCompletadas} 
        cambiarMostrarCompletadas={cambiarMostrarCompletadas} 
      />
      <FormularioTareas tareas={tareas} cambiarTareas={cambiarTareas} />
      <ListaTareas 
        tareas={tareas} 
        cambiarTareas={cambiarTareas}
        mostrarCompletadas={mostrarCompletadas}
      />
    </div>
  );
}

export default App;
