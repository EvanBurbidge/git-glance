import React from 'react';
import { Header } from '../components/Header';
import { Loading } from '../components/Loading';
import NoData from '../components/NoData';
import { RepoListItem } from '../components/Repo/RepoListItem';
import { RepoPagination } from '../components/Repo/RepoPagination';
import { RepoPrSubtitle } from '../components/Repo/RepoPrSubtitle';
import { usePrs } from '../hooks/usePrs';

const Repositories = () => {
  const { pulls, pullsLoading: loading, handleUpdateQuery, fetchPaginatedPrs, pagingInfo } = usePrs();
  return (
    <div>
      <Header updateQuery={handleUpdateQuery} />
      <div className="pt-12">
        {loading && <Loading />}
        {!loading && pulls.length > 0 && pulls.map(pr => (
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
        ))}
        {!loading && !pulls.length && <NoData />}
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

export default Repositories;