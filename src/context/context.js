import React, { useState, useEffect, useContext, createContext } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";

const GithubContext = createContext();

const GithubProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ show: false, msg: "" });
  //   const [query, setQuery] = useState("john-smilga");
  const [user, setUser] = useState(mockUser);
  const [followers, setFollowers] = useState(mockFollowers);
  const [repos, setRepos] = useState(mockRepos);
  const [requests, setRequests] = useState(0);

  const fetchRequests = async () => {
    try {
      const { data } = await axios(`${rootUrl}/rate_limit`);
      setRequests(data.rate.remaining);
      // setRequests(0);
      // if (!0) {
      if (!data.rate.remaining) {
        setError({
          show: true,
          msg: "Sorry, you have exceeded your hourly rate limit!",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async (query) => {
    setLoading(true);
    setError({ show: false, msg: "" });
    try {
      // const { data: user } = await axios(`${rootUrl}/users/${query}`);
      // console.log(user);
      // setUser(user);

      // const { data: repos } = await axios(`${user.repos_url}?per_page=100`);
      // console.log(repos);
      // setRepos(repos);

      // const { data: followers } = await axios(
      //   `${user.followers_url}?per_page=100`
      // );
      // console.log(followers);
      // setFollowers(followers);
      const test = await Promise.all([
        axios(`${rootUrl}/users/${query}`),
        axios(`${rootUrl}/users/${query}/repos?per_page=100`),
        axios(`${rootUrl}/users/${query}/followers?per_page=100`),
      ]);
      const [{ data: user }, { data: repos }, { data: followers }] = test;
      setUser(user);
      setRepos(repos);
      setFollowers(followers);
    } catch (error) {
      setError({ show: true, msg: "there is no user with that username" });
      console.log(error);
    } finally {
      fetchRequests();
      setLoading(false);
    }
  };

  const handleSubmit = (value) => {
    if (value) {
      fetchData(value);
    }
  };

  useEffect(fetchRequests, []);

  // useEffect(() => {
  //   console.log(requests);
  //   if (requests) fetchData("john-smilga");
  // }, []);

  return (
    <GithubContext.Provider
      value={{
        loading,
        error,
        handleSubmit,
        user,
        requests,
        followers,
        repos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubContext, GithubProvider };

export const useGlobalContext = () => {
  return useContext(GithubContext);
};
