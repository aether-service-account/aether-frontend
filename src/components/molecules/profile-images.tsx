import Image from "next/image";

export const ProfileImages = () => {
  return (
    <div className="grid grid-cols-4 w-full gap-3">
      <div className="relative aspect-square overflow-hidden rounded-md w-auto">
        <Image
          src="https://picsum.photos/300/300"
          layout="fill"
          alt="Picture of the author"
          objectFit="cover"
        />
      </div>
      <div className="relative w-fit h-auto aspect-square overflow-hidden rounded-md">
        <Image
          src="https://picsum.photos/500/900"
          layout="fill"
          alt="Picture of the author"
          objectFit="cover"
        />
      </div>
      <div className="relative w-fit h-auto aspect-square overflow-hidden rounded-md">
        <Image
          src="https://picsum.photos/500/900"
          layout="fill"
          alt="Picture of the author"
          objectFit="cover"
        />
      </div>
      <div className="relative w-fit h-auto aspect-square overflow-hidden rounded-md">
        <Image
          src="https://picsum.photos/500/900"
          layout="fill"
          alt="Picture of the author"
          objectFit="cover"
        />
      </div>
      <div className="relative w-fit h-auto aspect-square overflow-hidden rounded-md">
        <Image
          src="https://picsum.photos/500/900"
          layout="fill"
          alt="Picture of the author"
          objectFit="cover"
        />
      </div>
    </div>
  );
};
