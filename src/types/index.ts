export type Page = 'create' | 'landing' | 'profile';

export type ProfileTab = 'collection' | 'projects' | 'billing';

export interface ArtifactState {
    file: File;
    name: string;
    preview: string;
}

export type License = 'MIT' | 'Creative Commons' | 'Unlicensed' | 'None Specified';
export type AITraining = 'Allowed' | 'Not Allowed';
export type Visibility = 'Public' | 'Private';
