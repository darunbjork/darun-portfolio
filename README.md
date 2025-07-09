## Environments

| Environment | Branch | URL / Strategy |
|-------------|--------|----------------|
| Development | Local  | `localhost:4000` |
| Staging     | main   | GitHub Actions → Deploy |
| Production  | manual | TBD |

### Secrets (CI)

Secrets live in GitHub Settings → Secrets → Actions

- `PORT`
- `NODE_ENV`