import Head from "next/head";

export interface IMetaData {
  title: string;
  description: string;
  ogUrl: string;
  robotsIndex: string;
}

interface IMetaHead {
  metaData: Partial<IMetaData>;
}

const MetaHead = ({ metaData }: IMetaHead) => {
  return (
    <Head>
      <meta charSet="UTF-8" key="charset" />
      <title key="title">{metaData.title || ""}</title>
      <meta
        name="description"
        content={metaData.description || ""}
        key="description"
      />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
        key="viewport"
      />
      <meta name="robots" content={metaData.robotsIndex}></meta>
      <meta property="og:title" content={metaData.title || ""} />
      <meta property="og:type" content="website" />
      <meta property="og:description" content={metaData.description || ""} />
      <meta property="og:url" content={metaData.ogUrl || ""} />
      <meta property="og:site_name" content="Peach Go" />
    </Head>
  );
};

export default MetaHead;
