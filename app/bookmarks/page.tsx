"use client";
import Header from "@/components/Header";
import PokemonCard from "@/components/PokemonCard";
import { useGlobalContext } from "@/context/globalContext";
import React, { useEffect } from "react";

function page() {
  const { fetchPokemonByName, userDetails } = useGlobalContext();

  const [bookmarkedPokemons, setBookmarkedPokemons] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    if (userDetails?.bookmarks) {
      setLoading(true);
      const fetchPokemons = async () => {
        const pokemonDetails = await Promise.all(
          userDetails.bookmarks.map(async (pokemon: any) => {
            const details = await fetchPokemonByName(pokemon);

            return details;
          })
        );

        setBookmarkedPokemons(pokemonDetails as any);
      };
      setLoading(false);
      fetchPokemons();
    }
  }, [userDetails?.bookmarks]);

  if (loading) {
    return (
      <div className="h-[100vh] flex justify-center items-center">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <main>
      <Header />

      {!loading && (
        <section className="min-h-[91vh]">
          {bookmarkedPokemons.length > 0 ? (
            <div className="px-16 py-8 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {bookmarkedPokemons.map((pokemon: any, index: number) => (
                <PokemonCard key={pokemon.name + index} pokemon={pokemon} />
              ))}
            </div>
          ) : (
            <h2 className="text-center text-4xl font-bold text-gray-800 mt-20">
              No bookmarked pokemons
            </h2>
          )}
        </section>
      )}
    </main>
  );
}

export default page;
