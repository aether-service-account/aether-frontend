import { redirect } from "next/navigation";

function UserPage() {
  redirect("/user/profile");
}

export default UserPage;
