export type Page = 'create' | 'landing' | 'profile' | 'artifact' | 'project';

export type ProfileTab = 'collection' | 'projects' | 'upgrade' | 'devices';
export type ProjectTab = 'collection' | 'members' | 'settings';

export interface ArtifactState {
    file: File;
    name: string;
    preview: string;
}

export type License = 'MIT' | 'Creative Commons' | 'Unlicensed' | 'None Specified';
export type AITraining = 'Allowed' | 'Not Allowed';
export type Visibility = 'Public' | 'Private';
