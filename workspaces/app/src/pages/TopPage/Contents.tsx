import { Suspense, useId } from 'react';
import styled from 'styled-components';

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
import {
  Color,
  Radius,
  Space,
  Typography,
} from '../../foundation/styles/variables';
import { getDayOfWeekStr } from '../../lib/date/getDayOfWeekStr';

const FeatureCardWrapper = styled.div`
  border-radius: ${Radius.SMALL};
  border: 1px solid ${Color.MONO_30};
  height: 204px;
  width: 328px;
  flex-shrink: 0;
`;

const FeatureCardFallback = () => {
  return (
    <>
      {Array.from({ length: 4 }).map((_, index) => (
        <FeatureCardWrapper key={index} />
      ))}
    </>
  );
};

const PickupSection: React.FC = () => {
  const { data: featureList } = useFeatureList({ query: {} });

  return (
    <>
      {featureList.map((feature) => (
        <FeatureCard key={feature.id} feature={feature} />
      ))}
    </>
  );
};

const RankingCardFallback = styled.div` 
  width: 328px;
  height: 204px;
`;

const RankingSection: React.FC = () => {
  const { data: rankingList } = useRankingList({ query: {} });

  return (
    <>
      {rankingList.map((ranking) => (
        <RankingCard key={ranking.id} ranking={ranking} />
      ))}
    </>
  );
};

const BookCardFallback = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: ${Radius.SMALL};
  background-color: ${Color.MONO_A};
  max-width: 192px;
  border: 1px solid ${Color.MONO_30};
`;

const ReleaseSection: React.FC = () => {
  const todayStr = getDayOfWeekStr(new Date());
  const { data: release } = useRelease({ params: { dayOfWeek: todayStr } });

  return (
    <>
      {release.books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </>
  );
};

export const TopContents = () => {
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
        <Box maxWidth='100%' overflowX='scroll' overflowY='hidden'>
          <Flex
            align='stretch'
            direction='row'
            gap={Space * 2}
            justify='flex-start'
          >
            <Suspense
              fallback={
                <>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <FeatureCardFallback key={index} />
                  ))}
                </>
              }
            >
              <PickupSection />
            </Suspense>
          </Flex>
        </Box>
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
        <Box maxWidth='100%' overflowX='hidden' overflowY='hidden'>
          <Flex align='center' as='ul' direction='column' justify='center'>
            <Suspense
              fallback={
                <>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <RankingCardFallback key={index} />
                  ))}
                </>
              }
            >
              <RankingSection />
            </Suspense>
          </Flex>
        </Box>
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
        <Box maxWidth='100%' overflowX='scroll' overflowY='hidden'>
          <Flex align='stretch' gap={Space * 2} justify='flex-start'>
            <Suspense
              fallback={
                <>
                  {Array.from({ length: 6 }).map((_, index) => (
                    <BookCardFallback key={index} />
                  ))}
                </>
              }
            >
              <ReleaseSection />
            </Suspense>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};
