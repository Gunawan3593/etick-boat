import gql from 'graphql-tag';

export const AUTHENTICATED_USER = gql`
query AUTH_USER {
    authUserProfile{
        id
        username
        email
        firstName
        lastName
        avatarImage
    }
}`;

export const AUTHENTICATE_USER = gql`
query AUTHENTICATE_USER(
    $username: String!
    $password: String!
  ){
    authenticateUser(
      username: $username,
      password: $password
    ){
      user{
        id
        username
        email
        firstName
        lastName
        avatarImage
      }
      token
    }
}`;

export const GET_ALL_VENDORS = gql`
query GET_ALL_VENDORS {
  getAllVendors {
    id
    name
    descriptions
    active
  }
}`;

export const VENDOR_BY_ID = gql`
query VENDOR_BY_ID($id: ID!) {
  getVendorById(id:$id) {
    id
    name
    descriptions
    active
  }
}`;

export const VENDOR_BY_LIMIT_PAGE = gql`
query VENDOR_BY_LIMIT_PAGE($page: Int!, $limit: Int!, $search: String) {
  getVendorsByLimitAndPage(
    page: $page,
    limit: $limit,
    search: $search
  ){
    vendors{
      id,
      name,
      descriptions,
      active
    }
    paginator{
      currentPage,
      pageCount,
      prev,
      next,
      hasPrevPage
      hasNextPage
      perPage
      vendorCount
    }
  }
}`;

export const GET_ALL_ROUTES = gql`
  query GET_ALL_ROUTES {
    getAllRoutes {
      id
      name
      descriptions
      active
    }
  }
`;

export const ROUTE_BY_ID = gql`
  query ROUTE_BY_ID($id: ID!) {
    getRouteById(id:$id) {
      id
      name
      descriptions
      active
    }
  }
`;

export const ROUTE_BY_LIMIT_PAGE = gql`
  query ROUTE_BY_LIMIT_PAGE($page: Int!, $limit: Int!, $search: String) {
    getRoutesByLimitAndPage(
      page: $page,
      limit: $limit,
      search: $search
    ){
      routes{
        id,
        name,
        descriptions,
        active
      }
      paginator{
        currentPage,
        pageCount,
        prev,
        next,
        hasPrevPage
        hasNextPage
        perPage
        routeCount
      }
    }
  }
`;