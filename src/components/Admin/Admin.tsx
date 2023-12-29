import {NavLink, useLocation, useNavigate, useParams} from 'react-router-dom';
import Dishes from './Dishes.tsx';
import Orders from './Orders.tsx';
import DishesForm from './DishesForm.tsx';


const Admin = () => {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();

  return (
    <>
      <header className="d-flex justify-content-between border-bottom border-dark">
        <h1 onClick={() => navigate('/admin')}>Turtle Pizza Admin</h1>
        <nav>
          <ul className="d-flex gap-2 list-unstyled">
            <li>
              <NavLink to="/admin/dishes">Dishes</NavLink>
            </li>
            <li>
              <NavLink to="/admin/orders">Orders</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        {location.pathname === '/admin/dishes' ? (<Dishes />) : ''}
        {location.pathname === '/admin/orders' ? (<Orders />) : ''}
        {location.pathname === '/admin/new' ? (<DishesForm />) : ''}
        {params.id ? (<DishesForm />) : ''}
      </main>
    </>
  );
};

export default Admin;
