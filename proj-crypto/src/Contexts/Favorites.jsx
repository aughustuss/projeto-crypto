import React, {useState, createContext} from 'react'

const FavoritesProvider = createContext();

const FavoritesContext = ({children}) => {
    const [favorites, setFavorites] = useState([]);
    const addFavorite = (coin) => {
        
    }
    return (
        <FavoritesProvider.Provider value={{favorites, setFavorites}}>
            {children}
        </FavoritesProvider.Provider>
    )
}