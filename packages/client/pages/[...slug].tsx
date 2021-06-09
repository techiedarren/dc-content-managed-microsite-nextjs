import React from 'react';
import { NextPage } from 'next';
import fetchContent from '../lib/fetchContent';
import { Layout } from '../components/ui';
import { CmsContent } from '../lib/CmsContent';
import { CmsBlock } from '../components/cms-blocks';
import { fetchNavigation } from '../lib/fetchNavigation';

interface Props {
    page: CmsContent;
}

const Index: NextPage<Props> = (props: Props) => {
    return <>
        {
            props.page.blocks.map(content => <CmsBlock content={content} />)
        }
    </>
}

Index['Layout'] = Layout;

Index.getInitialProps = async (context) => {
    const url = (context.query.slug as string[]).join('/');

    const [
        link
    ] = await fetchContent([
        { key: url }
    ]);

    if (link.content?.redirect?.url) {
        const res = context.res;
        if (res) {
            res.writeHead(302, {
                Location: link.content.redirect?.url
            });
            res.end();
        }
    }

    // Load navigation & page content in parallel
    const [
        navigation,
        [
            page
        ]
    ] = await Promise.all([
        fetchNavigation(),
        fetchContent([
            { id: link.content.page.id }
        ])
    ]);

    return {
        navigation,
        link,
        page
    };
};

export default Index;