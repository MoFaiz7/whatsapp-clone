import React, {createContext, useContext, useReducer} from "react";

//creating higher order data layer
export const StateContext = createContext();

//initialsing  higher order data layer
export const StateProvider = ({reducer, initialState, children})=>(
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

// tweaking the higher order data layer
export const useStateValue = ()=> useContext(StateContext);