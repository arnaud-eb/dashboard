import React from "react";
import styled from "styled-components";
import { useGlobalContext } from "../context/context";
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from "./Charts";

const Repos = () => {
  const { repos } = useGlobalContext();

  const formatLanguages = (languages, prop) => {
    let array = [];
    for (var lang in languages) {
      if (lang !== "null" && languages[lang][prop] !== 0) {
        array.push({ label: lang, value: languages[lang][prop] });
      }
    }
    return array
      .slice()
      .sort((a, b) => {
        return b.value - a.value;
      })
      .slice(0, 5);
  };

  const formatReps = (reps, prop) => {
    return reps
      .slice()
      .sort((a, b) => {
        return b[prop] - a[prop];
      })
      .slice(0, 5)
      .map(({ repo: label, [prop]: value }) => ({ label, value }));
  };

  const calculate = (repos) => {
    let languages = {};
    let reps = [];
    repos.forEach((rep) => {
      reps.push({
        repo: rep.name,
        stars: rep.stargazers_count,
        forks: rep.forks,
      });
      if (languages.hasOwnProperty(rep.language)) {
        languages[rep.language].amount += 1;
        languages[rep.language].stars += rep.stargazers_count;
      } else {
        languages[rep.language] = { amount: 1, stars: rep.stargazers_count };
      }
    });
    return { languages, reps };
  };

  const { languages, reps } = calculate(repos);

  const amountLanguages = formatLanguages(languages, "amount");
  const mostPopular = formatReps(reps, "stars");
  const starsLanguages = formatLanguages(languages, "stars");
  const mostFork = formatReps(reps, "forks");

  return (
    <section className="section">
      <Wrapper className="section-center">
        <Pie3D data={amountLanguages} />
        <Column3D data={mostPopular} />
        <Doughnut2D data={starsLanguages} />
        <Bar3D data={mostFork} />
        {/* <ExampleChart data={mostPopular} /> */}
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

// let array = repos.reduce((acc, curr) => {
//   if (!curr.language) return acc;
//   if (acc.hasOwnProperty(curr.language)) {
//     acc[curr.language] += 1;
//   } else {
//     acc[curr.language] = 1;
//   }
//   return acc;
// }, {});
// console.log(array);
