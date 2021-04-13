import { useContext } from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { Pie3D, Doughnut2D, Column3D, Bar3D } from './Charts';
import { ChartData } from '../types';

interface Language extends ChartData {
  stars: number
};

interface StarsForks {
  stars: ChartData[];
  forks: ChartData[];
}

const Repos = () => {
  const { repos } = useContext(GithubContext);
  const languages: Language = repos?.reduce((total, item) => {
    const { language, stargazers_count: stargazersCount } = item;
    if (!language) {
      return total;
    }

    if (!(language in total)) {
      total[language] = { label: language, value: 0, stars: stargazersCount };
    }

    total[language] = {
      ...total[language],
      value: total[language].value + 1,
      stars: total[language].stars + stargazersCount,
    };

    return total;
  }, {});

  // Top five language used in all repos
  const topFiveLanguages: Language[] = Object.values(languages)
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  // All star per language
  const mostPopular: Language[] = Object.values(languages)
    .sort((a, b) => b.stars - a.stars)
    .map(item => {
      return { ...item, value: item.stars };
    })
    .slice(0, 5);

  // Most popular and most forked repos
  let { stars, forks }: StarsForks = repos?.reduce((total, item) => {
    const { stargazers_count, name, forks } = item;
    total.stars[stargazers_count] = { label: name, value: stargazers_count };
    total.forks[forks] = { label: name, value: forks };
    return total;
  }, {
    stars: {},
    forks: {}
  });

  stars = Object.values(stars).slice(-5).reverse();
  forks = Object.values(forks).slice(-5).reverse();

  return (
    <section className="section">
      <Wrapper className="section-center">
        <Pie3D data={topFiveLanguages} />
        <Column3D data={stars} />
        <Doughnut2D data={mostPopular} />
        <Bar3D data={forks} />
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
