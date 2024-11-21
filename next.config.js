/** @type {import('next').NextConfig} */
const config = {
  webpack: (config, { isServer }) => {
    // CKEditor fix
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@ckeditor/ckeditor5-build-classic': '@ckeditor/ckeditor5-build-classic/build/ckeditor',
      };
    }
    return config;
  },
  // Add this to handle the createElement error
  reactStrictMode: true,
  // Disable static exports for dynamic pages
  output: 'standalone'
};

module.exports = config;
