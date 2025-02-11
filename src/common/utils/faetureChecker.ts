type UserPlan = {
  planName: string;
  trial: {
    trialEndDate: string;
  };
  featureSet: [
    {
      feature: string;
      limit: number;
    },
  ];
};
export const featureChecker = (plan: UserPlan, feature: string) => {
  const foundFeature = plan?.featureSet?.find(
    (obj: { feature: string; limit: number }) => obj.feature === feature,
  );

  return foundFeature ? foundFeature.limit >= 1 : false;
};
