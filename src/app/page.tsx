import Link from "next/link";

const mockUrls = [
  "https://i.redd.it/9b3crq556vjd1.jpeg",
  "https://i.redd.it/c0wwg637lvjd1.jpeg",
  "https://i.redd.it/f1b51u3mlvjd1.jpeg",
  "https://i.redd.it/r1tn74a2jujd1.png",
  "https://i.redd.it/lssteu6qqljd1.jpeg"
]

const mockImages = mockUrls.map((url, index) => ({
  url,
  id: index +1,
}))

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex flex-wrap gap-4">
        {[...mockImages, ...mockImages, ...mockImages, ...mockImages].map((image) => (
          <div key={image.id} className="w-48">
            <img src={image.url} alt={`Image ${image.id}`} width={200} height={200} />
          </div>
        ))}
      </div>
    </main>
  );
}
