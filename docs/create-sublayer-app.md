# create-sublayer-app

```bash
npx create-sublayer-app custom-app
```

Will scaffold the following application structure:

```
github/
  workflows/
    build-custom-app-api.yaml
    build-custom-app-cilent.yaml
    release.yaml
k8-manifests/
  custom-app-api.yaml
  custom-app-client.yaml
environment/
  custom-app-api.development.env
  custom-app-api.production.env
  custom-app-client.development.env
  custom-app-client.production.env
services/
  custom-app-api/
  custom-app-client/
.gitignore
docker-compose.yaml
```

## CI / CD

### GitHub Actions

1. With every push to `master` tag the repository with a new release tag based on the commits that have been done.
2. With every new release tag:
   1. Build the Docker image for the application
   2. Push the Docker image to a registry
   3. Update Kubernetes Deployment with the latest image
   4. Apply the updated Kubernetes Deployment to the cluster.

### Versioning info

1. Output versioning info to a file
