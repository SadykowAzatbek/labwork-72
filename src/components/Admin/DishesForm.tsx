import {fetchDishPost, fetchEditDish, fetchOneDish} from '../store/AppThunks.ts';
import {useAppDispatch, useAppSelector} from '../../App/hooks.ts';
import {addDish, cleanDish, selectorDish} from '../store/dishSlice.ts';
import {useNavigate, useParams} from 'react-router-dom';
import React, {useEffect} from 'react';
import {selectDish, selectDishEditLoading, selectFetchOneLoading} from '../store/dishesSlice.ts';
import Loader from '../Loader/Loader.tsx';

const DishesForm = () => {
  const navigate = useNavigate();
  const {id} = useParams();

  console.log(id);

  const dishData = useAppSelector(selectorDish);
  const editLoading = useAppSelector(selectDishEditLoading);
  const dish = useAppSelector(selectDish);
  const oneLoading = useAppSelector(selectFetchOneLoading);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchOneDish(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (dish) {
      dispatch(addDish(dish));
    }
  }, [dispatch, dish]);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    dispatch(addDish({...dishData, [name]: value}));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (id) {
      await dispatch(fetchEditDish(id));
    } else {
      await dispatch(fetchDishPost());
    }

    dispatch(cleanDish());
    navigate('/admin/dishes');
  };

  return (
    <div>
      {oneLoading ? <Loader /> : <form onSubmit={onSubmit} className="d-flex flex-column w-50 gap-2 mt-4">
        <input id="title" name="title" type="text" placeholder="title" required
               value={dishData.title}
               onChange={onChange}
        />
        <input id="price" name="price" type="number" placeholder="price" required
               value={dishData.price}
               onChange={onChange}
        />
        <input id="image" name="image" type="text" placeholder="image" required
               value={dishData.image}
               onChange={onChange}
        />
        <button type="submit" className="btn btn-success"
                disabled={editLoading ? editLoading === id : false}
        >
          {editLoading ? <Loader/> : 'Save'}
        </button>
      </form>}
    </div>
  );
};

export default DishesForm;