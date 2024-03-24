import { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import type { RouteParams } from 'regexparam';
import styled from 'styled-components';

import type { GetBookResponse } from '@wsh-2024/schema/src/api/books/GetBookResponse';

import { useBook } from '../../features/book/hooks/useBook';
import { EpisodeListItem } from '../../features/episode/components/EpisodeListItem';
import { Box } from '../../foundation/components/Box';
import { Flex } from '../../foundation/components/Flex';
import { Separator } from '../../foundation/components/Separator';
import { Space } from '../../foundation/styles/variables';

import { ComicViewer } from './internal/ComicViewer';

type BookEpisodes = GetBookResponse['episodes'];

export type EpisodeType = BookEpisodes[number];

const EpisodeViewer = ({ episode }: { episode: EpisodeType }) => {
  return (
    <section aria-label='漫画ビューアー'>
      <ComicViewer episode={episode} />
    </section>
  );
};

const EpisodeList = ({
  bookId,
  episodes,
}: { bookId: string | undefined; episodes: BookEpisodes }) => {
  return (
    <Box aria-label='エピソード一覧' as='section' px={Space * 2}>
      <Flex align='center' as='ul' direction='column' justify='center'>
        {episodes.map((episode) => (
          <Suspense key={episode.id} fallback={null}>
            <EpisodeListItem bookId={bookId || ''} episode={episode} />
          </Suspense>
        ))}
      </Flex>
    </Box>
  );
};

const EpisodeDetailPageContent: React.FC = () => {
  const { bookId, episodeId } =
    useParams<RouteParams<'/books/:bookId/episodes/:episodeId'>>();

  const { data: book } = useBook({ params: { bookId: bookId || '' } });

  const episode = book.episodes.find((episode) => episode.id === episodeId);
  if (!episode) return null;

  return (
    <Box>
      <Suspense fallback={null}>
        <EpisodeViewer episode={episode} />
      </Suspense>

      <Separator />

      <Suspense fallback={null}>
        <EpisodeList bookId={bookId} episodes={book.episodes} />
      </Suspense>
    </Box>
  );
};

const EpisodeDetailFallback = styled.div`
  width: 100%;
  height: 1000px;
`;

const EpisodeDetailPage: React.FC = () => {
  return (
    <Suspense fallback={<EpisodeDetailFallback />}>
      <EpisodeDetailPageContent />
    </Suspense>
  );
};

export default EpisodeDetailPage;
