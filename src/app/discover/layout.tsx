import { Suspense } from 'react';

import DiscoverFilters from '@/components/DiscoverFilters';
import DiscoverGenresContainer from '@/components/DiscoverFilters/GenresContainer';
// import DiscoverWatchProvidersContainer from '@/components/DiscoverFilters/WatchProvidersContainer';
import SortBySelect from '@/components/Grid/SortBySelect';
import Page from '@/components/Page/Page';

const sortOptions = [
  {
    value: 'popularity.desc',
    label: 'Popularity',
  },
  {
    value: 'first_air_date.desc',
    label: 'Air date',
  },
  {
    value: 'vote_average.desc',
    label: 'Vote avg.',
  },
  {
    value: 'vote_count.desc',
    label: 'Vote count',
  },
];

export default async function DiscoverLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Page backgroundContext="dots">
      <div className="container">
        <div className="relative">
          <Suspense
            fallback={
              <div className="absolute left-0 top-0 z-10 h-11 w-32 animate-pulse rounded-3xl bg-white/5 backdrop-blur-xl" />
            }
          >
            <SortBySelect
              className="absolute left-0 top-0 z-10 h-11 w-36"
              options={sortOptions}
            />
          </Suspense>
        </div>
        <Suspense
          fallback={
            <div className="relative ml-auto h-11 w-32 animate-pulse rounded-3xl bg-white/5 backdrop-blur-xl" />
          }
        >
          <DiscoverFilters className="relative mb-10 items-end">
            <Suspense fallback="Loading...">
              <DiscoverGenresContainer />
            </Suspense>
            {/* <Suspense fallback="Loading...">
            <DiscoverWatchProvidersContainer />
          </Suspense> */}
          </DiscoverFilters>
        </Suspense>
        {children}
      </div>
    </Page>
  );
}
