import {cn} from "@/lib/utils";

interface NavLinksProps {
    children?: React.ReactNode
}

export const NavLinks: React.FC<NavLinksProps> = ({children}) => {
    return <div className={cn("flex gap-5 px-2")}>
        {children}
    </div>
}