import { ILookup } from "@/components/profileForm/ProfileForm";
import { useEffect, useState } from "react";

interface IuseLookupData {
  status: string;
}

export const fetchMockRegionsAndTitles = (
  isTitles = false,
): Promise<ILookup[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockData: ILookup[] = !isTitles
        ? [
            { id: 1, name: "North America" },
            { id: 2, name: "Europe" },
            { id: 3, name: "Asia" },
          ]
        : [
            { id: 1, name: "SWE" },
            { id: 2, name: "CEO" },
          ];
      resolve(mockData);
    }, 1000);
  });
};

const useLookupData = ({ status }: IuseLookupData) => {
  const [regions, setRegions] = useState<ILookup[]>([]);
  const [jobTitles, setJobTitles] = useState<ILookup[]>([]);

  useEffect(() => {
    (async () => {
      if (status === "IncompleteProfile") {
        const regionsResponse = await fetchMockRegionsAndTitles();
        setRegions(regionsResponse);

        const jobTitlesResponse = await fetchMockRegionsAndTitles(true);
        setJobTitles(jobTitlesResponse);
      }
    })();
  }, [status]);

  return {
    regions,
    jobTitles,
  };
};

export default useLookupData;
