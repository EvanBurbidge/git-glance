import React from 'react';
import { Accordion } from '../components/Accordion';
import { Header } from '../components/Header';
import { RepoListItem } from '../components/Repo/RepoListItem';
import { RepoPrSubtitle } from '../components/Repo/RepoPrSubtitle';
import { RepoSubtitle } from '../components/Repo/RepoSubtitle';
import { useRepos } from '../hooks/useRepos';

const Repositories = () => {
  const { repos, setRepoToExpand } = useRepos();
  return (
    <div>
      <Header />
      <div className="pt-10">
        {repos.map(repo => (
          <Accordion
            title={
              <RepoListItem
                id={repo.id}
                key={repo.id}
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
                  SubtitleComponent={
                    <RepoPrSubtitle author={pr.author} state={pr.state} createdAt={pr.createdAt} mergeStatus={pr.mergeStatus} />
                  }
                />
              ))
            }
          />
        ))}
      </div>
    </div>
  )
}

export default Repositories;