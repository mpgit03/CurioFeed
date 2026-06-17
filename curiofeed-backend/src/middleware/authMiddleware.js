export const requireAuth = (req, res, next) => {
  console.log("AUTH HEADER:");
  console.log(req.headers.authorization);

  const auth = req.auth();

  console.log("AUTH:", auth);
  console.log("MIDDLEWARE ENTERED");


  console.log("AUTH:", auth);

  if (!auth.userId) {
    console.log("FAILED IN MIDDLEWARE");

    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  req.userId = auth.userId;

  console.log("MIDDLEWARE PASSED");

  next();
};