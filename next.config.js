/** @type {import('next').NextConfig} */
const config = {
  webpack: (config, { isServer }) => {
    // CKEditor fix
    config.resolve.alias = {
      ...config.resolve.alias,
      '@ckeditor/ckeditor5-build-classic': '@ckeditor/ckeditor5-build-classic/build/ckeditor',
    };
    return config;
  },
  // Add this to handle the createElement error
  reactStrictMode: true,
};

module.exports = config;
