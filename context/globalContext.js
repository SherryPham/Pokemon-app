import React, { useEffect } from "react";
import { usePokemonData } from "./usePokemonData";
import { useUserData } from "./userUserData";
import { useUser } from "@auth0/nextjs-auth0/client";
const GloablContext = React.createContext();

export const GlobalContextProvider = ({ children }) => {
  const { user } = useUser();
  const {
    loading,
    fetchPokemon,
    pokemonList,
    pokemonListDetails,
    fetchPokemonByName,
    activePokemon,
    loadMore,
    searchQuery,
    handleSearchChange,
    handleFilterChange,
    filters,
    clearFilters,
  } = usePokemonData();

  const { userDetails, performAction, fetchUserDetails } = useUserData();

  useEffect(() => {
    if (user) fetchUserDetails();
  }, [user]);

  return (
    <GloablContext.Provider
      value={{
        loading,
        fetchPokemon,
        pokemonList,
        pokemonListDetails,
        fetchPokemonByName,
        activePokemon,
        loadMore,
        userDetails,
        performAction,
        searchQuery,
        handleSearchChange,
        handleFilterChange,
        filters,
        clearFilters,
      }}
    >
      {children}
    </GloablContext.Provider>
  );
};

export const useGlobalContext = () => {
  return React.useContext(GloablContext);
};
