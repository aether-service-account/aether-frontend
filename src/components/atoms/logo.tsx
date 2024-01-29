import Link from "next/link";
import {cn} from "@/lib/utils";

export const Logo = () => {
    return <div>
        <Link href={"/"} className={cn("font-bold px-2")}>
            aether/lens
        </Link>
    </div>
}