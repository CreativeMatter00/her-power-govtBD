export function calculateAge(timestamp: any) {
  const givenDate = new Date(timestamp);
  const currentDate = new Date();

  const diffTime = currentDate.getTime() - givenDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffMonths =
    currentDate.getMonth() -
    givenDate.getMonth() +
    12 * (currentDate.getFullYear() - givenDate.getFullYear());
  const diffYears = currentDate.getFullYear() - givenDate.getFullYear();

  // If less than 1 month, return age in days
  if (diffMonths < 1 && diffYears === 0) {
    return `${diffDays} days`;
  }

  // If less than 1 year, return age in months
  if (diffYears === 0) {
    return `${diffMonths} months`;
  }

  // If more than or equal to 1 year, return age in years
  return `${diffYears} years`;
}
