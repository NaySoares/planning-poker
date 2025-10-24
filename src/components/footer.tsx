import Link from "next/link";

export const Footer = () => {
  const githubUrl = "https://github.com/naysoares/planning-poker";

  const NavItem = ({ title, onClick }: { title: string; onClick: () => void }) => {
    return (
      <li>
        <p className="cursor-pointer transition duration-200 text-black hover:underline  hover:text-teal-600" onClick={onClick}>{title}</p>
      </li>
    )
  }

  return (
    <footer className="w-full h-16 flex items-center justify-center bg-white/50">
      <div className="flex flex-col px-4 items-center justify-center">
        <nav>
          <ul className="flex space-x-4">
            <NavItem title="Sobre" onClick={() => console.log('Sobre clicked')} />
            <NavItem title="Termos de Uso" onClick={() => console.log('Termos de Uso clicked')} />
            <NavItem title="Contato" onClick={() => console.log('Contato clicked')} />
          </ul>
        </nav>
        <Link href={githubUrl}>
          <p className="text-black hover:text-teal-600">GitHub</p>
        </Link>
      </div>
    </footer>
  )
}