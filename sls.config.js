// Set service/app name
const name = 'draft-tools-service'
// Set default S3 bucket name (for local dev deploys)
const defaultBucket = 'datatech-scoring-serverless-dev-artifacts'

const base = {
  name,
  bucket: process.env.APP_BUCKET || defaultBucket,
  webpack: {
    webpackConfig: './webpack.config.js',
    includeModules: true,
  }
}

module.exports = () => {
  // Set environment/stage specific params
  const local = { 
    param1: 'local-vpc',
    param2: 'local-subnet', 
  }

  const dev = { 
    param1: 'dev-vpc',
    param2: 'dev-subnet', 
  }

  const prod = { 
    param1: 'prod-vpc',
    param2: 'prod-subnet', 
  }

  let params = {}
  switch (process.env.STAGE) {
    case 'dev':
      params = dev;
      break;
    case 'prod':
      params = prod;
      break;
    default:
      params = local;
  }

  return { ...base, ...params }
};