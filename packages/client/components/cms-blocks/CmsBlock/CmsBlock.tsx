import React, { FC } from 'react'
import { CmsContent } from '../../../lib/CmsContent';
import EditorialBlock from '../EditorialBlock';
import GalleryBlock from '../GalleryBlock';
import HeroBannerBlock from '../HeroBannerBlock';

interface Props {
    content?: CmsContent;
}

const mapping: any = {
    'EditorialBlock': EditorialBlock,
    'GalleryBlock': GalleryBlock,
    'HeroBannerBlock': HeroBannerBlock
};

const CmsBlock: FC<Props> = ({content}) => {
    if (!content) {
        return;
    }
    
    const Component = mapping[content.component] || mapping[content._meta?.schema];
    if (!Component) {
        return;
    }

    return <Component {...content} />;
}

export default CmsBlock;