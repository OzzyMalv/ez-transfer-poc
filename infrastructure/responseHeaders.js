//ONLY to be used to remove headers that can't be removed via middleware.
//This is NOT part of the build and is used in Cloudfront

function handler(event) {
  var response = event.response;
  var headers = response.headers;

  // Check if the header exists
  if (headers["x-opennext"]) {
    // Remove the header
    delete headers["x-opennext"];
  }

  // Check if the header exists
  if (headers["x-middleware-next"]) {
    // Remove the header
    delete headers["x-middleware-next"];
  }

  // Return the modified response
  return response;
}
