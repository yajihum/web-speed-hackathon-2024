import { useCallback, useState } from 'react';

import { getScrollToLeft } from '../components/ComicViewerCore';

type Props = {
  abortController: AbortController;
  pageCountParView: number;
  pageWidth: number;
  scrollView: HTMLDivElement | null;
};

export const useComicViewCore = ({
  abortController,
  pageCountParView,
  pageWidth,
  scrollView,
}: Props) => {
  const [isPressed, setIsPressed] = useState(false);
  const [scrollToLeftWhenScrollEnd, setScrollToLeftWhenScrollEnd] = useState(0);

  const handlePointerDown = useCallback(
    (ev: PointerEvent) => {
      const scrollView = ev.currentTarget as HTMLDivElement;
      setIsPressed(true);
      scrollView.style.cursor = 'grabbing';
      scrollView.setPointerCapture(ev.pointerId);
      setScrollToLeftWhenScrollEnd(
        getScrollToLeft({
          pageCountParView,
          pageWidth,
          scrollView,
        }),
      );
    },
    [pageCountParView, pageWidth],
  );

  const handlePointerMove = useCallback(
    (ev: PointerEvent) => {
      if (isPressed) {
        const scrollView = ev.currentTarget as HTMLDivElement;
        scrollView.scrollBy({
          behavior: 'instant',
          left: -1 * ev.movementX,
        });
        setScrollToLeftWhenScrollEnd(
          getScrollToLeft({
            pageCountParView,
            pageWidth,
            scrollView,
          }),
        );
      }
    },
    [isPressed, pageCountParView, pageWidth],
  );

  const handlePointerUp = useCallback(
    (ev: PointerEvent) => {
      const scrollView = ev.currentTarget as HTMLDivElement;
      setIsPressed(false);
      scrollView.style.cursor = 'grab';
      scrollView.releasePointerCapture(ev.pointerId);
      setScrollToLeftWhenScrollEnd(
        getScrollToLeft({
          pageCountParView,
          pageWidth,
          scrollView,
        }),
      );
    },
    [pageCountParView, pageWidth],
  );

  const handleScroll = useCallback(
    (ev: Pick<Event, 'currentTarget'>) => {
      const scrollView = ev.currentTarget as HTMLDivElement;
      setScrollToLeftWhenScrollEnd(
        getScrollToLeft({
          pageCountParView,
          pageWidth,
          scrollView,
        }),
      );
    },
    [pageCountParView, pageWidth],
  );

  const [scrollEndTimer, setScrollEndTimer] = useState<number>(-1);
  abortController.signal.addEventListener(
    'abort',
    () => window.clearTimeout(scrollEndTimer),
    { once: true },
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const handleScrollEnd = useCallback(
    (ev: Pick<Event, 'currentTarget'>) => {
      const scrollView = ev.currentTarget as HTMLDivElement;

      // マウスが離されるまではスクロール中とみなす
      if (isPressed) {
        return setScrollEndTimer(
          window.setTimeout(
            () => handleScrollEnd({ currentTarget: scrollView }),
            0,
          ),
        );
      }
      scrollView.scrollBy({
        behavior: 'smooth',
        left: scrollToLeftWhenScrollEnd,
      });
    },
    [isPressed, scrollToLeftWhenScrollEnd],
  );

  //   let prevContentRect: DOMRectReadOnly | null = null;
  const [prevContentRect, setPrevContentRect] =
    useState<DOMRectReadOnly | null>(null);
  const handleResize = useCallback(
    (entries: ResizeObserverEntry[]) => {
      if (
        prevContentRect != null &&
        prevContentRect.width !== entries[0]?.contentRect.width
      ) {
        requestAnimationFrame(() => {
          scrollView?.scrollBy({
            behavior: 'instant',
            left: getScrollToLeft({ pageCountParView, pageWidth, scrollView }),
          });
        });
      }
      setPrevContentRect(entries[0]?.contentRect ?? null);
    },
    [pageCountParView, pageWidth, prevContentRect, scrollView],
  );

  return {
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handleResize,
    handleScroll,
    handleScrollEnd,
  };
};
