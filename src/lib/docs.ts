import type { CollectionEntry } from 'astro:content';

export type DocEntry = CollectionEntry<'docs'>;

// Astro's glob loader uses the content file id, not the legacy slug field.
function normalizeDocId(id: string): string {
    return id.replace(/\\/g, '/').replace(/\.md$/i, '');
}

function resolveEntryIdentifier(entry: DocEntry): string {
    const customSlug = entry.data.slug?.trim();

    if (!customSlug) {
        return normalizeDocId(entry.id);
    }

    return customSlug.replace(/^\/+|\/+$/g, '').replace(/^docs\//, '');
}

export function getDocSegments(entry: DocEntry): string[] {
    const normalizedId = resolveEntryIdentifier(entry);

    return normalizedId.split('/').filter(Boolean);
}

export function getDocPath(entry: DocEntry): string {
    const segments = getDocSegments(entry);
    return segments.length === 0 ? '/docs' : `/docs/${segments.join('/')}`;
}

export function sortDocsByOrder(a: DocEntry, b: DocEntry): number {
    return a.data.order - b.data.order;
}
