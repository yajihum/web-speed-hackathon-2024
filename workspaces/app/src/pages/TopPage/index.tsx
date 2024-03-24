import { Box } from '../../foundation/components/Box';
import { Flex } from '../../foundation/components/Flex';
import { Space } from '../../foundation/styles/variables';

import { TopContents } from './Contents';
import { CoverSection } from './CoverSection';

export const TopPage: React.FC = () => {
  return (
    <Flex
      align='flex-start'
      direction='column'
      gap={Space * 2}
      justify='center'
      pb={Space * 2}
    >
      <Box as='header' maxWidth='100%' width='100%'>
        <CoverSection />
      </Box>
      <TopContents />
    </Flex>
  );
};
