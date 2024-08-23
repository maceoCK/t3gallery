import { clerkClient } from "@clerk/nextjs/server";
import { getImageById } from "~/server/db/queries";

export default async function PhotoModal(props: { id: number }) {
  let image;
  try {
    image = await getImageById(props.id);
  } catch (error) {
    console.error("Error fetching image:", error);
    return <div>Image not found</div>;
  }
  const uploaderInfo = await clerkClient().users.getUser(image.userId);
  return (
    <div className="flex h-full w-full min-w-0">
      <div className="flex flex-shrink flex-grow items-center justify-center border-r border-gray-200">
        <img
          src={image.url}
          alt={image.name}
          className="max-h-dvh object-contain"
        />
      </div>
      <div className="flex w-48 flex-shrink-0 flex-col">
        <div className="border-b border-gray-200 p-2 text-lg">{image.name}</div>
        <div className="flex flex-col gap-2 p-2">
          <span>
            Uploaded by: <br /> {uploaderInfo?.firstName}{" "}
            {uploaderInfo?.lastName}
          </span>
          <span>
            Created on: <br /> {image.createdAt.toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}