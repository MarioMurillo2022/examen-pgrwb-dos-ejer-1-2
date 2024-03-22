import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CrudEjercicioDos } from './components/CrudEjercicioDos';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<CrudEjercicioDos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
