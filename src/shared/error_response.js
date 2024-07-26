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
        message: "Invalid credentail",
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
    CLIENT_LOG: {
      NotFound: {
        code: "040601",
        message: "Client log not found",
      },
    },
    APP_FUNCTION: {
      NotFound: {
        code: "040701",
        message: "App function not found",
      },
    },
    APP_FUNCTION_STATUS: {
      NotFound: {
        code: "040701",
        message: "App function status not found",
      },
    },
  };
  
  module.exports = { ErrorResponse };
  