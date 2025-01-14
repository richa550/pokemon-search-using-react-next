import Image from 'next/image';

const PokemonImage = (pokemonSearchRes: any) => {
  const imageUrl = encodeURIComponent(
    `https://img.pokemondb.net/artwork/${pokemonSearchRes?.pokemonSearchRes}.jpg`
  );
  const replacedString = imageUrl
    .replace(/%2F/g, '/')
    .replace(/%3A/g, ':')
    .toLowerCase();

  return (
    <Image
      loader={({ src }) => src}
      src={replacedString}
      width={144}
      height={144}
      alt={`Picture of `}
      className="mx-auto border border-1 border-gray-50"
    />
  );
};

export default PokemonImage;
