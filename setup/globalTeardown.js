module.exports = async () => {
    if (global.networkErrorDetected) {
        console.error("Network error detected during the tests.");
        process.exit(1);
    }
};
