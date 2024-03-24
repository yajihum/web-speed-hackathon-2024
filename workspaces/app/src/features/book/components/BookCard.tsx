import { styled } from 'styled-components';

import type { GetReleaseBookResponse } from '@wsh-2024/schema/src/api/releases/GetReleaseResponse';

import { Flex } from '../../../foundation/components/Flex';
import { Image } from '../../../foundation/components/Image';
import { Link } from '../../../foundation/components/Link';
import { Text } from '../../../foundation/components/Text';
import {
  Color,
  Radius,
  Space,
  Typography,
} from '../../../foundation/styles/variables';

const _Wrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  border-radius: ${Radius.SMALL};
  background-color: ${Color.MONO_A};
  max-width: 192px;
  border: 1px solid ${Color.MONO_30};
`;

const _ImgWrapper = styled.div`
  > img {
    border-radius: ${Radius.SMALL} ${Radius.SMALL} 0 0;
  }
`;

const _AvatarWrapper = styled.div`
  width: 32px;
  height: 32px;
  > img {
    border-radius: 50%;
  }
`;

type Props = {
  book: GetReleaseBookResponse;
};

export const BookCard: React.FC<Props> = ({ book }) => {
  return (
    <_Wrapper href={`/books/${book.id}`}>
      <_ImgWrapper>
        <Image
          alt={book.image.alt}
          height={128}
          objectFit='cover'
          src={`/assets/images/${book.image.id}.webp`}
          width={192}
        />
      </_ImgWrapper>

      <Flex
        align='stretch'
        direction='column'
        flexGrow={1}
        gap={Space * 1}
        justify='space-between'
        p={Space * 2}
      >
        <Text
          color={Color.MONO_100}
          typography={Typography.NORMAL14}
          weight='bold'
        >
          {book.name}
        </Text>

        <Flex align='center' gap={Space * 1} justify='flex-end'>
          <_AvatarWrapper>
            <Image
              alt={book.author.name}
              height={32}
              objectFit='cover'
              src={`/assets/images/${book.author.image.id}.webp`}
              width={32}
            />
          </_AvatarWrapper>
          <Text color={Color.MONO_100} typography={Typography.NORMAL12}>
            {book.author.name}
          </Text>
        </Flex>
      </Flex>
    </_Wrapper>
  );
};
