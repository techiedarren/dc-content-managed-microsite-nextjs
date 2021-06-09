import { CmsContent } from "./CmsContent";
import { CmsContext } from "./CmsContext";
import filterContent, { FilterContentResponse } from "./filterContent";

export type NavigationNode = {
    content: CmsContent;
    children: NavigationNode[];
}

function getNodeId(node) {
    return node?._meta?.deliveryId;
}

function getNodeParentId(node) {
    return node?._meta?.hierarchy?.parentId;
}

export async function fetchNavigation(context?: CmsContext): Promise<NavigationNode[]> {
    let nodes: CmsContent = [];
    let page: FilterContentResponse;

    const filters = {
        filterBy: [
            { path: '/_meta/schema', value: 'https://anyafinn.dev/navigation-item.json' }
        ]
    };

    // Load the nodes one page at a time
    do {
        page = await filterContent({
            ...filters,
            page: {
                size: 12,
                cursor: page ? page.page.nextCursor : undefined
            },
            parameters: {
                format: 'inlined',
                depth: 'all'
            }
        }, context);

        nodes = [...nodes, ...page.responses.map(x => x.content)];
    } while (page.page.nextCursor);

    // Reassemble into a tree
    const roots = nodes.filter(node => {
        const parentId = getNodeParentId(node);
        return !parentId || !nodes.find(x => getNodeId(x) === parentId)
    });

    const buildTreeNode = (node) => {
        const nodeId = getNodeId(node);
        return {
            content: node,
            children: nodes.filter(x => getNodeParentId(x) === nodeId).map(buildTreeNode)
        }
    };

    return roots.map(buildTreeNode);
}