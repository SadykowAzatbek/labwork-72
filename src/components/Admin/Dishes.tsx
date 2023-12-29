import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../App/hooks.ts';
import {selectDishDelete, selectDishes, selectDishFetchLoading} from '../store/dishesSlice.ts';
import {useEffect} from 'react';
import {deleteDish, fetchGetDishes} from '../store/AppThunks.ts';
import Loader from '../Loader/Loader.tsx';

const Dishes = () => {
  const navigate = useNavigate();

  const dishes = useAppSelector(selectDishes);
  const dishLoading = useAppSelector(selectDishFetchLoading);
  const deleteLoading = useAppSelector(selectDishDelete);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchUrl = async () => {
      await dispatch(fetchGetDishes());
    };

    void fetchUrl();
  }, [dispatch]);

  const onDelete = async (id: string) => {
    await dispatch(deleteDish(id));
    await dispatch(fetchGetDishes());

  };

  console.log(dishes);

  return (
    <>
      <div className="d-flex justify-content-between mt-3">
        <h3>Dishes</h3>
        <button className="btn btn-light" onClick={() => navigate('/admin/new')}>Add new Dish</button>
      </div>
      {dishLoading ? <Loader /> : dishes.map((dish) => (
        <div className="d-flex justify-content-between m-3 border border-dark p-2 align-items-center rounded-3" key={dish.id}>
          <div>
            <img className="rounded-3 me-4" src={dish.image} alt="pizza" />
            {dish.title}
          </div>
          <strong>{dish.price} KGZ</strong>
          <div className="d-flex gap-3">
            <button className="btn btn-warning">Edit</button>
            <button className="btn btn-danger"
                    onClick={() => onDelete(dish.id)}
                    disabled={deleteLoading ? deleteLoading === dish.id : false}
            >
              {deleteLoading && deleteLoading === dish.id && (<Loader />)}
              Delete
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default Dishes;