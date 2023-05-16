/** @type {import('next').NextConfig} */

const moduleExports = {
  reactStrictMode: true,
  distDir: 'build',
  eslint: {
    dirs: ['pages', 'components', 'containers', 'redux', 'services', 'integrations', 'utils'],
    ignoreDuringBuilds: true,
  },
};

module.exports = moduleExports;
