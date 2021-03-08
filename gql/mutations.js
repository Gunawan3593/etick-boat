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
    $cPassword: String
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
      cPassword: $cPassword
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
export const CREATE_NEW_VENDOR = gql`
mutation CREATE_NEW_VENDOR(
  $name: String!
  $descriptions: String!
  $active: Boolean
) {
  createNewVendor(
    newVendor: { 
        name: $name, 
        descriptions: $descriptions
        active: $active
    }
  ) {
    id
    name
    descriptions
    active
  }
}`;

export const EDIT_VENDOR_BY_ID = gql`
mutation EDIT_VENDOR_BY_ID($id: ID!, $name:String!, $descriptions:String!, $active:Boolean) {
  editVendorByID(updatedVendor: {
    name : $name,
    descriptions : $descriptions,
    active : $active
  }, id: $id) {
    id
    name
    descriptions
    active
  }
}`;

export const DELETE_VENDOR_BY_ID = gql`
mutation DELETE_VENDOR_BY_ID($id: ID!){
  deleteVendorById(id:$id){
    id
    message
    success
  }
}`;