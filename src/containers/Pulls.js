import React from 'react';
import NoData from '../components/NoData';
import { usePrs } from '../hooks/usePrs';
import { Header } from '../components/Header';
import { RepoListItem } from '../components/Repo/RepoListItem';
import { RepoPagination } from '../components/Repo/RepoPagination';
import { RepoPrSubtitle } from '../components/Repo/RepoPrSubtitle';

const Pulls = () => {
  const { pulls, pagingInfo, pullsLoading: loading, setCurrentQuery, fetchOlderPrs, } = usePrs();
  return (
    <div>
      <Header updateQuery={setCurrentQuery} />
      {(!pulls.length || loading) && (
        <NoData loading={loading} />
      )}
      <div className="pt-10">
        {/* {JSON.stringify(pagingInfo, '', '\t')} */}
        {
          !loading && pulls.map(pr => (
            <RepoListItem
              key={pr.id}
              name={pr.title}
              href={pr.url}
              paddingAmount={'4'}
              SubtitleComponent={
                <RepoPrSubtitle
                  state={pr.reviewDecision}
                  createdAt={pr.createdAt}
                  mergeStatus={pr.mergeStatus}
                  repoName={pr.repository.name}
                  author={pr.author}
                  commentsCount={pr.comments.totalCount + pr.reviews.totalCount}
                />
              }
            />
          ))
        }
        {pagingInfo.hasNextPage && (
          <RepoPagination fetchMorePrs={fetchOlderPrs} />
        )}
      </div>
    </div>
  )
}

export default Pulls;