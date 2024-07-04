import useTokenData from "../../hooks/app/useTokenData";

function Header() {
  const data = useTokenData();
  const isLogged = !!data;

  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex items-center justify-between w-full">
        <a className="text-xl font-bold mx-4" href="/">
          marilika
        </a>

        <nav className="py-4">
          <ul className="flex gap-4">
            <li>
              <a href="/products" className="hover:underline">
                Produtos
              </a>
            </li>

            <li>
              <a href="/about" className="hover:underline">
                Sobre nós
              </a>
            </li>

            {isLogged ? (
              <li>
                <a href="/logout" className="hover:underline">
                  Logout
                </a>
              </li>
            ) : (
              <li>
                <a href="/login" className="hover:underline">
                  Login
                </a>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
