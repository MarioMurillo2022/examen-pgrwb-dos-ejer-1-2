import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CrudEjercicioDos } from './components/CrudEjercicioDos';
import { Notas } from './components/Notas';
import { Inicio } from './components/Inicio';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Inicio />} />
        <Route path='/crudejerciciodos' element={<CrudEjercicioDos />} />
        <Route path='/notas' element={<Notas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
