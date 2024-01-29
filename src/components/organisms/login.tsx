import {LoginForm} from "@/components/molecules/login-form";
import {cn} from "@/lib/utils";


export const Login = () => {
    return <div className={"w-96"}>
        <h3 className={cn("text-2xl p-2 font-semibold text-center")}>Sign in to your account</h3>
        <LoginForm />
    </div>
}