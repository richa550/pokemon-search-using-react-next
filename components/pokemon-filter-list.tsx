'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import PokemonImage from './pokemon-image';

interface PokemonCard1Props {
  url: string;
}

export function PokemonFilterList({ url }: PokemonCard1Props) {
  const [pokemonSearchFilterData, setPokemonSearchFilterData] = useState<any[]>(
    []
  ); // Use a more specific type if possible
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (url) {
      const fetchData = async () => {
        try {
          const response = await fetch(`https://pokeapi.co/api/v2/type/${url}`);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const result = await response.json();
          setPokemonSearchFilterData(result?.pokemon);
        } catch (error) {
          //setError(error.message);
        }
      };
      fetchData();
    }
  }, [url]);

  useEffect(() => {
    console.log('Updated pokemonSearchFilterData:', pokemonSearchFilterData);
  }, [pokemonSearchFilterData]);

  return (
    <>
      {url && (
        <>
          <h2 className="text-center mt-4"> Pokemon Type Filter Result </h2>
          <div className="mb-32 mt-8 grid text-center lg:mb-0 lg:grid-cols-3 gap-4 lg:text-left">
            {error && <p className="text-red-500">{error}</p>}
            {pokemonSearchFilterData.length > 0 ? (
              pokemonSearchFilterData.map((pokemon: any, i: number) => (
                <div
                  className="max-w-sm border border-1 border-gray-50 rounded-md bg-white p-4"
                  key={i}
                >
                  <Link href="#" className="">
                    <div
                      className="m-4"
                      style={{
                        position: 'relative',
                        width: '150px',
                        height: '150px',
                      }}
                    >
                      <PokemonImage name={pokemon.pokemon.name} />
                    </div>
                  </Link>
                  <div className="p-5">
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-black">
                      {pokemon.pokemon.name.charAt(0).toUpperCase() +
                        pokemon.pokemon.name.slice(1)}
                    </h5>
                    <Link
                      href={pokemon.pokemon.name}
                      className="text-blue-500 inline-flex mt-4"
                    >
                      Details
                      <svg
                        className="rtl:rotate-180 w-3.5 ms-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p>No Pokémon found for this type.</p>
            )}
          </div>
        </>
      )}
    </>
  );
}
