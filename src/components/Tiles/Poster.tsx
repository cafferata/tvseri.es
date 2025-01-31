'use client';

import { memo } from 'react';

import { cva, cx } from 'class-variance-authority';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import { type TvSeries } from '@/types/tv-series';
import svgBase64Shimmer from '@/utils/svgBase64Shimmer';

const MotionLink = motion.create(Link);

export const posterStyles = cva(
  'relative h-[275px] w-[183px] flex-shrink-0 overflow-clip rounded-lg shadow-lg lg:h-[300px] lg:w-[200px] xl:h-[375px] xl:w-[250px] after:shadow-[inset_0_0_0_1px_rgba(221,238,255,0.08)] after:absolute after:inset-0 after:rounded-lg after:content-[""]',
);

function Poster({
  className,
  item,
  priority,
}: Readonly<{ className?: string; item: TvSeries; priority?: boolean }>) {
  return (
    <MotionLink
      key={item.id}
      className={cx(posterStyles(), className)}
      draggable={false}
      href={`/tv/${item.id}/${item.slug}`}
      whileHover={{ scale: 1.075 }}
      animate={{ scale: 1 }}
      layout
    >
      <div className="relative w-full pt-[150%]">
        <Image
          className="rounded-lg object-contain"
          draggable={false}
          src={item.posterImage}
          alt={item.title}
          fill
          priority={priority}
          placeholder={`data:image/svg+xml;base64,${svgBase64Shimmer(300, 450)}`}
          unoptimized
        />
      </div>
    </MotionLink>
  );
}

export default memo(Poster);
