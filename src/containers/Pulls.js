import React from 'react';
import NoData from '../components/NoData';
import { usePrs } from '../hooks/usePrs';
import { Header } from '../components/Header';
import { RepoListItem } from '../components/Repo/RepoListItem';
import { RepoPagination } from '../components/Repo/RepoPagination';
import { RepoPrSubtitle } from '../components/Repo/RepoPrSubtitle';
import { useAuth } from '../context/loginContext';

const Pulls = () => {
  const { currentUser } = useAuth();
  const { pulls, pagingInfo, pullsLoading: loading,viewerLoading, setCurrentQuery, fetchOlderPrs, } = usePrs({
    viewer: currentUser,
  });
  return (
    <div>
      <Header updateQuery={setCurrentQuery} />
      {(!pulls.length || loading || viewerLoading) && (
        <NoData loading={loading || viewerLoading} />
      )}
      <div className="pt-14">
        {
          !loading && pulls.map(pr => (
            <RepoListItem
              key={pr.id}
              name={pr.title}
              href={pr.url}
              date={pr.createdAt}
              repo={pr.repository.name}
              author={pr.author}
              state={pr.reviewDecision}
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