const handlerErrors = (err, req, res, next) => {
    if(err) {
        res.render("error", {err})
    }
}
module.exports = handlerErrors


