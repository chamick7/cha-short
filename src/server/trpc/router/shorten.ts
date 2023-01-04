import { isValidUrl, transformURL } from '@utils/url'
import { router, publicProcedure } from '@server/trpc/trpc'
import { z } from 'zod'
import { TRPCError } from '@trpc/server'
import { nanoid } from 'nanoid'
import { env } from 'src/env/server.mjs'

const shortenRequest = z.object({
  url: z.string().url(),
})

export const shortenRouter = router({
  shortURL: publicProcedure
    .input(shortenRequest)
    .mutation(async ({ ctx, input }) => {
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
        const startTime = process.hrtime.bigint()

        await ctx.prisma.url.create({ data: { longURL, shortId, shortURL } })

        const endTime = process.hrtime.bigint()

        console.log('prisma take time ', endTime - startTime)
      } catch (error) {
        return new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Query went wrong',
        })
      }

      return shortURL
    }),
})
