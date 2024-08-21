import { getImageById } from "~/server/db/queries";

export default async function PhotoModal({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  const idAsNumber = parseInt(photoId);
  if (isNaN(idAsNumber)) throw new Error("Invalid photo id");

  const image = await getImageById(idAsNumber);
  return (
    <div>
      <img src={image.url} alt={image.name} className="w-96" />
    </div>
  );
}