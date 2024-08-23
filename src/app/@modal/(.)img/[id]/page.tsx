import { getImageById } from "~/server/queries";
import { Modal } from "./modal";
import FullImagePage from "~/components/full-image-page";

export default function PhotoModal({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  const idAsNumber = parseInt(photoId);
  if (isNaN(idAsNumber)) throw new Error("Invalid photo id");

  return (
    <>
      <Modal>
        <FullImagePage id={idAsNumber} />
      </Modal>
    </>
  );
}
