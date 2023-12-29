import './App.css';
import {Route, Routes} from 'react-router-dom';
import Admin from './components/Admin/Admin.tsx';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/dishes" element={<Admin />} />
        <Route path="/admin/orders" element={<Admin />} />
        <Route path="/admin/new" element={<Admin />} />
        <Route path="/admin/:id/edit" element={<Admin />} />
        <Route path="*" element={<h2>404, Not found!</h2>} />
      </Routes>
    </>
  )
}

export default App;
