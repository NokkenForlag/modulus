import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Utforskende matematikk',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Modulus hjelper deg å bygge konseptuell forståelse uten å miste faglig overblikk. Vi vektlegger begrepsbygging, visuell støtte og rike problemløsningsoppgaver. Alt er strukturert for å stimulere utforskende og kreativ tenkning.
      </>
    ),
  },
  {
    title: 'Oversikt og sammenheng',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Fagstoffet i Modulus er organisert tematisk og hierarkisk, slik at du alltid ser hvordan begreper henger sammen. Du får støtte til å bygge helhetlig forståelse – fra det konkrete til det abstrakte.
      </>
    ),
  },
  {
    title: 'Visuell og interaktiv læring',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Gjennom interaktive animasjoner, faglige illustrasjoner og tydelig grafisk presentasjon gir Modulus deg mer enn bare tekst – du får hjelp til å se, gripe og utforske matematikken.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
