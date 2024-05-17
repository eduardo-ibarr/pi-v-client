import { DrawerDefault } from "../Drawer";

function Header() {
  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex items-center w-full">
        <DrawerDefault />

        <div className="text-xl font-bold mx-4">marilika</div>

        {/* <input
              type="text"
              placeholder="Buscar produtos..."
              className="w-96 bg-gray-700 text-white border border-gray-600 rounded py-2 px-4 focus:outline-none focus:border-gray-500 "
            /> */}
      </div>
    </header>
  );
}

export default Header;
