import { getImageById } from "~/server/db/queries";

export default async function PhotoModal(props: { id: number }) {
  const image = await getImageById(props.id);
  return <img src={image.url} alt={image.name} className="w-96" />;
}
