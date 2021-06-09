import React from 'react';
import { NextPage } from 'next';
import { CmsContent } from '../lib/CmsContent';
import fetchContent from '../lib/fetchContent';
import { Layout } from '../components/ui';
import { CmsBlock } from '../components/cms-blocks';

interface Props {
    navigation: CmsContent,
    content: CmsContent
}

const defaultSlotContents = [
  {
      description: 'No Page Slot with content for delivery key "slots/homepage-hero"',
      component: 'EditorialBlock',
      title: 'Error loading content'
  }
];

const Visualization: NextPage<Props> = (props: Props) => {
  return (
    <CmsBlock content={props.content} />
  );
}

Visualization['Layout'] = Layout;

Visualization.getInitialProps = async (context) => {
  const [
    navigation,
    content
  ] = await fetchContent([
    { key: 'slots/navigation' },
    { id: context.query.id as string }
  ], {
      stagingApi: context.query.contentApi as string
  });

  return {
    navigation,
    content
  };
};

export default Visualization;