import gql from 'graphql-tag';

export const REGISTER_USER = gql`
  mutation REGISTER_NEW_USER(
    $email: String!
    $lastName: String!
    $username: String!
    $password: String!
    $firstName: String!
    $avatarImage: String
    $address: String!
    $birthDate: Date!
    $city: String
    $province: String
    $gender: Int!
    $postCode: String
    $phone: String
    $active: Boolean
    $role: Int
    $state: String
  ) {
  registerUser(
    newUser: {
      email: $email
      username: $username
      lastName: $lastName
      password: $password
      firstName: $firstName 
      avatarImage: $avatarImage
      address: $address
      city: $city
      province: $province
      state: $state
      gender: $gender
      postCode: $postCode
      phone: $phone
      active: $active
      role: $role
      birthDate: $birthDate
    }
  ) {
    token
    user {
        id
        email
        lastName
        username
        firstName
        avatarImage
      }
    }
  }
`