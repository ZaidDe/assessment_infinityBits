module.exports = {
    apps: [{
        name: "demo",
        script: "./bin/www",
        env: {
            NODE_ENV: "development",
        },
        env_production: {
            PORT: 5000,
            NODE_ENV: "production",
        }
    }]
}