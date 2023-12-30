import {useAppDispatch, useAppSelector} from '../../App/hooks.ts';
import {
  cleanOrder,
  selectDishes,
  selectDishFetchLoading,
  selectDishOrder,
  selectOrderLoading, selectToggleHiddenBlock,
  toggleHiddenBlock
} from '../store/dishesSlice.ts';
import Loader from '../Loader/Loader.tsx';
import {useEffect} from 'react';
import {fetchDishOrder, fetchGetDishes, fetchOrderPost} from '../store/AppThunks.ts';
import {delivery} from '../../constants.ts';

const Client = () => {
  const dishes = useAppSelector(selectDishes);
  const dishLoading = useAppSelector(selectDishFetchLoading);
  const dishesOrder = useAppSelector(selectDishOrder);
  const orderLoading = useAppSelector(selectOrderLoading);
  const toggleHiddenCheck = useAppSelector(selectToggleHiddenBlock);

  const dispatch = useAppDispatch();

  if (dishesOrder) {
    console.log(dishesOrder);
  }

  useEffect(() => {
    const fetchUrl = async () => {
      await dispatch(fetchGetDishes());

    };

    void fetchUrl();
  }, [dispatch]);

  const totalPrice = () => {
    return dishesOrder.reduce(
      (acm, number) => acm + parseInt(number.price) * number.piece, 0
    );
  };

  const addOrder = async (id: string) => {
    const existingDish = dishesOrder.find((dish) => dish.id === id);

    if (existingDish) {
      const updatedDishesOrder = dishesOrder.map((dish) => dish.id === id ? {...dish, piece: dish.piece + 1} : dish);

      dispatch(cleanOrder());
      updatedDishesOrder.forEach((dish) => {
        dispatch(fetchDishOrder({dishId: dish.id, piece: dish.piece}));
      });
    } else {
      await dispatch(fetchDishOrder({dishId: id, piece: 1}));
    }
  };

  const checkoutOrder = () => {
    dispatch(toggleHiddenBlock());
  };

  const cancelBtn = () => {
    dispatch(toggleHiddenBlock());

    dispatch(cleanOrder());
  }

  const addOrderUser = async () => {
    dispatch(toggleHiddenBlock());
    dispatch(cleanOrder());

    const orderData: {[key: string]: number} = {};
    dishesOrder.forEach((dish) => {
      orderData[dish.id] = dish.piece;
    });

    await dispatch(fetchOrderPost(orderData));
  };

  return (
    <div>
      <h3 className="border-bottom border-dark m-5">Turtle Pizza</h3>
      <div className="d-flex gap-3 flex-wrap justify-content-around">
        {dishes.map((dish) => (
          <div key={dish.id} className="order-dish border border-dark rounded-3" onClick={() => addOrder(dish.id)}>
            {dishLoading ? (<Loader />) : (<div className="d-flex p-2 align-items-center">
              <div>
                <img src={dish.image} className="rounded-3" alt="pizza" />
              </div>
              <div className="ms-3">
                <strong>{dish.title}</strong>
              </div>
              <div className="ms-auto me-3 fs-5 fw-bold">{dish.price} KGZ</div>
            </div>)}
          </div>
        ))}
      </div>
      <div className="total mt-5 p-3 rounded-3 d-flex justify-content-between align-items-center">
        <div>Order total: {orderLoading ? (<Loader />) : totalPrice() + ' KGZ'}</div>
        <button className="btn btn-light" onClick={checkoutOrder} disabled={totalPrice() === 0}>
          Checkout
        </button>
      </div>
      {toggleHiddenCheck ? (<div className="background-grey">
      <div className="order-checkout rounded-4 p-3 w-50">
        <h4>Your order:</h4>
        <div>
          {dishesOrder.map((dish) => (
            <div key={dish.id}>
              <div>{dish.title} x {dish.piece}<strong>X</strong></div>
            </div>
          ))}
          <div className="mt-3">Delivery: {delivery} KGZ</div>
          <div><strong>Total: {totalPrice() + delivery} KGZ</strong></div>
          <div className="mt-5 d-flex gap-2 justify-content-end">
            <button className="btn btn-light" onClick={cancelBtn}>cancel</button>
            <button className="btn btn-primary" onClick={addOrderUser}>order</button>
          </div>
        </div>
      </div></div>) : ''}
    </div>
  );
};

export default Client;