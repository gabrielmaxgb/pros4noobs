import seedCore from './seed-core'
import seedDevOnly from './seed-dev-only'

export default async function runSeeds() {
  console.log('🌱 Running seeds...')

  await seedCore()

  if (process.env.NODE_ENV === 'development') {
    console.log('👨‍💻 Development mode: running dev-only seeds...')
    await seedDevOnly()
  } else {
    console.log('Skipping dev-only seeds in production')
  }

  console.log('Seeding complete.')
}
