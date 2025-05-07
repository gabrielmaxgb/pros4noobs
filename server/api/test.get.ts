import clientPromise from '~/server/db/mongo'

export default defineEventHandler(async (event) => {

  console.log('event', event)

  try {
    const client = await clientPromise
    const db = client.db('sample_mflix')
    const collection = db.collection('movies')
    const movies = await collection.find().limit(10).toArray()
    return movies
  } catch (error) {
    console.error('[Mongo Fetch Error]', error)
    return { error: true, message: 'Erro ao buscar filmes', details: error }
  }
})
