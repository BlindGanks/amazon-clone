import Image from "next/image";
import {
  SearchIcon,
  MenuIcon,
  ShoppingCartIcon,
  LocationMarkerIcon,
} from "@heroicons/react/outline";

function Header() {
  return (
    <header>
      {/* top nav*/}
      <div className="flex items-center bg-amazon_blue p-1 py-2 flex-grow">
        <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
          <Image
            src="https://press.aboutamazon.com/sites/g/files/knoqqb37121/themes/site/nir_pid2497/styleguide/media/logo.svg"
            width={130}
            height={30}
            objectFit="contain"
            className="cursor-pointer"
          />
        </div>
        <div className="text-white whitespace-nowrap text-xs flex pr-2 space-x-1 leading-[10px] border border-amazon_blue hover:border-white cursor-pointer py-2 rounded-sm">
          <div className="flex items-end pb-[2px]">
            <LocationMarkerIcon className="h-5 inline-block " />
          </div>
          <div>
            <p className="text-gray-300 font-medium">Deliver to</p>
            <p className="font-extrabold md:text-sm">Algeria</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500 mx-4">
          <input
            className="p-2 h-full w-6 flex-grow flex-shrink focus-within:outline-none rounded-l-md"
            type="text"
          />
          <SearchIcon className="h-12 p-4" />
        </div>
        <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
          <div className="link">
            <p>hello blind ganks</p>
            <p className="font-extrabold md:text-sm">Account & Lists</p>
          </div>
          <div className="link">
            <p>Returns</p>
            <p className="font-extrabold md:text-sm">& orders</p>
          </div>
          <div className="relative link flex items-center">
            <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 rounded-full text-center text-black font-bold">
              4
            </span>
            <ShoppingCartIcon className="h-10" />
            <p className="hidden md:inline-block font-extrabold md:text-sm mt-2">
              Basket
            </p>
          </div>
        </div>
      </div>
      {/* bottom nav*/}
      <div className="relative flex items-center space-x-1 p-2 pl-6 bg-amazon_blue-light text-white text-sm">
        <p className="link font-bold flex items-center">
          <MenuIcon className="h-6 mr-1" />
          All
        </p>
        <div className="flex flex-grow">
          <p className="btm-nav-link">Today's Deals</p>
          <p className="btm-nav-link">Buy Again</p>
          <p className="btm-nav-link">Customer Service</p>
          <p className="btm-nav-link">Browsing History</p>
          <p className="btm-nav-link">blind's Amazon.com</p>
          <p className="btm-nav-link">Gift Cards</p>
          <p className="btm-nav-link">Registry</p>
          <p className="btm-nav-link">Sell</p>
        </div>
        <p className="btm-nav-link">Shop All Deals</p>
      </div>
    </header>
  );
}

export default Header;
