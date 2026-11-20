export interface LabVideo {
  category: 'Network' | 'Windows Server' | 'Linux';
  title: string;
  url: string;
}

// Paste as many YouTube videos as you like. Videos appear under their matching skill tab.
export const youtubeVideos: LabVideo[] = [
  // { category: 'Network', title: 'Cisco VLAN & Trunking Lab', url: 'https://www.youtube.com/watch?v=nMMN1L4nDmI', },
  // { category: 'Windows Server', title: 'Active Directory & GPO Setup', url: 'https://youtu.be/EXAMPLE2' },
  { category: 'Linux', title: 'Install Nginx | FTP & EC2 | Host Static Site & IP | Mult-Domain | Reverse Proxy | Microservice Route', url: 'https://www.youtube.com/watch?v=nSMzLwGPLAI' },
  { category: 'Linux', title: 'Step-by-step guide to installing NGINX with Docker on AWS', url: 'https://www.youtube.com/watch?v=PRq9_saXckQ' },
  { category: 'Linux', title: 'Explain group management in Linux', url: 'https://youtu.be/7N6jfV75UzY' },
  { category: 'Linux', title: 'How to manage user in Linux', url: 'https://www.youtube.com/watch?v=QQ3D3yFEd_E' },
  { category: 'Linux', title: 'How to Setup Webmail in Namecheap', url: 'https://youtu.be/FmdjjaoCJa0' },
];
