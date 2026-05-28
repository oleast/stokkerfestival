import { Suspense } from 'react';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Activities from '@/components/sections/Activities';
import Gallery from '@/components/sections/Gallery';
import PracticalInfo from '@/components/sections/PracticalInfo';
import Registration from '@/components/sections/Registration';
import GuestList from '@/components/sections/GuestList';
import Unregister from '@/components/sections/Unregister';

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Activities />
      <Suspense fallback={null}>
        <Gallery />
      </Suspense>
      <PracticalInfo />
      <Registration />
      <Suspense
        fallback={
          <div className="px-6 py-20">
            <div className="mx-auto max-w-5xl">
              <p className="text-text-muted">Laster gjesteliste...</p>
            </div>
          </div>
        }
      >
        <GuestList />
      </Suspense>
      <Suspense fallback={null}>
        <Unregister />
      </Suspense>
    </main>
  );
}
