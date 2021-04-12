import { useContext } from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
// import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';
import { Pie3D } from './Charts';

interface ChartData {
  label: string;
  value: string;
}

interface Language {
  [key: string]: number;
}

const transformLanguageData = (languages: Language): ChartData[] => {
  let chartData: ChartData[] = [];

  for (const language in languages) {
    chartData.push({ 
      label: language, 
      value: languages[language].toString()
    });
  }

  // Sort and display top 5 languages
  chartData = chartData.sort((a, b) => parseInt(b.value) - parseInt(a.value)).slice(0, 5);

  return chartData;
}

const Repos = () => {
  const { repos } = useContext(GithubContext);
  const languages: Language = repos?.reduce((total, item) => {
    const { language } = item;
    if (!language) {
      return total;
    }

    if (!(language in total)) {
      total[language] = 0;
    }

    total[language]++;

    return total;
  }, {});

  const pid3DChartData = transformLanguageData(languages);

  return (
    <section className="section">
      <Wrapper className="section-center">
        {/* <ExampleChart data={chartData} /> */}
        <Pie3D data={pid3DChartData} />
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
