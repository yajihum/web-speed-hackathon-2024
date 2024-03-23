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
  height: 576px;
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
          loading='eager'
          src='/assets/hero-image.webp'
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
