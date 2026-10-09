const getCountryFromIp = async (ip) => {
  if (!ip || ip === "::1" || ip === "127.0.0.1") return null;
  const token = process.env.PINFO_TOKEN;
  if (!token) throw new Error("IPINFO_TOKEN is missing");
  const url =
    `https://api.ipinfo.io/lite/${encodeURIComponent(ip)}` +
    `?token=${encodeURIComponent(token)}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to retrieve IP location");
  const data = await response.json();
  return data.country_code || null;
};

module.exports = { getCountryFromIp };
