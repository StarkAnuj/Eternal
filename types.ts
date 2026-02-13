
export enum AppStep {
  LANDING = 'LANDING',
  STORY = 'STORY',
  PROPOSAL = 'PROPOSAL',
  GALLERY = 'GALLERY',
  INEVITABLE = 'INEVITABLE'
}

export interface MessageCard {
  id: number;
  text: string;
}

export interface GalleryImage {
  url: string;
  caption: string;
}
