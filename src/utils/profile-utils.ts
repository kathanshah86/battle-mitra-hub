
// Helper function to get initials from profile data
export const getInitials = (profile: any) => {
  if (!profile) return "U";
  return (profile.username || profile.id?.substring(0, 2) || "U").substring(0, 2).toUpperCase();
};

// Helper function to format social links
export const formatSocialLink = (url: string) => {
  if (!url) return '';
  
  // Remove http/https protocol for display
  let formattedUrl = url.replace(/^https?:\/\//i, '');
  
  // Remove trailing slash
  formattedUrl = formattedUrl.replace(/\/$/, '');
  
  // If it's a common social platform, extract the username
  if (formattedUrl.includes('twitter.com/') || formattedUrl.includes('x.com/')) {
    return '@' + formattedUrl.split('/').pop();
  } else if (formattedUrl.includes('instagram.com/')) {
    return '@' + formattedUrl.split('/').pop();
  } else if (formattedUrl.includes('github.com/')) {
    return '@' + formattedUrl.split('/').pop();
  } else if (formattedUrl.includes('youtube.com/')) {
    const channel = formattedUrl.split('/').pop();
    return channel || 'YouTube';
  }
  
  // For other websites, just return the domain
  const domain = formattedUrl.split('/')[0];
  return domain;
};

// Create dummy social links if none provided
export const generateDefaultSocialLinks = (username: string) => {
  if (!username) return [];
  
  return [
    { platform: 'Twitter', url: `https://twitter.com/${username}` },
    { platform: 'Instagram', url: `https://instagram.com/${username}` },
    { platform: 'Website', url: `https://example.com/${username}` },
  ];
};
