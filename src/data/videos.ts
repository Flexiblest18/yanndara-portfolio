export interface LabVideo {
  category: 'Network' | 'Windows Server' | 'Linux';
  title: string;
  url: string;
}

// Paste as many YouTube videos as you like. Videos appear under their matching skill tab.
export const youtubeVideos: LabVideo[] = [
  { category: 'Network', title: 'Cisco VLAN & Trunking Lab', url: 'https://www.youtube.com/watch?v=nMMN1L4nDmI', },
  { category: 'Windows Server', title: 'Active Directory & GPO Setup', url: 'https://youtu.be/EXAMPLE2' },
  { category: 'Linux', title: 'Nginx Reverse Proxy & Docker', url: 'https://www.youtube.com/watch?v=EXAMPLE3' }
];
