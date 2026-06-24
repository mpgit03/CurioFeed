export const requireAuth = (req, res, next) => {
  console.log("AUTH HEADER:");
  console.log(req.headers.authorization);

  const auth = req.auth();


  if (!auth.userId) {
    console.log("FAILED IN MIDDLEWARE");

    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  req.userId = auth.userId;


  next();
};