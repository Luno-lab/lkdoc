# Runtime Errors FAQ

Common runtime errors when using LunoKit and their solutions.

## React Hooks Related Errors

### Error Description

```TypeError: Cannot read properties of null (reading 'useState')```

### Reason
**Duplicate React Instances**: Multiple React versions exist in the project

### Solution
Add peerDependencies in `package.json`:
```json
{
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0"
  }
}
```

## CSS Related Errors

### Error Description
```
`@layer base` is used but no matching `@tailwind base` directive is present.
```

### Reason
**Tailwind CSS Version Incompatibility**: In `@luno-kit/ui`, we use Tailwind CSS v4. Your project may be using Tailwind CSS v3, which is not compatible with v4. The `@layer` directive syntax and configuration have changed significantly between versions, requiring an upgrade to v4.

### Solution
You need to upgrade your project's Tailwind CSS to v4. 

For step-by-step upgrade instructions, refer to the [Tailwind CSS v4 Upgrade Guide](https://tailwindcss.com/docs/upgrade-guide).

