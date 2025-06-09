# Contributing to FMUS-Motion

Thank you for considering contributing to FMUS-Motion! This document outlines the process for contributing to the project.

## Code of Conduct

By participating in this project, you agree to maintain a respectful, inclusive, and welcoming environment for all contributors.

## How to Contribute

### Reporting Bugs

1. Check the [Issues](https://github.com/mexyusef/fmus-motion/issues) to see if the bug has already been reported.
2. If not, open a new issue, providing:
   - A clear title and description
   - Steps to reproduce the issue
   - Expected and actual behavior
   - Screenshots if applicable
   - Environment details (browser, OS, etc.)

### Suggesting Features

1. Check existing issues for similar feature requests.
2. Open a new issue, describing:
   - The problem your feature would solve
   - How your solution would work
   - Any alternatives you've considered
   - Example code or mockups if possible

### Pull Requests

1. Fork the repository
2. Create a new branch from `main`:
   ```
   git checkout -b feature/your-feature-name
   ```
3. Make your changes
4. Ensure your code meets the project's coding standards:
   ```
   npm run lint
   npm test
   ```
5. Commit your changes following [conventional commits](https://www.conventionalcommits.org/) format:
   ```
   feat: add new feature
   fix: resolve issue with x
   docs: update readme
   ```
6. Push to your branch:
   ```
   git push origin feature/your-feature-name
   ```
7. Open a pull request against the `main` branch

## Development Setup

1. Clone the repository:
   ```
   git clone https://github.com/mexyusef/fmus-motion.git
   cd fmus-motion
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start development:
   ```
   npm run dev
   ```

4. Run tests:
   ```
   npm test
   ```

## Project Structure

- `/src` - Source code
  - `/components` - React components
  - `/hooks` - React hooks
  - `/utils` - Utility functions
  - `/types` - TypeScript types
- `/example` - Example usage
- `/tests` - Test files

## Coding Standards

- Use TypeScript
- Follow the project's ESLint and Prettier configuration
- Write tests for all new features
- Maintain or improve test coverage
- Use descriptive variable names
- Add comments for complex logic

## License

By contributing to FMUS-Motion, you agree that your contributions will be licensed under the project's MIT license.
