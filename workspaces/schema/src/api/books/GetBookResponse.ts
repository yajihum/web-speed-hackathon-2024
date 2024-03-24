import { createSelectSchema } from 'drizzle-zod';
import type { z } from 'zod';

import { author, book, episode, episodePage, image } from '../../models';

export const GetBookResponseSchema = createSelectSchema(book)
  .pick({
    description: true,
    id: true,
    name: true,
    nameRuby: true,
  })
  .extend({
    author: createSelectSchema(author)
      .pick({
        description: true,
        id: true,
        name: true,
      })
      .extend({
        image: createSelectSchema(image).pick({
          alt: true,
          id: true,
        }),
      }),
    episodes: createSelectSchema(episode)
      .pick({
        chapter: true,
        description: true,
        id: true,
        imageId: true,
        name: true,
        nameRuby: true,
      })
      .extend({
        pages: createSelectSchema(episodePage)
          .pick({
            id: true,
            page: true,
          })
          .extend({
            image: createSelectSchema(image).pick({
              alt: true,
              id: true,
            }),
          })
          .array(),
      })
      .array(),
    image: createSelectSchema(image).pick({
      alt: true,
      id: true,
    }),
  });

export type GetBookResponse = z.infer<typeof GetBookResponseSchema>;

export const GetBookEpisodesResponseSchema = createSelectSchema(episode).pick({
  chapter: true,
  description: true,
  id: true,
  imageId: true,
  name: true,
  nameRuby: true,
});

export type GetBookEpisodesResponse = z.infer<
  typeof GetBookEpisodesResponseSchema
>;
