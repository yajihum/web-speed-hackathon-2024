import { createSelectSchema } from 'drizzle-zod';
import type { z } from 'zod';

import { episode } from '../../models';

export const GetEpisodeListResponseSchema = createSelectSchema(episode)
  .pick({
    chapter: true,
    description: true,
    id: true,
    imageId: true,
    name: true,
    nameRuby: true,
  })
  // .extend({
  //   image: createSelectSchema(image).pick({
  //     alt: true,
  //     id: true,
  //   }),
  //   // pages: createSelectSchema(episodePage)
  //   //   .pick({
  //   //     id: true,
  //   //     page: true,
  //   //   })
  //   //   .extend({
  //   //     image: createSelectSchema(image).pick({
  //   //       alt: true,
  //   //       id: true,
  //   //     }),
  //   //   })
  //   //   .array(),
  // })
  .array();

export type GetEpisodeListResponse = z.infer<
  typeof GetEpisodeListResponseSchema
>;
