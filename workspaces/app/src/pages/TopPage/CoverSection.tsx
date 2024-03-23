import styled from 'styled-components';

import { Search } from '../../features/icons/Svgs';
import { Link } from '../../foundation/components/Link';
import { Text } from '../../foundation/components/Text';
import {
  Color,
  Radius,
  Space,
  Typography,
} from '../../foundation/styles/variables';

const _ImageWrapper = styled.div`
  aspect-ratio: 16 / 9;
  width: 100%;
`;

const _Image = styled.img`
  display: inline-block;
  width: 100%;
  max-height: 576px;
`;

const _Wrapper = styled.div`
  width: calc(100% + ${Space * 4}px);
  margin-left: -${Space * 2}px;
  margin-right: -${Space * 2}px;
  margin-top: -${Space * 2}px;
  position: relative;
`;

const _SearchLink = styled(Link)`
  position: absolute;
  right: ${Space * 1}px;
  top: 0;
  padding: ${Space * 1}px ${Space * 2}px;
  border: 2px solid ${Color.MONO_A};
  border-radius: ${Radius.X_LARGE};
  backdrop-filter: blur(12px);
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateY(50%);
`;

export const CoverSection: React.FC = () => {
  return (
    <_Wrapper>
      <_ImageWrapper>
        <_Image
          alt='Cyber TOON'
          decoding='async'
          loading='eager'
          sizes='(max-width: 1024px) 100vw, 1024px'
          src='/assets/hero-image-1024.webp'
          srcSet={[
            '/assets/hero-image-256.webp 256w',
            '/assets/hero-image-384.webp 384w',
            '/assets/hero-image-512.webp 512w',
            '/assets/hero-image-768.webp 768w',
            '/assets/hero-image-1024.webp 1024w',
          ].join(',')}
        />
      </_ImageWrapper>
      <_SearchLink href='/search'>
        <Search />
        <Text color={Color.MONO_A} typography={Typography.NORMAL16}>
          検索
        </Text>
      </_SearchLink>
    </_Wrapper>
  );
};
