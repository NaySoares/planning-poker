import Link from "next/link";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger, AlertDialogTitle } from "./ui/alert-dialog";
import { aboutText, contactText } from "@/utils/messages";
interface IDialog {
  trigger: React.ReactNode;
  title: string;
  text: string;
}

export const Header = () => {
  const NavItem = ({ title }: { title: string }) => {
    return (
      <li>
        <p className="cursor-pointer transition duration-200 text-white hover:underline  hover:text-teal-600">{title}</p>
      </li >
    )
  }

  const Dialog = ({ trigger, title, text }: IDialog) => {
    return (
      <AlertDialog>
        <AlertDialogTrigger>
          {trigger}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription asChild>
              {<div dangerouslySetInnerHTML={{ __html: text }} />}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Confirmar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }

  return (
    <header className="w-full py-4 flex items-center justify-between">
      <div className="flex px-4">
        <Link href="/">
          <h1 className="text-2xl font-bold text-white cursor-pointer hover:text-teal-600 transition duration-200">Planning Poker</h1>
        </Link>
      </div>
      <div className="flex px-4">
        <nav>
          <ul className="flex space-x-4">
            <Dialog
              trigger={<NavItem title="Sobre" />}
              title="Planning Poker"
              text={aboutText}
            />
            <Dialog
              trigger={<NavItem title="Contato" />}
              title="Contato"
              text={contactText}
            />
          </ul>
        </nav>
      </div>
    </header>
  );
}