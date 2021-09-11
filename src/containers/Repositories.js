import React from 'react';
import { Accordion } from '../components/Accordion';
import { Header } from '../components/Header';
import { Loading } from '../components/Loading';
import { RepoListItem } from '../components/Repo/RepoListItem';
import { RepoPagination } from '../components/Repo/RepoPagination';
import { RepoPrSubtitle } from '../components/Repo/RepoPrSubtitle';
import ReposSearchBar from '../components/Repo/ReposSearchBar';
import { RepoSubtitle } from '../components/Repo/RepoSubtitle';
import { useRepos } from '../hooks/useRepos';

const Repositories = () => {
  const {
    repos,
    loading,
    pagingInfo,
    showOnlyWithPrs,
    setCurrentAfter,
    setRepoToExpand,
    setCurrentBefore,
    handleShowOnlyWithPrs
  } = useRepos();
  return (
    <div>
      <Header />
      <div className="pt-10">
        {loading && <Loading />}
        {!loading &&
          <>
            <ReposSearchBar handleToggleFilter={handleShowOnlyWithPrs} isToggled={showOnlyWithPrs}/>
            {repos.map(repo => (
              <Accordion
                key={repo.id}
                title={
                  <RepoListItem
                    id={repo.id}
                    name={repo.name}
                    href={repo.href}
                    onClick={() => setRepoToExpand(repo.id)}
                    SubtitleComponent={
                      <RepoSubtitle prCount={repo.prCount} />
                    }
                  />
                }
                content={
                  repo.prs.map(pr => (
                    <RepoListItem
                      key={pr.id}
                      name={pr.title}
                      href={pr.url}
                      paddingAmount={'4'}
                      textSize=""
                      SubtitleComponent={
                        <RepoPrSubtitle
                          state={pr.state}
                          author={pr.author}
                          createdAt={pr.createdAt}
                          mergeStatus={pr.mergeStatus}
                          commentsCount={pr.comments.totalCount}
                        />
                      }
                    />
                  ))
                }
              />
            ))}
          </>
        }
        <RepoPagination
          pagingInfo={pagingInfo}
          setCurrentAfter={setCurrentAfter}
          setCurrentBefore={setCurrentBefore}
        />
      </div>
    </div>
  )
}

export default Repositories;