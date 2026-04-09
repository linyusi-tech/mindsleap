# Self-Hosted Runner Setup

This repository now deploys `main` with a self-hosted GitHub Actions runner.

## Before you start

Use the same Linux user for all three things below:

- the GitHub Actions runner service
- the `/www/wwwroot/mindsleap` deployment directory
- the `pm2` process named `mindsleap`

If these are different users, deployment usually fails on permissions or starts a second PM2 process by accident.

## One-time setup on the ECS server

1. In GitHub, open this repo:
   `Settings -> Actions -> Runners -> New self-hosted runner`
2. Choose `Linux` and `x64`.
3. Add the custom label `mindsleap-cn`.
4. Run the generated install commands on the ECS server as your deployment user.

GitHub will show commands similar to:

```bash
mkdir actions-runner && cd actions-runner
curl -o actions-runner-linux-x64.tar.gz -L https://github.com/actions/runner/releases/download/<version>/actions-runner-linux-x64-<version>.tar.gz
tar xzf ./actions-runner-linux-x64.tar.gz
./config.sh --url https://github.com/linyusi-tech/mindsleap --token <token> --labels mindsleap-cn
./run.sh
```

To keep it running after reboot:

```bash
sudo ./svc.sh install
sudo ./svc.sh start
```

## Server requirements

Make sure these commands work on the server for the same user that runs the runner:

```bash
node -v
npm -v
pm2 -v
rsync --version
```

Make sure that user can write here:

```bash
mkdir -p /www/wwwroot/mindsleap
```

## GitHub secrets still used

The self-hosted workflow still needs these secrets:

- `CN_SITE_URL`
- `CN_CONTACT_PUBLIC_EMAIL`
- `CN_RESEND_API_KEY`
- `CN_CONTACT_EMAIL`
- `CN_CONTACT_FROM_EMAIL`

These old SSH secrets are no longer used by the workflow:

- `CN_SERVER_SSH_KEY`
- `CN_SERVER_HOST`
- `CN_SERVER_PORT`
- `CN_SERVER_USER`
