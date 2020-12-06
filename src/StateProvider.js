import React, { createContext, useContext, useReducer } from 'react'
// Prepares the data layer
export const StateContext = createContext()
// Wrap app and provide data layer to every Component
export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
)
// Pull info from data layer
export const useStateValue = () => useContext(StateContext)