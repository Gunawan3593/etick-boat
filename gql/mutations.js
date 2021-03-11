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

export const CREATE_NEW_ROUTE = gql`
  mutation CREATE_NEW_ROUTE(
    $name: String!
    $descriptions: String!
    $active: Boolean
  ) {
    createNewRoute(
      newRoute: { 
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
  }
`;

export const EDIT_ROUTE_BY_ID = gql`
  mutation EDIT_ROUTE_BY_ID($id: ID!, $name:String!, $descriptions:String!, $active:Boolean) {
    editRouteByID(updatedRoute: {
      name : $name,
      descriptions : $descriptions,
      active : $active
    }, id: $id) {
      id
      name
      descriptions
      active
    }
  }
`;

export const DELETE_ROUTE_BY_ID = gql`
  mutation DELETE_ROUTE_BY_ID($id: ID!){
    deleteRouteById(id:$id){
      id
      message
      success
    }
  }
`;

export const CREATE_NEW_BANK = gql`
  mutation CREATE_NEW_BANK(
    $name: String! 
    $itno: String! 
    $account: String! 
    $active: Boolean 
    $notes: String
  ){
    createNewBank(
      newBank : {
        name: $name,
        itno: $itno,
        account: $account,
        active: $active,
        notes: $notes
      }
    ){
      id
      name
      itno
      account
      active
      notes
    }
  }
`;

export const EDIT_BANK_BY_ID = gql`
  mutation EDIT_BANK_BY_ID($id: ID!, $name:String!, $itno:String!, $account:String!, $active:Boolean, $notes:String) {
    editBankByID(updatedBank: {
      name : $name,
      itno : $itno,
      account : $account
      notes: $notes
      active : $active
    }, id: $id) {
      id
      name
      itno
      account
      active
      notes
    }
  }
`;

export const DELETE_BANK_BY_ID = gql`
  mutation DELETE_BANK_BY_ID($id: ID!){
    deleteBankById(id:$id){
      id
      message
      success
    }
  }
`;

export const CREATE_NEW_PRICE = gql`
  mutation CREATE_NEW_PRICE(
    $name: String!
    $descriptions: String!
    $price: Int
    $unit: String!
    $vendor: String!
    $routeTo: String!
    $routeFrom: String!
    $active: Boolean,
    $imagePath: String
  ) {
    createNewPrice(
      newPrice: { 
          name: $name, 
          descriptions: $descriptions
          price: $price
          unit: $unit
          active: $active
          vendor: $vendor
          routeFrom: $routeFrom
          routeTo: $routeTo
          imagePath: $imagePath
      }
    ) {
      id
      name
      descriptions
      price
      unit
      vendor {
        name
      }
      routeFrom {
        name
      }
      routeTo {
        name
      }
      active
    }
  }
`;

export const EDIT_PRICE_BY_ID = gql`
  mutation EDIT_PRICE_BY_ID(
      $id: ID!,
      $name: String!
      $descriptions: String!
      $price: Int
      $unit: String!
      $vendor: String!
      $routeTo: String!
      $routeFrom: String!
      $active: Boolean,
      $imagePath: String
    ) {
    editPriceByID(updatedPrice: {
      name: $name, 
      descriptions: $descriptions
      price: $price
      unit: $unit
      active: $active
      vendor: $vendor
      routeFrom: $routeFrom
      routeTo: $routeTo
      imagePath: $imagePath
    }, id: $id) {
      id
      name
      descriptions
      price
      unit
      vendor {
        id
        name
      }
      routeFrom {
        id
        name
      }
      routeTo {
        id
        name
      }
      active
    }
  }
`;

export const DELETE_PRICE_BY_ID = gql`
  mutation DELETE_PRICE_BY_ID($id: ID!){
    deletePriceById(id:$id){
      id
      message
      success
    }
  }
`;

export const UPLOAD_FILE = gql`
  mutation UPLOAD_FILE($file: Upload!) {
    imageUploader(file: $file)
  }
`;

