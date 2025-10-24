import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch } from "../../store";

export interface Order {
  id: number;
  name: string;
  status: "pending" | "processing" | "completed";
}

interface OrdersState {
  orders: Order[];
}

let nextId = 1;

const initialState: OrdersState = { orders: [] };

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<string>) => {
      state.orders.push({
        id: nextId++,
        name: action.payload,
        status: "pending",
      });
    },
    startProcessing: (state, action: PayloadAction<number>) => {
      const order = state.orders.find((o) => o.id === action.payload);
      if (order) order.status = "processing";
    },
    completeOrder: (state, action: PayloadAction<number>) => {
      const order = state.orders.find((o) => o.id === action.payload);
      if (order) order.status = "completed";
    },
    removeOrder: (state, action: PayloadAction<number>) => {
      state.orders = state.orders.filter((o) => o.id !== action.payload);
    },
  },
});

export const { addOrder, completeOrder, removeOrder, startProcessing } =
  orderSlice.actions;

// ✅ Async actions (simulate delay)
export const addOrderAsync = (name: string) => (dispatch: AppDispatch) => {
  setTimeout(() => {
    dispatch(addOrder(name));
  }, 500);
};

export const completeOrderAsync = (id: number) => (dispatch: AppDispatch) => {
  // Simulate order processing
  dispatch(startProcessing(id));
  setTimeout(() => {
    dispatch(completeOrder(id));
  }, 2000);
};

export const removeOrderAsync = (id: number) => (dispatch: AppDispatch) => {
  dispatch(removeOrder(id));
};

export default orderSlice.reducer;