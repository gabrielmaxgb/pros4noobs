import GeneralConfiguration from '../models/configurations'

export default async function seedCore() {
  const techsConfig = await GeneralConfiguration.findOne({
    key: "technologies",
  })

  if (techsConfig) {
    console.log('Core seed: technologies already seeded.')
    return
  }

  const technologies = [
    "React",
    "Vue.js",
    "Node.js",
    "Express",
    "MongoDB",
    "PostgreSQL",
    "MySQL",
  ]

  await GeneralConfiguration.create({
    key: "technologies",
    value: technologies.join(","),
  })

  console.log('Core seed: technologies inserted.')
}
