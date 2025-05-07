import seedCore from './seed-core'
import seedDevOnly from './seed-dev-only'

async function runSeeds() {
  console.log('🌱 Running seeds...')

  await seedCore()

  if (process.env.NODE_ENV === 'development') {
    console.log('👨‍💻 Development mode: running dev-only seeds...')
    await seedDevOnly()
  } else {
    console.log('Skipping dev-only seeds in production')
  }

  console.log('Seeding complete.')
  process.exit(0)
}

runSeeds().catch((err) => {
  console.error('Seed error:', err)
  process.exit(1)
})
