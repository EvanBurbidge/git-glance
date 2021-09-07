import { useState, useEffect, useContext } from 'react';
import UserContext from '../context/userContext';
import { getGitGraph } from '../utils/getGitGraph';




export const useRepos = () => {
  const user = useContext(UserContext);
  const [repos, setRepos] = useState([]);
  
  const fetchRepos = async token => {
    const graphql = getGitGraph(token);
    const query = await graphql(
      `
        {
          repository(owner: "EvanBurbidge", name: "i18ncore-api") {
            id
          }
        }
      `
    );
    console.log(query);
    setRepos([]);
  };


  useEffect(() => {
    if (user.user.accessToken) {
      fetchRepos(user.user.accessToken);
    }
  }, [user]);

  return {
    repos,
  }

}