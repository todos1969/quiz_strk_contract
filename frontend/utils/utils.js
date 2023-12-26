export function truncateEthAddress(address) {
  if (!address || typeof address !== "string") {
    return "";
  }
  const prefix = address.slice(0, 4);
  const suffix = address.slice(-4);
  return `${prefix}...${suffix}`;
}
