import {NavigationBar} from "@/components/molecules/navbar";
import {cn} from "@/lib/utils";
import {Logo} from "@/components/atoms/logo";

interface HeaderProps {
    children?: React.ReactNode,
}

export const Header: React.FC<HeaderProps> = ({children}) => {
    return <header className={cn("container w-full h-14 flex items-center")}>
        <Logo/>
        <NavigationBar/>
    </header>
}