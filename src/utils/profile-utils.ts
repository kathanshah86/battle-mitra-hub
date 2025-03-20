
// Helper function to get initials from profile data
export const getInitials = (profile: any) => {
  if (!profile) return "U";
  return (profile.username || profile.id?.substring(0, 2) || "U").substring(0, 2).toUpperCase();
};
