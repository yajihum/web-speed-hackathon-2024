import { useAtom } from 'jotai/react';
import { Suspense, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import type { RouteParams } from 'regexparam';
import { styled } from 'styled-components';

import { FavoriteBookAtomFamily } from '../../features/book/atoms/FavoriteBookAtomFamily';
import { useBook } from '../../features/book/hooks/useBook';
import { EpisodeListItem } from '../../features/episode/components/EpisodeListItem';
import { useEpisodeList } from '../../features/episode/hooks/useEpisodeList';
import { Box } from '../../foundation/components/Box';
import { Flex } from '../../foundation/components/Flex';
import { Image } from '../../foundation/components/Image';
import { Link } from '../../foundation/components/Link';
import { Separator } from '../../foundation/components/Separator';
import { Spacer } from '../../foundation/components/Spacer';
import { Text } from '../../foundation/components/Text';
import { Color, Space, Typography } from '../../foundation/styles/variables';
import { getImageUrl } from '../../lib/image/getImageUrl';

import { BottomNavigator } from './internal/BottomNavigator';

const _HeadingWrapper = styled.section`
  display: grid;
  align-items: start;
  grid-template-columns: auto 1fr;
  padding-bottom: ${Space * 2}px;
  gap: ${Space * 2}px;
`;

const _AuthorWrapper = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  gap: ${Space * 1}px;
`;

const _AvatarWrapper = styled.div`
  width: 32px;
  height: 32px;
  > img {
    border-radius: 50%;
  }
`;

const EpisodeList = ({ bookId }: { bookId: string | undefined }) => {
  const { data: episodeList } = useEpisodeList({
    query: { bookId: bookId || '' },
  });

  const [isFavorite, toggleFavorite] = useAtom(
    FavoriteBookAtomFamily(bookId || ''),
  );

  const handleFavClick = useCallback(() => {
    toggleFavorite();
  }, [toggleFavorite]);

  const latestEpisode = episodeList?.find((episode) => episode.chapter === 1);

  return (
    <>
      <BottomNavigator
        bookId={bookId || ''}
        isFavorite={isFavorite}
        latestEpisodeId={latestEpisode?.id ?? ''}
        onClickFav={handleFavClick}
      />
      <section aria-label='エピソード一覧'>
        <Flex align='center' as='ul' direction='column' justify='center'>
          {episodeList.map((episode) => (
            <Suspense key={episode.id} fallback={null}>
              <EpisodeListItem
                key={episode.id}
                bookId={bookId || ''}
                episodeId={episode.id}
              />
            </Suspense>
          ))}
          {episodeList.length === 0 && (
            <>
              <Spacer height={Space * 2} />
              <Text color={Color.MONO_100} typography={Typography.NORMAL14}>
                この作品はまだエピソードがありません
              </Text>
            </>
          )}
        </Flex>
      </section>
    </>
  );
};

const BookDetailPage: React.FC = () => {
  const { bookId } = useParams<RouteParams<'/books/:bookId'>>();

  const { data: book } = useBook({ params: { bookId: bookId || '' } });

  const bookImageUrl = getImageUrl({
    format: 'webp',
    height: 256,
    imageId: book.image.id,
    width: 192,
  });
  const auhtorImageUrl = getImageUrl({
    format: 'webp',
    height: 32,
    imageId: book.author.image.id,
    width: 32,
  });

  return (
    <Box height='100%' position='relative' px={Space * 2}>
      <_HeadingWrapper aria-label='作品情報'>
        {bookImageUrl != null && (
          <Image
            alt={book.name}
            height={256}
            objectFit='cover'
            src={bookImageUrl}
            width={192}
          />
        )}
        <Flex
          align='flex-start'
          direction='column'
          gap={Space * 1}
          justify='flex-end'
        >
          <Box>
            <Text
              color={Color.MONO_100}
              typography={Typography.NORMAL20}
              weight='bold'
            >
              {book.name}
            </Text>
            <Spacer height={Space * 1} />
            <Text
              as='p'
              color={Color.MONO_100}
              typography={Typography.NORMAL14}
            >
              {book.description}
            </Text>
          </Box>

          <Spacer height={Space * 1} />

          <_AuthorWrapper href={`/authors/${book.author.id}`}>
            {auhtorImageUrl != null && (
              <_AvatarWrapper>
                <Image
                  alt={book.author.name}
                  height={32}
                  objectFit='cover'
                  src={auhtorImageUrl}
                  width={32}
                />
              </_AvatarWrapper>
            )}
            <Text color={Color.MONO_100} typography={Typography.NORMAL14}>
              {book.author.name}
            </Text>
          </_AuthorWrapper>
        </Flex>
      </_HeadingWrapper>

      <Separator />

      <Suspense fallback={null}>
        <EpisodeList bookId={bookId} />
      </Suspense>
    </Box>
  );
};

const BookDetailPageWithSuspense: React.FC = () => {
  return (
    <Suspense fallback={null}>
      <BookDetailPage />
    </Suspense>
  );
};

export { BookDetailPageWithSuspense as BookDetailPage };
