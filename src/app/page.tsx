import { SignedIn, SignedOut } from "@clerk/nextjs";
import { getMyImages } from "~/server/db/queries";
export const dynamic = "force-dynamic";

const mockUrls = [
  "https://i.redd.it/9b3crq556vjd1.jpeg",
  "https://i.redd.it/c0wwg637lvjd1.jpeg",
  "https://i.redd.it/f1b51u3mlvjd1.jpeg",
  "https://i.redd.it/r1tn74a2jujd1.png",
  "https://i.redd.it/lssteu6qqljd1.jpeg",
];

const mockImages = mockUrls.map((url, index) => ({
  url,
  id: index + 1,
}));

async function Images() {
  const images = await getMyImages();

  return (
    <div className="flex flex-wrap gap-4">
      {images.map((image) => (
        <div key={image.id} className="w-48">
          <img src={image.url} alt={image.name} width={200} height={200} />
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
