import clientPromise from '~/server/db/mongo'

export default defineEventHandler(async () => {
  const client = await clientPromise
  const db = client.db('pros4noobs')
  const techs = await db.collection('technologies').find().toArray()
  return techs
})
