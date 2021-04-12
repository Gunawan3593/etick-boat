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
        role
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
        role
      }
      token
    }
}`;

export const GET_ALL_VENDORS = gql`
query GET_ALL_VENDORS($status : Boolean) {
  getAllVendors (status : $status) {
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
  query GET_ALL_ROUTES ($status : Boolean) {
    getAllRoutes (status : $status) {
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

export const GET_ALL_BANKS = gql`
  query GET_ALL_BANKS($status: Boolean) {
    getAllBanks(status : $status) {
      id
      name
      itno
      account
      active
      notes
    }
  }
`;

export const BANK_BY_ID = gql`
  query BANK_BY_ID($id: ID!) {
    getBankById(id:$id) {
      id
      name
      itno
      account
      active
      notes
    }
  }
`;

export const BANK_BY_LIMIT_PAGE = gql`
  query BANK_BY_LIMIT_PAGE($page: Int!, $limit: Int!, $search: String) {
    getBanksByLimitAndPage(
      page: $page,
      limit: $limit,
      search: $search
    ){
      banks{
        id
        name
        itno
        account
        active
        notes
      }
      paginator{
        currentPage,
        pageCount,
        prev,
        next,
        hasPrevPage
        hasNextPage
        perPage
        bankCount
      }
    }
  }
`;

export const GET_ALL_PRICES = gql`
  query GET_ALL_PRICES($status: Boolean) {
    getAllPrices(
      status : $status
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
      imagePath
    }
  }
`;

export const PRICE_BY_ID = gql`
  query PRICE_BY_ID($id: ID!) {
    getPriceById(id:$id) {
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
      imagePath
    }
  }
`;

export const PRICE_BY_LIMIT_PAGE = gql`
  query PRICE_BY_LIMIT_PAGE($page: Int!, $limit: Int!, $search: String) {
    getPricesByLimitAndPage(
      page: $page,
      limit: $limit,
      search: $search
    ){
      prices{
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
      paginator{
        currentPage,
        pageCount,
        prev,
        next,
        hasPrevPage
        hasNextPage
        perPage
        priceCount
      }
    }
  }
`;

export const GET_ALL_CART = gql`
  query GET_ALL_CART{
    getAllCarts{
      id
      vendor{
        id
        name
      }
      routeFrom{
        id
        name
      }
      routeTo{
        id
        name
      }
      pricing {
        id
        price
        unit
      }
      qtyAdult
      qtyChild
      total
    }
  }
`;

export const CART_BY_PRICE_ID = gql`
  query CART_BY_PRICE_ID(
    $pricing : String!
  ){
    getCartByPriceId(pricing : $pricing){
      success
      id
      message
    }
  }
`;

export const GET_BOOKING_NO = gql`
  query GET_BOOKING_NO {
    getBookingNo{
      transNo
    }
  }
`;

export const BOOKING_BY_ID = gql`
  query BOOKING_BY_ID($id: ID!) {
    getBookingById(id:$id) {
      id
      transNo
      date
      dueDate
      roundTrip
      leaveSchedule
      gobackSchedule
      subtotal
      paidAmount
      status
    }
  }
`;

export const AUTHENTICATED_BOOKING_BY_LIMIT_PAGE = gql`
  query AUTHENTICATED_BOOKING_BY_LIMIT_PAGE($page: Int!, $limit: Int!, $search: String) {
    getAuthenticatedBookingsByLimitAndPage(
      page: $page,
      limit: $limit,
      search: $search
    ){
      bookings{
          id
          transNo
          date
          dueDate
          roundTrip
          leaveSchedule
          gobackSchedule
          subtotal
          paidAmount
          status
      }
      paginator{
        currentPage,
        pageCount,
        prev,
        next,
        hasPrevPage
        hasNextPage
        perPage
        bookingCount
      }
    }
  }
`;

export const BOOKING_BY_LIMIT_PAGE = gql`
  query BOOKING_BY_LIMIT_PAGE($page: Int!, $limit: Int!, $search: String) {
    getBookingsByLimitAndPage(
      page: $page,
      limit: $limit,
      search: $search
    ){
      bookings{
        id
        transNo
        date
        dueDate
        roundTrip
        leaveSchedule
        gobackSchedule
        subtotal
        paidAmount
        status
      }
      paginator{
        currentPage,
        pageCount,
        prev,
        next,
        hasPrevPage
        hasNextPage
        perPage
        bookingCount
      }
    }
  }
`;

export const PAYMENT_BY_LIMIT_PAGE = gql`
  query PAYMENT_BY_LIMIT_PAGE($page: Int!, $limit: Int!, $search: String) {
    getPaymentsByLimitAndPage(
      page: $page,
      limit: $limit,
      search: $search
    ){
      payments{
        id
        booking{
          id
          transNo
          subtotal
        }
        bank{
          name
        }
        fundSender
        transferBy
        transferDate
        amount
        status
      }
      paginator{
        currentPage,
        pageCount,
        prev,
        next,
        hasPrevPage
        hasNextPage
        perPage
        paymentCount
      }
    }
  }
`;

export const PAYMENT_BY_ID = gql`
  query PAYMENT_BY_ID($id: ID!) {
    getPaymentById(id:$id) {
      id
      booking{
        id
        transNo
        subtotal
      }
      bank{
        name
      }
      fundSender
      transferBy
      transferDate
      transferEvidence
      amount
      status
    }
  }
`;

export const PAYMENT_BY_BOOKING_ID = gql`
  query PAYMENT_BY_BOOKING_ID($id: ID!) {
    getPaymentByBookingId(id:$id) {
      id
      booking{
        id
        transNo
        subtotal
      }
      bank{
        name
      }
      fundSender
      transferBy
      transferDate
      transferEvidence
      amount
      status
    }
  }
`;

export const GET_ALL_BOOKING_ITEMS = gql`
  query GET_ALL_BOOKING_ITEMS($booking: String!){
    getAllBookingItems(
      booking: $booking
    ){
      id
      vendor{
        id
        name
      }
      routeFrom{
        id
        name
      }
      routeTo{
        id
        name
      }
      pricing {
        id
        price
        unit
      }
      qtyAdult
      qtyChild
      total
    }
  }
`;

export const COUNT_BOOKING_BY_DATE = gql`
  query COUNT_BOOKING_BY_DATE(
    $date: String!
    $status: Int!
  ){
    countBookingByDate(
      date: $date,
      status: $status
    ){
      total
    }
  }
`;

export const COUNT_PAYMENT_BY_DATE = gql`
  query COUNT_PAYMENT_BY_DATE(
    $date: String!
    $status: Int!
  ){
    countPaymentByDate(
      date: $date,
      status: $status
    ){
      total
    }
  }
`;

export const GET_TOTAL_BOOKING_BY_DATE = gql`
  query GET_TOTAL_BOOKING_BY_DATE(
    $date: String!
    $status: Int!
  ){
    getTotalBookingByDate(
      date: $date
      status: $status
    ){
      total
    }
  }
`;

export const TOP_BOOKING_BY_DATE = gql`
  query TOP_BOOKING_BY_DATE(
    $date: String!
    $status: Int!
  ){
    getTopBookingByDate(
      date: $date,
      status: $status
    ){
      name
      total
    }
  }
`;

export const GET_BOOKING_BY_TIME = gql`
  query GET_BOOKING_BY_TIME(
    $date: String!
    $status: Int!
  ){
    getBookingByTime(
      date: $date,
      status: $status
    ){
      hour
      total
    }
  }
`;

export const GET_BOOKING_WEEKLY = gql`
  query GET_BOOKING_WEEKLY(
    $monday: String!
    $sunday: String!
    $status: Int!
  ){
    getBookingWeekly(
      monday: $monday
      sunday: $sunday
      status: $status
    ){
      day
      total
    }
  }
`;

export const GET_BOOKING_MONTLY = gql`
  query GET_BOOKING_MONTLY(
    $date: String!
    $status: Int!
  ){
    getBookingMonthly(
      date: $date,
      status: $status
    ){
      month
      total
    }
  }
`;