const ErrorResponse = {
    // code format => last_two_http_code + api_type_number + counter
  
    INTERNAL_ERROR: {
      code: "990001",
      message: "Internal server error",
    },
  
    CONSTRAIN_ERROR: {
      code: "090201",
      message: "Constrain error",
    },
  
    AUTHENTICATION: {
      InvalidCredentail: {
        code: "000301",
        message: "Ivalid credentail",
      },
      Unauthorization: {
        code: "010302",
        message: "Unauthorization",
      },
    },
  
    USER: {
      NotFound: {
        code: "040401",
        message: "User not found",
      },
    },
  
    ROLE: {
      NotFound: {
        code: "040501",
        message: "Role not found",
      },
    },
  
    PERMISSION: {
      NotFound: {
        code: "040401",
        message: "Permission not found",
      },
    },
  
    TOKEN: {
      Expired: {
        code: "010501",
        message: "Token expired",
      },
      SessionExpired: {
        code: "010502",
        message: "Session expired",
      },
      Invalid: {
        code: "010503",
        message: "Invalid token",
      },
    },
    CONVERSATION: {
      InvalidDest: {
        code: "000601",
        message: "Can no send to the same account",
      },
      NotFound: {
        code: "040602",
        message: "Conversation not found",
      },
    },
    ROOM: {
      NotFound: {
        code: "040701",
        message: "Room not found",
      },
    },
  };
  
  module.exports = { ErrorResponse };
  