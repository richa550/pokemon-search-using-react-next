import Link from 'next/link';
import PokemonImage from './pokemon-image';

interface PokemonCardProps {
  name: string;
}

export function PokemonCard({ name }: PokemonCardProps) {
  return (
    <>
      <div className="border border-1 border-gray-50 rounded-md bg-white p-4">
        <div className="max-w-sm">
          <Link href="#" className="">
            <div
              className="m-4"
              style={{ position: 'relative', width: '150px', height: '150px' }}
            >
              <PokemonImage name={name} />
            </div>
          </Link>
          <div className="p-5">
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-black">
              {name?.charAt(0)?.toUpperCase() + name?.slice(1)}
            </h5>
            <Link href={name} className="text-blue-500 inline-flex mt-4">
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
      {/* <Link
          href={name}
          className="group rounded-lg border border-transparent m-3 px-5 py-4 transition-colors dark:border-gray-500 hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          key={name + "Card"}
        >
          <h2 className={`text-2xl font-semibold`}>
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </h2>
        </Link> */}
    </>
  );
}
