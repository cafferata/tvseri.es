import { Suspense } from 'react';

import Image from 'next/image';
import { notFound, redirect } from 'next/navigation';

import ContentRating from '@/components/ContentRating/ContentRating';
import Page from '@/components/Page/Page';
import WatchProvider from '@/components/WatchProvider/WatchProvider';
import { fetchTvSeries } from '@/lib/tmdb';
import formatRuntime from '@/utils/formatRuntime';

type Props = Readonly<{
  params: { id: string; slug: string };
}>;

export async function generateMetadata({ params }: Props) {
  const tvSeries = await fetchTvSeries(params.id);

  if (!tvSeries || tvSeries.isAdult) {
    return notFound();
  }

  if (tvSeries.slug !== params.slug) {
    return redirect(`/tv/${params.id}/${tvSeries.slug}`);
  }

  return {
    title: tvSeries.title,
    description: tvSeries.description,
    alternates: {
      // TODO: does this need to be absolute?
      canonical: `/tv/${params.id}/${tvSeries.slug}`,
    },
  };
}

export default async function TvSeriesDetails({ params }: Props) {
  const tvSeries = await fetchTvSeries(params.id);
  await new Promise((resolve) => setTimeout(resolve, 2000));

  if (!tvSeries) {
    return notFound();
  }

  if (tvSeries.slug !== params.slug) {
    return redirect(`/tv/${params.id}/${tvSeries.slug}`);
  }

  return (
    <Page
      backgroundColor={tvSeries.backdropColor}
      backgroundImage={tvSeries.backdropImage}
    >
      <div className="container">
        <div className="relative flex h-[calc(95vh-16rem)] items-end md:h-[calc(75vh-8rem)]">
          <div className="w-full xl:w-4/5 2xl:w-3/5">
            {tvSeries.titleTreatmentImage ? (
              <h1 className="relative mb-6 h-28 w-full md:h-40 md:w-3/5">
                <Image
                  className="object-contain object-bottom md:object-left-bottom"
                  src={tvSeries.titleTreatmentImage}
                  alt=""
                  priority
                  fill
                  draggable={false}
                />
                <span className="hidden">{tvSeries.title}</span>
              </h1>
            ) : (
              <h1 className="relative mb-6 w-full text-center text-3xl font-bold !leading-tight md:w-3/5 md:text-left md:text-4xl lg:text-5xl xl:text-6xl">
                {tvSeries.title}
              </h1>
            )}

            <div className="mb-6 flex w-full gap-4 whitespace-nowrap md:gap-12">
              <div className="flex w-full flex-wrap items-center gap-2 text-xs md:flex-nowrap md:text-[0.8rem]">
                <div className="opacity-60 after:ml-1 after:content-['·']">
                  {tvSeries.releaseYear}
                </div>
                <div className="opacity-60 after:ml-1 after:content-['·']">
                  {tvSeries.numberOfSeasons}{' '}
                  {tvSeries.numberOfSeasons === 1 ? 'Season' : 'Seasons'}
                </div>
                {tvSeries.runtime > 0 && (
                  <div className="opacity-60 after:ml-1 after:content-['·']">
                    {formatRuntime(tvSeries.runtime)}
                  </div>
                )}
                {/* TODO: <Link /> to genre pages */}
                <div className="hidden opacity-60 md:block">
                  {tvSeries.genres.map((genre) => genre.name).join(', ')}
                </div>
                <div className="opacity-60 md:hidden">
                  {tvSeries.genres[0].name}
                </div>
                <div className="mt-6 flex h-7 w-full gap-2 md:ml-8 md:mt-0 md:w-auto">
                  <Suspense
                    fallback={
                      <div className="flex h-7 min-w-7 animate-pulse rounded-sm bg-white/30" />
                    }
                  >
                    <ContentRating id={tvSeries.id} />
                  </Suspense>
                  <Suspense
                    fallback={
                      <div className="flex h-7 min-w-7 animate-pulse rounded bg-white/30" />
                    }
                  >
                    <WatchProvider id={tvSeries.id} />
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full xl:w-4/5 2xl:w-3/5">
          <p className="mb-6 line-clamp-3 leading-loose md:line-clamp-none">
            {tvSeries.description}
          </p>
          {tvSeries.createdBy.length > 0 && (
            <p className="inline-flex gap-3 text-sm leading-loose">
              <span className="opacity-60">Created by:</span>
              {/* TODO: <Link /> to person pages */}
              {tvSeries.createdBy.map((creator) => creator.name).join(', ')}
            </p>
          )}
        </div>
      </div>
    </Page>
  );
}
