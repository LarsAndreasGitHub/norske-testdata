module.exports = {
    exportPathMap: async function (defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
        return {
            '/': { page: '/' },
            '/orgnr/index': { page: '/orgnr' },
            '/fnr/index': { page: '/fnr' },
            '/kontonr/index': { page: '/kontonr' },
            '/cookies/index': { page: '/cookies' },
        };
    },
};
