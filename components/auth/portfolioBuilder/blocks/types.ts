interface IPortfolioBlockContentMap {
  bio: {
    text: string;
  };
  projects: {
    items: {
      title: string;
      description?: string;
      repoUrl?: string;
      previewUrl?: string;
      tags?: string[];
    }[];
  };
  stack: {
    technologies: string[];
  };
  customText: {
    title: string;
    text: string;
  };
}

type TPortfolioBlockType = keyof IPortfolioBlockContentMap;

export type TPortfolioBlock = {
  [K in TPortfolioBlockType]: {
    id: string;
    type: K;
    name: string;
    content: IPortfolioBlockContentMap[K];
  };
}[TPortfolioBlockType];
