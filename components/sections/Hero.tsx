import Image from 'next/image';
import Countdown from '@/components/ui/Countdown';
import heroImage from '@/img/IMG_20200623_192830.jpg';

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col lg:flex-row">
      {/* Image panel - shows first on mobile */}
      <div className="relative h-[50vh] w-full lg:h-auto lg:w-1/2">
        <Image
          src={heroImage}
          alt="Gården på Sørumsvegen 50 i kveldssol"
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        {/* Gradient overlay for mobile header contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent lg:hidden" />
      </div>

      {/* Text panel */}
      <div className="flex w-full flex-col justify-center bg-primary px-8 py-16 lg:w-1/2 lg:px-16">
        <div className="mx-auto max-w-lg">
          <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            Stokkerfestivalen
          </h1>
          <p className="mt-4 text-xl text-white/80 md:text-2xl">
            30 år. Halvveis til 60. Det krever en fest.
          </p>
          <div className="mt-8 space-y-1">
            <p className="text-lg font-medium text-white">22. august 2026</p>
            <p className="text-lg text-white/70">Sørumsvegen 50</p>
          </div>
          <div className="mt-4">
            <Countdown />
          </div>
          <a
            href="#pamelding"
            className="mt-10 inline-block rounded-lg bg-white px-8 py-3.5 text-lg font-semibold text-primary transition-colors hover:bg-background"
          >
            Meld deg på
          </a>
        </div>
      </div>
    </section>
  );
}
