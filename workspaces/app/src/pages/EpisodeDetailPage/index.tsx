import { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import type { RouteParams } from 'regexparam';

import { useBook } from '../../features/book/hooks/useBook';
import { EpisodeListItem } from '../../features/episode/components/EpisodeListItem';
import { useEpisode } from '../../features/episode/hooks/useEpisode';
import { Box } from '../../foundation/components/Box';
import { Flex } from '../../foundation/components/Flex';
import { Separator } from '../../foundation/components/Separator';
import { Space } from '../../foundation/styles/variables';

import { ComicViewer } from './internal/ComicViewer';

const EpisodeViewer = ({ episodeId }: { episodeId: string | undefined }) => {
  const { data: episode } = useEpisode({
    params: { episodeId: episodeId || '' },
  });

  return (
    <section aria-label='漫画ビューアー'>
      <ComicViewer episodeId={episode.id} />
    </section>
  );
};

const EpisodeList = ({ bookId }: { bookId: string | undefined }) => {
  const { data: book } = useBook({ params: { bookId: bookId || '' } });

  return (
    <Box aria-label='エピソード一覧' as='section' px={Space * 2}>
      <Flex align='center' as='ul' direction='column' justify='center'>
        {book.episodes.map((episode) => (
          <Suspense key={episode.id} fallback={null}>
            <EpisodeListItem bookId={bookId || ''} episode={episode} />
          </Suspense>
        ))}
      </Flex>
    </Box>
  );
};

const EpisodeDetailPage: React.FC = () => {
  const { bookId, episodeId } =
    useParams<RouteParams<'/books/:bookId/episodes/:episodeId'>>();

  return (
    <Box>
      <Suspense fallback={null}>
        <EpisodeViewer episodeId={episodeId} />
      </Suspense>

      <Separator />

      <Suspense fallback={null}>
        <EpisodeList bookId={bookId} />
      </Suspense>
    </Box>
  );
};

const EpisodeDetailPageWithSuspense: React.FC = () => {
  return (
    <Suspense fallback={null}>
      <EpisodeDetailPage />
    </Suspense>
  );
};

export { EpisodeDetailPageWithSuspense as EpisodeDetailPage };
