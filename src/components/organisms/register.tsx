import { RegisterForm } from "@/components/molecules/register-form";
import { cn } from "@/lib/utils";

export const Register = () => {
  return (
    <div className={"w-96"}>
      <h3 className={cn("text-2xl p-2 font-semibold text-center")}>
        Create an Account
      </h3>
      <RegisterForm />
    </div>
  );
};
