import {defineQuery} from 'next-sanity'

export const SITE_PAGE_QUERY = defineQuery(`*[_type == "sitePage"][0]{
  _id,
  internalTitle,
  hero{eyebrow,titleLine1,titleLine2,text,image{alt,asset->{url}}},
  introduction{label,title,emphasis,text,noteTitle,noteText},
  workshop{label,title,text,services[]{_key,title,description,pricePrefix,price}},
  ride{label,title,text,date,distance,elevation},
  booking{label,title,text},
  contact{address,openingHours,email,phone}
}`)
