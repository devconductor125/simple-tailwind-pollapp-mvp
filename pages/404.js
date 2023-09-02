import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

export default function ErrorPage() {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-center h-full">
        <div className="px-4 lg:py-12">
          <div className="lg:gap-4 lg:flex">
            <div className="mt-4">
              <Image
                src="/notfound.png"
                alt="img"
                width={400}
                height={400}
                className="object-cover w-[400px]"
              />
            </div>
            <div className="flex flex-col items-center justify-center md:py-24 lg:py-32">
              <h1 className="font-bold text-blue-600 text-9xl">404</h1>
              <p className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
                <span className="text-red-500">Oops!</span> Page Not Found
              </p>
              <p className="mb-8 text-center text-gray-500 md:text-lg">
                The page you’re looking for doesn’t exist.
              </p>
              <a
                href="#"
                onClick={() => router.back()}
                className="px-5 py-2 rounded-md text-blue-100 bg-blue-600 hover:bg-blue-700"
              >
                Go back
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
