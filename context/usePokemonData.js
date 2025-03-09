import axios from "axios";
import { useEffect, useState } from "react";
import _ from "lodash";

const pokemonBaseUrl = "https://pokeapi.co/api/v2";

export const usePokemonData = () => {
  const [loading, setLoading] = useState(false);
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [allPokemon, setAllPokemon] = useState([]);
  const [pokemonListDetails, setPokemonListDetails] = useState([]);
  const [activePokemon, setActivePokemon] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [originalPokemonListDetails, setOriginalPokemonListDetails] = useState(
    []
  );

  const [filters, setFilters] = useState({
    type: "",
    ability: "",
    weight: "",
    height: "",
    sortOrder: "",
  });

  const fetchPokemon = async (page = 1) => {
    setLoading(true);
    try {
      const offset = (page - 1) * 50;
      const res = await axios.get(
        `${pokemonBaseUrl}/pokemon?offset=${offset}&limit=40`
      );

      setLoading(false);

      setPokemonList((prev) => [...prev, ...res.data.results]);
      setCurrentPage(page);
    } catch (error) {
      console.error(error);
    }
  };

  // fetch all pokemon
  const fetchAllPokemon = async () => {
    try {
      const res = await axios.get(`${pokemonBaseUrl}/pokemon?limit=1118`);
      setAllPokemon(res.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  // fetch pokemon details
  const fetchPokemonDetails = async () => {
    setLoading(true);
    try {
      const details = await Promise.all(
        pokemonList.map(async (pokemon) => {
          const res = await axios.get(pokemon.url);

          return res.data;
        })
      );

      setLoading(false);

      setPokemonListDetails(details);

      // preserve the original list
      setOriginalPokemonListDetails(details);
    } catch (error) {
      console.log("Error fetching pokemon details", error);
    }
  };

  // fecth pokemon by name
  const fetchPokemonByName = async (name) => {
    setLoading(true);
    try {
      const res = await axios.get(`${pokemonBaseUrl}/pokemon/${name}`);

      setLoading(false);
      setActivePokemon(res.data);

      return res.data;
    } catch (error) {
      console.error("Error fetching pokemon by name", error);
    }
  };

  // search pokemon
  const searchPokemon = async (query) => {
    if (!query) {
      setSearchQuery("");

      const details = await Promise.all(
        pokemonList.map(async (pokemon) => {
          const res = await axios.get(pokemon.url);

          return res.data;
        })
      );

      setPokemonListDetails(details);
      return;
    }

    setLoading(true);

    const filteredPokemon = allPokemon.filter((pokemon) => {
      return pokemon.name.toLowerCase().includes(query.toLowerCase());
    });

    try {
      // fetch details for the filtered pokemon
      const filtered = await Promise.all(
        filteredPokemon.map(async (pokemon) => {
          const res = await axios.get(pokemon.url);
          return res.data;
        })
      );

      setLoading(false);

      setPokemonListDetails(filtered);
    } catch (error) {
      console.error("Error searching pokemon", error);
    }
  };

  //filter pokemon
  const filterPokemon = () => {
    const { type, ability, weight, height, sortOrder } = filters;
    const query = searchQuery.toLowerCase();

    let filteredPokemon = originalPokemonListDetails;

    //apply the type filter
    if (type) {
      filteredPokemon = filteredPokemon.filter((pokemon) => {
        return pokemon.types.some((t) => t.type.name === type);
      });
    }

    //apply the ability filter
    if (ability) {
      filteredPokemon = filteredPokemon.filter((pokemon) => {
        return pokemon.abilities.some((a) => a.ability.name === ability);
      });
    }

    //apply the weight filter
    if (weight) {
      filteredPokemon = filteredPokemon.filter((pokemon) => {
        return pokemon.weight >= weight;
      });
    }

    //apply the height filter
    if (height) {
      filteredPokemon = filteredPokemon.filter((pokemon) => {
        return pokemon.height >= height;
      });
    }

    //apply the search query
    if (query) {
      filteredPokemon = filteredPokemon.filter((pokemon) => {
        return pokemon.name.toLowerCase().includes(query);
      });
    }

    // apply sorting if sortOrder is provided
    if (sortOrder) {
      filteredPokemon =
        sortOrder === "asc"
          ? [...filteredPokemon].sort((a, b) => {
              return a.name.localeCompare(b.name, undefined, {
                sensitivity: "base",
              });
            })
          : [...filteredPokemon].sort((a, b) => {
              return b.name.localeCompare(a.name, undefined, {
                sensitivity: "base",
              });
            });
    }

    setPokemonListDetails(filteredPokemon);
  };

  const loadMore = () => {
    fetchPokemon(currentPage + 1);
  };

  // handle change for filters
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      type: "",
      ability: "",
      weight: "",
      height: "",
      sortOrder: "",
    });
    setSearchQuery("");
    setPokemonListDetails(originalPokemonListDetails);
  };

  // debounce search
  const debouncedSearch = _.debounce((value) => {
    setFilters((prev) => ({ ...prev, query: value }));
    filterPokemon();
    searchPokemon(value);
  }, 500);

  // handle change for search
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedSearch(value);
  };

  useEffect(() => {
    fetchPokemon();
    fetchAllPokemon();
  }, []);

  useEffect(() => {
    if (pokemonList.length > 0) {
      fetchPokemonDetails();
    }
  }, [pokemonList]);

  useEffect(() => {
    filterPokemon();
  }, [filters, searchQuery]);

  return {
    fetchPokemon,
    loading,
    pokemonList,
    pokemonListDetails,
    fetchPokemonByName,
    activePokemon,
    loadMore,
    handleSearchChange,
    searchQuery,
    handleFilterChange,
    filters,
    clearFilters,
  };
};
