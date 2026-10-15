import { experience } from '../data/site'
import { PageHeader, Section } from '../components/ui'
import { Timeline } from '../components/widgets'
import { useSeo } from '../lib/seo'

export default function Experience() {
  useSeo('Experience', 'Career timeline of Muhammed Kamil Babatunde: Sprint Africa Logistics, independent contracts, Wema Bank and client web development.')
  return (
    <>
      <PageHeader eyebrow="Experience" title="A career built on shipping." lead="Enterprise banking, freelance product delivery and a founding-engineer role." />
      <Section><Timeline items={experience} /></Section>
    </>
  )
}
