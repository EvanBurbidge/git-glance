
export const checkIfPrCanMerge = pr => {
  const { reviews: { nodes: reviewNodes = [] }, mergeable } = pr;
  const reviewRequests = reviewNodes.reduce((acc, item) => {
    if (item.state === 'CHANGES_REQUESTED') {
      acc.CHANGES_REQUESTED += 1;
    }
    if (item.state === 'COMMENTED') {
      acc.COMMENTED += 1;
    }
    return acc;
  }, {
    CHANGES_REQUESTED: 0,
    COMMENTED: 0,
  });

  return {
    ...reviewRequests,
    MERGEABLE: mergeable === 'MERGEABLE',
  };
}