export const adminMiddleware = (req, res, next) => {
    // authMiddleware must run before this
    if (!req.user) {
        return res.status(401).json({ error: 'Not authenticated' });
    }

    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Admin access only' });
    }

    next();
};
