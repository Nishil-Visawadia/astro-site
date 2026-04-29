import {
    ArrowRight,
    BookOpen,
    CloudUpload,
    Download,
    FileText,
    LifeBuoy,
    Menu,
    Palette,
    PenTool,
    Rocket,
    Search,
    Settings2,
    ShieldCheck,
    Sparkles,
    ShieldUser,
    type LucideIcon,
} from 'lucide-react';

export const docIconMap: Record<string, LucideIcon> = {
    book: BookOpen,
    'book-open': BookOpen,
    file: FileText,
    'file-text': FileText,
    download: Download,
    installation: Download,
    'getting-started': Rocket,
    rocket: Rocket,
    sparkles: Sparkles,
    advanced: Sparkles,
    customization: Palette,
    palette: Palette,
    settings: Settings2,
    'settings-2': Settings2,
    deployment: CloudUpload,
    'cloud-upload': CloudUpload,
    security: ShieldCheck,
    'shield-check': ShieldCheck,
    troubleshooting: LifeBuoy,
    'life-buoy': LifeBuoy,
    create: PenTool,
    'pen-tool': PenTool,
    next: ArrowRight,
    search: Search,
    menu: Menu,
    shielduser: ShieldUser,
};

export function getDocIcon(iconName?: string): LucideIcon {
    const normalizedName = iconName?.trim().toLowerCase();

    if (normalizedName && normalizedName in docIconMap) {
        return docIconMap[normalizedName];
    }

    return docIconMap.book;
}