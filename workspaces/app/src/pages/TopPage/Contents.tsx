import { Suspense, useId } from 'react';

import { BookCard } from '../../features/book/components/BookCard';
import { FeatureCard } from '../../features/feature/components/FeatureCard';
import { useFeatureList } from '../../features/feature/hooks/useFeatureList';
import { RankingCard } from '../../features/ranking/components/RankingCard';
import { useRankingList } from '../../features/ranking/hooks/useRankingList';
import { useRelease } from '../../features/release/hooks/useRelease';
import { Box } from '../../foundation/components/Box';
import { Flex } from '../../foundation/components/Flex';
import { Spacer } from '../../foundation/components/Spacer';
import { Text } from '../../foundation/components/Text';
import { Color, Space, Typography } from '../../foundation/styles/variables';
import { getDayOfWeekStr } from '../../lib/date/getDayOfWeekStr';

const PickupSection: React.FC = () => {
  const { data: featureList } = useFeatureList({ query: {} });

  return (
    <Box maxWidth='100%' overflowX='scroll' overflowY='hidden'>
      <Flex
        align='stretch'
        direction='row'
        gap={Space * 2}
        justify='flex-start'
      >
        {featureList.map((feature) => (
          <FeatureCard key={feature.id} feature={feature} />
        ))}
      </Flex>
    </Box>
  );
};

const RankingSection: React.FC = () => {
  const { data: rankingList } = useRankingList({ query: {} });

  return (
    <Box maxWidth='100%' overflowX='hidden' overflowY='hidden'>
      <Flex align='center' as='ul' direction='column' justify='center'>
        {rankingList.map((ranking) => (
          <RankingCard key={ranking.id} ranking={ranking} />
        ))}
      </Flex>
    </Box>
  );
};

const ReleaseSection: React.FC = () => {
  const todayStr = getDayOfWeekStr(new Date());
  const { data: release } = useRelease({ params: { dayOfWeek: todayStr } });

  return (
    <Box maxWidth='100%' overflowX='scroll' overflowY='hidden'>
      <Flex align='stretch' gap={Space * 2} justify='flex-start'>
        {release.books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </Flex>
    </Box>
  );
};

const Contents = () => {
  const pickupA11yId = useId();
  const rankingA11yId = useId();
  const todayA11yId = useId();

  return (
    <Box as='main' maxWidth='100%' width='100%'>
      <Box
        aria-labelledby={pickupA11yId}
        as='section'
        maxWidth='100%'
        mt={16}
        width='100%'
      >
        <Text
          as='h2'
          color={Color.MONO_100}
          id={pickupA11yId}
          typography={Typography.NORMAL20}
          weight='bold'
        >
          ピックアップ
        </Text>
        <Spacer height={Space * 2} />
        <Suspense fallback={null}>
          <PickupSection />
        </Suspense>
      </Box>

      <Spacer height={Space * 2} />

      <Box
        aria-labelledby={rankingA11yId}
        as='section'
        maxWidth='100%'
        width='100%'
      >
        <Text
          as='h2'
          color={Color.MONO_100}
          id={rankingA11yId}
          typography={Typography.NORMAL20}
          weight='bold'
        >
          ランキング
        </Text>
        <Spacer height={Space * 2} />
        <Suspense fallback={null}>
          <RankingSection />
        </Suspense>
      </Box>

      <Spacer height={Space * 2} />

      <Box
        aria-labelledby={todayA11yId}
        as='section'
        maxWidth='100%'
        width='100%'
      >
        <Text
          as='h2'
          color={Color.MONO_100}
          id={todayA11yId}
          typography={Typography.NORMAL20}
          weight='bold'
        >
          本日更新
        </Text>
        <Spacer height={Space * 2} />
        <Suspense fallback={null}>
          <ReleaseSection />
        </Suspense>
      </Box>
    </Box>
  );
};

export const TopContents: React.FC = () => {
  return (
    <Suspense fallback={null}>
      <Contents />
    </Suspense>
  );
};
