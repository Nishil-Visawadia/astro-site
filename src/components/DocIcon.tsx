import type { LucideIcon } from 'lucide-react';
import { getDocIcon } from '../lib/doc-icons';

interface Props {
    name?: string;
    className?: string;
}

export default function DocIcon({ name, className }: Props) {
    const Icon: LucideIcon = getDocIcon(name);

    return <Icon className={className} aria-hidden="true" />;
}