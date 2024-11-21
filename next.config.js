/** @type {import('next').NextConfig} */
const config = {
  webpack: (config, { isServer }) => {
    // CKEditor fix
    if (!isServer) {
      config.resolve = {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          '@ckeditor/ckeditor5-build-classic': '@ckeditor/ckeditor5-build-classic/build/ckeditor',
        },
        fallback: {
          ...config.resolve.fallback,
          fs: false,
          path: false,
        }
      };
    }
    return config;
  },
  // Disable static exports for dynamic pages
  output: 'standalone',
  // Disable React strict mode temporarily to fix createElement issue
  reactStrictMode: false
};

module.exports = config;
