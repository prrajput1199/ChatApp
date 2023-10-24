import {configureStore} from "@reduxjs/toolkit";
import {useDispatch as useAppDispatch,useSelector as useAppSelector} from "react-redux";
import {persistStore,persistreducer} from "redux-persist";

const store = configureStore({
  reducer:persistreducer(),
  middleware: (getDefaultMiddleware)=>{
     getDefaultMiddleware({
        serialzableCheck:"false",
        immutableCheck:false
     })
  }
})

const persistor=persistStore(store);

const{dispatch}=store;

const useSelector=useAppSelector;

const useDispatch=()=>useAppDispatch();

export {store,persistor,dispatch,useSelector,useDispatch};