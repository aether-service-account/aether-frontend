import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PhotoUpload } from "@/components/atoms/photo-upload";
import { ProfileImages } from "@/components/molecules/profile-images";

interface ProfileProps {
  photoURL: string | null;
  displayName: string | null;
}

export const Profile: React.FC<ProfileProps> = ({ photoURL, displayName }) => {
  return (
    <div className={"w-full"}>
      <div className="mb-4">
        <Avatar className={"w-24 h-24"}>
          <AvatarImage
            src={photoURL ?? ""}
            alt={displayName ?? "User Avatar"}
          />
          <AvatarFallback>{displayName?.[0]}</AvatarFallback>
        </Avatar>
        <br />
        <PhotoUpload />
      </div>
      <ProfileImages />
    </div>
  );
};
