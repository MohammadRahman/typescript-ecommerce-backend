export default{
    branches: ['main'],
    repositoryUrl: 'https://github.com/MohammadRahman/typescript-ecommerce-backend',
    plugins: [
        '@semantic-release/commit-analyzer',
        '@semantic-release/release-notes-generator',
        '@semantic-release/npm',
        [
            '@semantic-release/github',
            {
                assets: [
                    { path: 'build.zip', label: 'Build' }
                    // add more path like test coverage
                   // { path: 'coverage.zip', label: 'Coverage' },
                ]
            }
        ]
    ]
};
