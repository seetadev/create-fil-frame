# create-filecoin-app

A command-line interface (CLI) for creating Filecoin applications with zero configuration. Based on [fil-frame](https://github.com/FIL-Builders/fil-frame), a ready-to-use template for building Filecoin applications.

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

The CLI offers two modes: interactive mode and flag mode.

### Interactive Mode

To use the interactive mode, simply run:

```bash
npx create-filecoin-app
```

You will be prompted to answer a series of questions to configure your new project. This includes your project name, selecting your preferred storage onramp option (Lighthouse, or Storacha), and even selecting your preferred package manager (Yarn, or NPM).

### Flag Mode

If you prefer to skip the prompts, you can use the flag mode to specify your options directly. For example, to initialise a project named `my-app`, with lighthouse as the storage onramp:

```bash
npx create-filecoin-app my-app --lighthouse
```

This command initializes a new repository named `my-app` with Lighthouse as the storage onramp.

#### Using with Storacha NFTs

To initialize a project with Storacha NFT integration, we make use of the `--storacha` flag:

```bash
npx create-filecoin-app my-app --storacha
```

#### Using with Lighthouse NFTs

To initialize a project with Lighthouse NFT integration, we make use of the `--lighthouse` flag:

```bash
npx create-filecoin-app my-app --lighthouse
```

## Options

| Option | Description | Default |
|--------|-------------|---------|
| `--storacha` | Initialize with Storacha NFT integration | `false` |
| `--lighthouse` | Initialize with Lighthouse NFT integration | `false` |

Integrations with Axelar is currently being worked on, and would be added to the CLI soon.
This would then extend the Options to include `--axelar`.

After running the CLI, your new project will be set up and ready for development with your chosen storage onramp.

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
