import Image from "next/image";
import ImageGallery from "./components/ImageGallery";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-16 p-24">
      <h1 className="text-5xl Abril">Gallery Images</h1>
      <div>
        <ImageGallery />
      </div>
    </main>
  );
}
