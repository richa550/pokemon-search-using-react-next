import { getPokemon } from '@/lib/pokemonAPI';
import Image from 'next/image';
import PokemonImage from '@/components/pokemon-image';

export default async function PokemonPage({
  params,
}: {
  params: { pokemonName: string };
}) {
  const { pokemonName } = params;

  const pokemonObject = await getPokemon(pokemonName);

  return (
    <>
      <div className="w-[400px] border border-1 border-grey">
        <div
          className="m-4"
          style={{ position: 'relative', width: '150px', height: '150px' }}
        >
          <PokemonImage name={pokemonName} />
        </div>
        <div className="bg-amber-100 p-6">
          <div className="flex-col">
            <h4 className="font-bold mb-2 mt-2">Name- </h4>
            <p className="p-0 m-0 w-2/4">
              {pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)}
            </p>
          </div>
          <hr />
          <div className="flex-col">
            <h4 className="font-bold mb-2 mt-2">State- </h4>
            {pokemonObject.stats.map((statObject: any) => {
              const statName = statObject.stat.name;
              return (
                <span className="p-0 m-0 w-2/4" key={statName}>
                  {statName},{' '}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
