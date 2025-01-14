'use client';
import { PokemonCard } from './pokemon-card';
import { ChangeEvent, useEffect, useState } from 'react';
import { Input } from './ui/input';
import { PokemonFilterList } from './pokemon-filter-list';

interface PokemonGridProps {
  pokemonList: [];
  pokemonListType: [];
}

export function PokemonGrid({
  pokemonList,
  pokemonListType,
}: PokemonGridProps) {
  const [typeURL, setTypeURL] = useState('');
  const [pokemonFilter, setPokemonFilter] = useState(false);
  const [pokemonSearchFilter, setPokemonSearchFilter] = useState('');
  const [searchText, setSearchText] = useState('');
  const searchFilter = (pokemonList: []) => {
    return pokemonList.filter((pokemon: any) =>
      pokemon.name.toLowerCase().includes(searchText.toLowerCase())
    );
  };
  const filteredPokemonList = searchFilter(pokemonList);
  const handleCardDisplay = (event: ChangeEvent<HTMLSelectElement>) => {
    setTypeURL(event.target.value);
  };

  return (
    <main className="flex flex-col items-center pr-24 min-w-[800px] max-w-[800px]">
      <div className="mb-32 grid text-center w-full lg:mb-0 lg:text-left border border-1 border-black p-5 bg-stone-100">
        <select
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 mb-4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={handleCardDisplay}
        >
          <option selected defaultValue={'Plese Select Pokemon Type'}>
            Plese Select Pokemon Type
          </option>
          {pokemonListType &&
            pokemonListType?.map((data: any, i: number) => (
              <option key={i} value={i + 1}>
                {data.name}
              </option>
            ))}
        </select>
        <div>
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="simple-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block w-4/5 ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 inline-block"
              placeholder="Enter Pokemon Name"
              onChange={(e) => setSearchText(e.target.value)}
              required
            />
            <button
              type="button"
              id="pokemonName"
              className="p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <span>Search</span>
            </button>
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 hidden">
          <Input
            type="text"
            value={searchText}
            autoComplete="off"
            id="pokemonName"
            placeholder="Charizard, Pikachu, etc."
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <div className="">
          <PokemonFilterList url={typeURL}></PokemonFilterList>
        </div>
        <div className="mb-32 mt-8 grid text-center lg:mb-0 lg:grid-cols-3 gap-4 lg:text-left">
          {!typeURL && (
            <>
              {filteredPokemonList?.map((pokemon: any, i: any) => {
                return <PokemonCard name={pokemon?.name} key={i} />;
              })}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
