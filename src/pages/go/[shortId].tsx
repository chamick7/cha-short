import type { GetServerSidePropsContext } from 'next'
import type { ParsedUrlQuery } from 'querystring'
import { prisma } from '@server/db/client'

interface PageParams extends ParsedUrlQuery {
  shortId: string
}

export default function Go() {
  return null
}

export async function getServerSideProps(
  context: GetServerSidePropsContext<PageParams>
) {
  const shortId = context.params?.shortId

  if (shortId) {
    const urlInfo = await prisma.url.findUnique({ where: { shortId } })

    if (urlInfo) {
      context.res.writeHead(301, { Location: urlInfo.longURL })
      context.res.end()
    }
  } else {
    context.res.writeHead(301, { Location: '/' })
    context.res.end()
  }

  return {
    props: {},
  }
}
