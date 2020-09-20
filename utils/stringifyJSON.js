module.exports = (a, b, c) => {
    try {
        return JSON.stringify(a, b, c)
    } catch (e) {
        return null
    }
}