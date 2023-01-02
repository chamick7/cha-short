import { isValidUrl, transformURL } from '@utils/url'
import { router, publicProcedure } from '@server/trpc/trpc'
import { z } from 'zod'
import { TRPCError } from '@trpc/server'
import { nanoid } from 'nanoid'
import { env } from 'src/env/server.mjs'
import { prisma } from '@server/db/client'

const shortenRequest = z.object({
  url: z.string().url(),
})

export const shortenRouter = router({
  shortURL: publicProcedure
    .input(shortenRequest)
    .mutation(async ({ input }) => {
      const { url } = input

      if (!isValidUrl(url)) {
        return new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Invalid url',
        })
      }

      const longURL = transformURL(url)
      const shortId = nanoid(7)
      const shortURL = new URL(env.DOMAIN).href + 'go/' + shortId

      try {
        await prisma.url.create({ data: { longURL, shortId, shortURL } })
      } catch (error) {
        return new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Query went wrong',
        })
      }

      return shortURL
    }),
})
