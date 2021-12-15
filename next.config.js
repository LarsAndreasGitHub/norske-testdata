module.exports = {
    exportPathMap: async function (defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
        return {
            '/': { page: '/' },
            '/orgnr/index.html': { page: '/orgnr' },
            '/fnr/index.html': { page: '/fnr' },
            '/cookies/index.html': { page: '/cookies' },
        };
    },
};
