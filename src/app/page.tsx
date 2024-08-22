import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { getMyImages } from "~/server/db/queries";
export const dynamic = "force-dynamic";

async function Images() {
  const images = await getMyImages();

  return (
    <div className="flex flex-wrap gap-4 p-4">
      {images.map((image) => (
        <div key={image.id} className="w-48">
          <Link href={`/img/${image.id}`}>
            <img src={image.url} alt={image.name} width={200} height={200} />
          </Link>
          <p>{image.name}</p>
        </div>
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
        <SignedOut>
          <div>Sign in to view images</div>
        </SignedOut>
        <SignedIn>
          <Images />
        </SignedIn>
    </main>
  );
}
