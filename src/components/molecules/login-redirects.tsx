"use client"

import {Button} from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import {googleProvider, firebase} from "@/firebase/config";
import {signInWithPopup} from "@firebase/auth";
import {useRouter} from "next/navigation";

export const LoginRedirects = () => {
    const router = useRouter()
    const onGoogleProviderSignIn = async () => {
        try {
            const res = await signInWithPopup(firebase.auth, googleProvider)
            router.push("/")
        } catch (e) {
            console.log(e)
        }
    }

    return <section className={"flex flex-col gap-2"}>
        <Button
            className="relative w-full"
            type="button"
            variant="outline"
            onClick={() => void onGoogleProviderSignIn()}
        >
            <Image
                alt="google login"
                className="absolute left-6 h-5 w-5"
                height={48}
                src="/icons/google.svg"
                width={48}
            />
            <span>Continue with Google</span>
        </Button>
        <Button
            className="relative w-full"
            type="button"
            variant="outline"
        >
            <Image
                alt="google login"
                className="absolute left-6 h-5 w-5"
                height={48}
                src="/icons/facebook.svg"
                width={48}
            />
            <span>Continue with Facebook</span>
        </Button>

        <small className="mt-5 text-center">
            Don&lsquo;t have an account? Sign up now!
        </small>
        <Button asChild>
            <Link href="/register">Register</Link>
        </Button>
    </section>
}