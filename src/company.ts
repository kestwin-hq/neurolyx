// Every fact on the site lives here, so it can be checked against the company's records in one place.
// Leave a value empty ('') to hide that line instead of showing a guess.
export const COMPANY = {
  legalName: 'Neurolyx Technologies Private Limited',
  shortName: 'Neurolyx Technologies',
  cin: '', // Corporate Identification Number from the incorporation certificate
  address: ['Plot No. 4, SBR Meadows, Indresham', 'Patancheru, Medak District', 'Telangana 502319, India'],
  phone: '+91 90302 02683',
  email: 'neurolyxtechnologies@gmail.com',
  website: 'neurolyxtechnologies.com',
}

export const PEOPLE = [{ name: 'Swetha Dondeti', role: 'Director', initials: 'SD' }]

export const telHref = (p: string) => `tel:${p.replace(/\s/g, '')}`
export const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  'SBR Meadows, Indresham, Patancheru, Telangana 502319',
)}`
