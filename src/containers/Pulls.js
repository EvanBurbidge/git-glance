import React from 'react';
import { Header } from '../components/Header';
import { Loading } from '../components/Loading';
import NoData from '../components/NoData';
import { RepoListItem } from '../components/Repo/RepoListItem';
import { RepoPagination } from '../components/Repo/RepoPagination';
import { RepoPrSubtitle } from '../components/Repo/RepoPrSubtitle';
import { usePrs } from '../hooks/usePrs';

const Pulls = () => {
  const { pulls, pullsLoading: loading, handleUpdateQuery, fetchPaginatedPrs, pagingInfo } = usePrs();
  console.log('Pulls')
  return (
    <div>
      <Header updateQuery={handleUpdateQuery} />
      {(!pulls.length || loading) && (
        <NoData loading={loading} />
      )}
      <div className="pt-10">
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
          <RepoPagination
            pagingInfo={pagingInfo}
            fetchMorePrs={fetchPaginatedPrs}
          />
        )}
      </div>
    </div>
  )
}

export default Pulls;