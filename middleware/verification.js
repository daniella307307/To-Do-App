const verifyToken= (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
        return res.status(401).json({ message: "Access denied" });
    }
    try {
        const verified= jwt.verify(token.split(' ')[1], SECRET_KEY);
        req.user=verified;
        next();
    } catch (error) {
        return res.status(400).json({ message: "Invalid or expired token" });
        
    }
}

module.exports={verifyToken}