import fetch from 'isomorphic-unfetch';
import { CmsContext } from './CmsContext';
import { CmsContent } from './CmsContent';

export type FilterContentRequest = {
    filterBy: { path: string, value: any }[];
    sortBy?: { key?: string, order: 'asc' | 'desc' },
    page?: { size?: number, cursor?: string },
    parameters?: { depth?: 'all' | 'root', format?: 'inlined' | 'linked' }
}

export type FilterContentResponse = {
    responses: { content: CmsContent }[];
    page: {
        responseCount: number,
        nextCursor?: string
    }
}

async function filterContent(request: FilterContentRequest, context?: CmsContext): Promise<FilterContentResponse> {
    const host = context?.stagingApi || process.env.contentApi;

    return fetch(
        `https://${host}/content/filter`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        }
    ).then(x => x.json());
}

export default filterContent;