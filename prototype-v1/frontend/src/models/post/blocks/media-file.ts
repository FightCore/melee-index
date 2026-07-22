export interface MediaFile {
    alternativeText: string | null;
    url: string;
    mime: string;
    size: number;
    width: number | null;
    height: number | null;
}