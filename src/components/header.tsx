export const Header = () => {
  const NavItem = ({ title, onClick }: { title: string; onClick: () => void }) => {
    return (
      <li>
        <p className="cursor-pointer transition duration-200 text-white hover:underline  hover:text-teal-600" onClick={onClick}>{title}</p>
      </li>
    )
  }

  return (
    <header className="w-full py-4 flex items-center justify-between">
      <div className="flex px-4">
        <h1 className="text-2xl font-bold text-white">Planning Poker</h1>
      </div>
      <div className="flex px-4">
        <nav>
          <ul className="flex space-x-4">
            <NavItem title="Sobre" onClick={() => console.log('Sobre clicked')} />
            <NavItem title="Contato" onClick={() => console.log('Contato clicked')} />
          </ul>
        </nav>
      </div>
    </header>
  );
}