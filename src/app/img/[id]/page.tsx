import FullImagePage from "~/components/full-image-page";

export default function PhotoPage({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  const idAsNumber = parseInt(photoId);
  if (isNaN(idAsNumber)) throw new Error("Invalid photo id");

  return <FullImagePage id={idAsNumber} />;
}