import {useEffect} from 'react';
import {fetchGetOrders} from '../store/AppThunks.ts';
import {useAppDispatch, useAppSelector} from '../../App/hooks.ts';
import {selectUserOrders} from '../store/dishesSlice.ts';

const Orders = () => {
  const dispatch = useAppDispatch();
  const userOrders = useAppSelector(selectUserOrders);

  useEffect(() => {
    const fetchUrl = async () => {
      await dispatch(fetchGetOrders());

    };

    void fetchUrl();
  }, [dispatch]);

    return (
      <div>
        <h3>Orders</h3>
        <div>
          {userOrders.map((dish) => (
            <div key={dish.id}>
              <strong>{dish.title}</strong>
              <div></div>
            </div>
          ))}
        </div>
      </div>
    );

};

export default Orders;