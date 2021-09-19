// eslint-disable-next-line @typescript-eslint/no-var-requires
const withGraphql = require('next-plugin-graphql');

const nextConfig = {
  reactStrictMode: true,
  eslint: {
    dir: ['src'],
  },
};

module.exports = withGraphql(nextConfig);
