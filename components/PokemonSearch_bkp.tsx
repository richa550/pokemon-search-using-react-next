// components/PokemonSearch.js
'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PokemonImage from './PokemonImg';

const PokemonSearch = ({ Posts: any }) => {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonType, setPokemonType] = useState([]);
  const [pokemonSearchRes, setPokemonSearchRes] = useState('');
  const [pokemonSearchFilter, setPokemonSearchFilter] = useState('');
  const [pokemonSearchFilterData, setPokemonSearchFilterData] = useState([
    null,
  ]);
  const [searchEventfired, setSearchEventfired] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/type/');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setPokemonType(result);
      } catch (error) {
        // setError(error.message);
      }
    };
    fetchData();
  }, [pokemonType]);

  const handleCardDisplay = (e) => {
    setPokemonSearchFilter(e.target.value);
    setSearchEventfired(false);
  };
  useEffect(() => {
    if (pokemonSearchFilter) {
      const fetchData = async () => {
        try {
          const response = await fetch(`${pokemonSearchFilter.toString()}`);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const result = await response.json();
          setPokemonSearchFilterData(result);
          //console.log('setPokemonSearchFilterData,, ', pokemonSearchFilterData);
        } catch (error) {
          // setError(error.message);
        }
      };
      fetchData();
    }
  }, [pokemonSearchFilter, pokemonSearchFilterData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://pokeapi.co/api/v2/pokemon?limit=150'
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setPokemonList(result);
      } catch (error) {
        //setError(error.message);
      }
    };
    fetchData();
  }, []);

  const handleSearch = () => {
    setSearchEventfired(true);
  };

  useEffect(() => {
    if (searchEventfired) {
      const fetchData = async () => {
        try {
          const response = await fetch('https://pokeapi.co/api/v2/pokemon');
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const result = await response.json();
          const foundPokemon = result.results.find(
            (data: any) => data.name === pokemonName
          );
          if (foundPokemon) {
            setPokemonSearchRes(foundPokemon.name);
          } else {
            setPokemonSearchRes('');
          }
        } catch (error) {
          //setError(error.message);
        }
      };
      fetchData();
    }
  }, [searchEventfired, pokemonName]);

  return (
    <main className="flex flex-col items-center pr-24 min-w-[800px] max-w-[800px]">
      <div className="mb-32 grid text-center w-full lg:mb-0 lg:text-left border border-1 border-black p-5 bg-stone-100">
        <form className="mx-auto1">
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 mb-4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={handleCardDisplay}
          >
            <option selected defaultValue={'Plese Select Pokemon Type'}>
              Plese Select Pokemon Type
            </option>
            {pokemonType &&
              pokemonType?.results?.map((data: any, i: number) => (
                <option key={i} value={data.url}>
                  {data.name}
                </option>
              ))}
          </select>
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
              onChange={(e) => setPokemonName(e.target.value)}
              required
            />
            <button
              type="button"
              className="p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={handleSearch}
            >
              <span>Search</span>
            </button>
          </div>
        </form>
        <div>
          {searchEventfired && (
            <>
              {pokemonSearchRes ? (
                <>
                  <p className="mt-4 mb-4">Found Pokémon: {pokemonSearchRes}</p>
                  <div className="border border-1 border-gray-50 rounded-md bg-white p-4">
                    <div className="max-w-sm">
                      <Link href="#" className="h-36 w-36">
                        <PokemonImage pokemonSearchRes={pokemonSearchRes} />
                      </Link>
                      <div className="p-5">
                        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                          {pokemonSearchRes}
                        </h5>
                        <Link
                          href={`/pages/pokemon/${encodeURIComponent(
                            pokemonSearchRes
                          )}`}
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
                              stroke-linejoin="round"
                              d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <p className="mt-2" style={{ color: 'red' }}>
                  No Such Pokémon found, Please Enter Correct Pokemon Name.{' '}
                </p>
              )}
            </>
          )}
        </div>
        <div className="mt-8">
          {pokemonSearchFilter && <h5 className="mb-4">Filter Result</h5>}
          <div className="grid grid-cols-3 gap-4">
            {!pokemonSearchFilter && pokemonList ? (
              pokemonList?.results?.map((data: any, i: number) => (
                <div
                  className="border border-1 border-gray-50 rounded-md bg-white p-4"
                  key={i}
                >
                  <div className="max-w-sm">
                    <Link href="#" className="h-36 w-36">
                      <PokemonImage pokemonSearchRes={data.name} />
                    </Link>
                    <div className="p-5">
                      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {data.name}
                      </h5>
                      <Link
                        href={`/pages/pokemon/${encodeURIComponent(data.name)}`}
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
                            stroke-linejoin="round"
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <>
                {pokemonSearchFilterData &&
                  pokemonSearchFilterData?.pokemon?.map(
                    (data: any, i: number) => (
                      <div
                        className="border border-1 border-gray-50 rounded-md bg-white p-4"
                        key={i}
                      >
                        <div className="max-w-sm">
                          <Link href="#" className="h-36 w-36">
                            <PokemonImage pokemonSearchRes={pokemonSearchRes} />
                            {/* <Image
                              src={`https://img.pokemondb.net/artwork/${data?.pokemon?.name}.jpg`}
                              width={'144'}
                              height={'144'}
                              alt="Picture of the pokemon"
                              className="mx-auto border border-1 border-gray-50"
                            /> */}
                          </Link>
                          <div className="p-5">
                            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                              {data?.pokemon?.name}
                            </h5>
                            <Link
                              href={`/pages/pokemon/${encodeURIComponent(
                                data?.pokemon?.name
                              )}`}
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
                                  stroke-linejoin="round"
                                  d="M1 5h12m0 0L9 1m4 4L9 9"
                                />
                              </svg>
                            </Link>
                          </div>
                        </div>
                      </div>
                    )
                  )}
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default PokemonSearch;
