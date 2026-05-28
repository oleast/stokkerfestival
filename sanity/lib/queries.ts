import { groq } from 'next-sanity';

export const galleryImagesQuery = groq`
  *[_type == "galleryImage"] | order(order asc) {
    _id,
    image,
    alt,
    order
  }
`;

export const registrationsQuery = groq`
  *[_type == "registration"] | order(registeredAt desc) {
    _id,
    name,
    email,
    numberOfPeople,
    comment,
    showOnGuestList,
    registeredAt
  }
`;

export const registrationByEmailQuery = groq`
  *[_type == "registration" && email == $email][0] {
    _id,
    name,
    email,
    numberOfPeople
  }
`;

export const guestListQuery = groq`
  *[_type == "registration" && showOnGuestList == true] | order(registeredAt asc) {
    _id,
    name,
    numberOfPeople
  }
`;
