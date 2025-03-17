export default {
    plugins: {
        autoprefixer: {
            overrideBrowserslist: ['> 1%', 'last 2 versions', 'not dead'],
        },
        cssnano: {
            preset: ['default', {
                discardComments: {
                    removeAll: true,
                },
                normalizeWhitespace: true,
                minifyFontValues: true,
                colormin: true,
                reduceIdents: false, // Отключаем, чтобы избежать проблем с анимациями
            }]
        }
    },
};