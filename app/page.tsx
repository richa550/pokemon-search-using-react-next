import { PokemonGrid } from '@/components/pokemon-grid'
import { getPokemonList, getPokemonType } from '@/lib/pokemonAPI'

export default async function Home() {

  const pokemonList = await getPokemonList();
  const pokemonListType = await getPokemonType();

  return (
      <PokemonGrid pokemonList={pokemonList} pokemonListType={pokemonListType}/>
  )
}
