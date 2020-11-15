import React from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';

const Repos = () => {

  const {repos} = React.useContext(GithubContext);

  const languages = repos.reduce((total, item) => {
    const {language, stargazers_count} = item;
    if(!language) return total;

    if(!total[language]) total[language] = {label: language, value: 1, stars: stargazers_count};
    else total[language] = {
      ...total[language], 
      value: total[language].value+1,
      stars: total[language].stars + stargazers_count,
    };
    return total;
  },{})

  //Most used languages
  const mostUsed = Object.values(languages).sort((a,b) => {
    return b.value - a.value;
  }).slice(0,5);

  //Most stars per languages
  const mostPopular = Object.values(languages).sort((a,b) => {
    return b.stars - a.stars;
  }).map((item) => {
    return {...item, value: item.stars}
  }).slice(0,5);
  //Here we need to flip the value and stars property as our chart is looking for the value property, not for the stars property.

  //Stars and Forks
  // let {stars,forks} = repos.reduce((total, item) => {

  //   const {stargazers_count, name, forks} = item;
  //   total.stars[stargazers_count] = {label: name, value: stargazers_count}
  //   return total;
  // }, {
  //   stars: {},
  //   forks: {},
  // })  
  const stars = repos.reduce((total, item) => {
    const {stargazers_count, name} = item;

    if(!name || stargazers_count === 0) return total;
    total[name] = {label: name, value: stargazers_count}
    return total;
  }, {})  

  const forks = repos.reduce((total, item) => {
    const {forks, name} = item;

    if(!name || forks === 0) return total;
    total[name] = {label: name, value: forks}
    return total;
  }, {})

 // forks = Object.values(forks).slice(-5).reverse();
  const mostStarred = Object.values(stars).sort((a,b) => {
    return b.value - a.value;
  }).slice(0,5);

  const mostForked = Object.values(forks).sort((a,b) => {
    return b.value - a.value;
  }).slice(0,5);

  return(
    <section className='section'>
      <Wrapper className='section-center'>
        {/* <ExampleChart data={chartData}/>; */}
        <Pie3D data={mostUsed}/>
        <Column3D data={mostStarred}/>
        <Doughnut2D data={mostPopular}/>
        <Bar3D data={mostForked}/>
      </Wrapper>
    </section>
  ) 
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
