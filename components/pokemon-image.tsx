'use client';
import Image from 'next/image';

const PokemonImage = ({ name }: { name: string }) => {
  // Format the Pokémon name to ensure it's valid for the URL

  const imageUrl = encodeURIComponent(
    `https://img.pokemondb.net/artwork/${name}.jpg`
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
      alt={`Picture of ${name}`}
      className="mx-auto border border-1 border-gray-50"
    />
  );
};

export default PokemonImage;
// import Image from "next/image";

// export function PokemonImage({ image, name } : { image: string, name: string }) {
//     return (
//         <Image
//             src={image}
//             alt={"Picture of " + name}
//             priority
//             fill
//             style={{"objectFit": "contain"}}
//             className="border border-1 border-gray-50"
//             onLoadingComplete={(image) => image.classList.remove("opacity-0")}

//         />
//     )
// }
