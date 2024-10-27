# create-filecoin-app

A command-line interface for creating Filecoin applications with zero configuration. Based on [fil-frame](https://github.com/FIL-Builders/fil-frame), a ready-to-use template for building Filecoin applications.

## Quick Start

```bash
npx create-filecoin-app my-app
cd my-app
yarn dev
```

## Features

- 🚀 Zero-config setup
- 📦 Pre-configured Filecoin development environment
- 🔄 Git repository initialization
- 💻 Automatic dependency installation
- 💾 Pre-configured integration with storage onramp provider of choice.
- 🎨 Ready-to-use template with best practices

## Usage

### Basic Usage

Create a new Filecoin app in a directory called `my-app`:

```bash
npx create-filecoin-app my-app
```

### Using with Storacha NFTs

To initialize a project with Storacha NFT integration:

```bash
npx create-filecoin-app my-app --storacha
```

## Options

| Option | Description | Default |
|--------|-------------|---------|
| `--storacha` | Initialize with Storacha NFT integration | `false` |

Integrations with Axelar, and Lighthouse are currently being worked on, and would be added to the CLI soon.
This woukd then extend the Options to include `--axelar`, and `--lighthouse`.

## Project Structure

After running the CLI, your project will have the following structure:

```
my-app/
├── packages/
│   ├── hardhat/
│   │   │── contracts
│   │   │── deploy
│   │   │── scripts
│   │   │── .env.example
│   │   │── README.md
│   │   │── package.json
│   │   └── ...
│   └── nextjs/
│       │── app
│       │── components
│       │── contracts
│       │── hooks/fil-frame
│       │── utils/fil-frame
│       │── .env.example
│       │── package.json
│       └── ...
│   
├── LICENSE
├── package.json
├── README.md
└── ...
```

## Requirements

- Node.js 18.17.0 or later
- Yarn package manager

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

<!-- ## License

MIT © -->
