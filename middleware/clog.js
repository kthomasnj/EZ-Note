const clog = (req, res, next) => {
    const fgCyan = '\x1b[36m';
    switch (req,method) {
        case 'GET': {
            console.info(` ${fgCyan}${req.method} request of ${req.path}`);
            break;
        }
        case 'POST': {
            console.info(` ${fgCyan}${req.method} request of ${req.path}`);
            break;
        }
        default: {
            console.info(` ${fgCyan}${req.method} request of ${req.path}`);
            break;
        }
    }
    next();
};