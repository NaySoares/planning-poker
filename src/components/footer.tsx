import Link from "next/link";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger, AlertDialogTitle } from "./ui/alert-dialog";
import { aboutText, contactText, termsOfUseText } from "@/utils/messages";

interface IDialog {
  trigger: React.ReactNode;
  title: string;
  text: string;
}

export const Footer = () => {
  const githubUrl = "https://github.com/naysoares/planning-poker";

  const NavItem = ({ title }: { title: string }) => {
    return (
      <li>
        <p className="cursor-pointer transition duration-200 text-black hover:underline  hover:text-teal-600">{title}</p>
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
    <footer className="w-full h-16 flex items-center justify-center bg-white/50">
      <div className="flex flex-col px-4 items-center justify-center">
        <nav>
          <ul className="flex space-x-4">
            <Dialog
              trigger={<NavItem title="Sobre" />}
              title="Planning Poker"
              text={aboutText}
            />
            <Dialog
              trigger={<NavItem title="Termos de Uso" />}
              title="Termos de Uso"
              text={termsOfUseText}
            />
            <Dialog
              trigger={<NavItem title="Contato" />}
              title="Contato"
              text={contactText}
            />
          </ul>
        </nav>
        <Link href={githubUrl}>
          <p className="text-black hover:text-teal-600">GitHub</p>
        </Link>
      </div>
    </footer>
  )
}