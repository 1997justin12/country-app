import { gql } from '@apollo/client';

export const GET_COUNTRIES = gql`
  query getCountries($filter: CountryFilterInput) {
    countries(filter: $filter) {
      code
      name
      native
      phone
      capital
      currency
      emoji
      emojiU
      continent {
        code
        name
        countries {
          code
          name
          native
          emoji
        }
      }
    }
  }
`;
