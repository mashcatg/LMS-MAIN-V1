/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  webpack: (config, { isServer }) => {
    // CKEditor fix
    config.resolve.alias = {
      ...config.resolve.alias,
      '@ckeditor/ckeditor5-build-classic': '@ckeditor/ckeditor5-build-classic/build/ckeditor',
    };
    config.module.rules.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    });
    return config;
  },
  // Add this to handle the createElement error
  reactStrictMode: true,
};

module.exports = nextConfig;
