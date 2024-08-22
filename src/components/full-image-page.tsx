import { getImageById } from "~/server/db/queries";

export default async function PhotoModal(props: { id: number }) {
  const image = await getImageById(props.id);
  return (
    <div className="flex w-full h-full min-w-0">
      <div className="flex-shrink flex-grow flex items-center justify-center">
        <img src={image.url} alt={image.name} className="object-contain max-h-dvh" />
      </div>
      <div className="w-48 flex flex-col flex-shrink-0">
        <div className="text-2xl font-bold">{image.name}</div>
      </div>
    </div>
  );
}
