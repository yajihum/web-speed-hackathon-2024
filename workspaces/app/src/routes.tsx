import { Route, Routes } from 'react-router-dom';
import { styled } from 'styled-components';

import { ArrowBack } from './features/icons/Svgs';
import { Link } from './foundation/components/Link';
import { Text } from './foundation/components/Text';
import { ActionLayout } from './foundation/layouts/ActionLayout';
import { Color, Space, Typography } from './foundation/styles/variables';

const _BackToTopButton = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${Space * 1}px;
  border: none;
  background-color: transparent;
`;

export const Router: React.FC = () => {
  return (
    <Routes>
      <Route
        lazy={async () => {
          const { CommonLayout } = await import(
            './foundation/layouts/CommonLayout'
          );
          return { Component: CommonLayout };
        }}
        path={'/'}
      >
        <Route
          lazy={async () => {
            const { TopPage } = await import('./pages/TopPage');
            return { Component: TopPage };
          }}
          path={''}
        />
      </Route>
      <Route
        element={
          <ActionLayout
            leftContent={
              <_BackToTopButton href={'/'}>
                <ArrowBack />
                <Text
                  color={Color.MONO_100}
                  typography={Typography.NORMAL16}
                  weight='bold'
                >
                  トップへ戻る
                </Text>
              </_BackToTopButton>
            }
          />
        }
        path={'/'}
      >
        <Route
          lazy={async () => {
            const { BookDetailPage } = await import('./pages/BookDetailPage');
            return { Component: BookDetailPage };
          }}
          path={'books/:bookId'}
        />
        <Route
          lazy={async () => {
            const { EpisodeDetailPage } = await import(
              './pages/EpisodeDetailPage'
            );
            return { Component: EpisodeDetailPage };
          }}
          path={'books/:bookId/episodes/:episodeId'}
        />
        <Route
          lazy={async () => {
            const { AuthorDetailPage } = await import(
              './pages/AuthorDetailPage'
            );
            return { Component: AuthorDetailPage };
          }}
          path={'authors/:authorId'}
        />
        <Route
          lazy={async () => {
            const { SearchPage } = await import('./pages/SearchPage');
            return { Component: SearchPage };
          }}
          path={'search'}
        />
      </Route>
    </Routes>
  );
};
