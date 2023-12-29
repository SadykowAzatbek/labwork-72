import React from 'react';
import {fetchDishPost} from '../store/AppThunks.ts';
import {useAppDispatch, useAppSelector} from '../../App/hooks.ts';
import {addDish, cleanDish, selectorDish} from '../store/dishSlice.ts';
import {useNavigate} from 'react-router-dom';

const DishesForm = () => {
  const navigate = useNavigate();

  const dishData = useAppSelector(selectorDish);
  const dispatch = useAppDispatch();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    dispatch(addDish({...dishData, [name]: value}));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await dispatch(fetchDishPost());

    dispatch(cleanDish());
    navigate('/admin/dishes');
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="d-flex flex-column w-50 gap-2 mt-4">
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
        <button type="submit" className="btn btn-success">Save</button>
      </form>
    </div>
  );
};

export default DishesForm;