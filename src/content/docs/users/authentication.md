---
title: Authentication
description: Configure sign-in methods including password, magic link, OAuth, and SAML SSO.
sidebar:
  order: 0
---

Drizby supports 9 authentication methods, all configured from **Settings > Authentication** in the admin UI.

| Method | Type | Description |
|---|---|---|
| Password | Credentials | Email + password registration and login |
| Magic Link | Credentials | Passwordless sign-in via emailed link |
| Google | OAuth 2.0 | Sign in with Google account |
| GitHub | OAuth 2.0 | Sign in with GitHub account |
| GitLab | OAuth 2.0 | Sign in with GitLab account |
| Microsoft | OAuth 2.0 | Sign in with Microsoft / Entra ID account |
| Slack | OAuth 2.0 | Sign in with Slack account |
| SAML 2.0 | Enterprise SSO | Single sign-on via Okta, Azure AD, OneLogin, etc. |
| SCIM 2.0 | Provisioning | Automatic user/group sync from your IdP |

:::tip
All authentication settings are configured through the admin UI — no code changes or restarts needed.
:::

## First-Time Setup

On first launch, Drizby prompts you to create an admin account with email and password. After that, configure additional auth methods from Settings.

## Password

Password authentication is enabled by default. Users register with an email and password (minimum 8 characters) and are placed in a pending state until an admin approves them, unless their email domain is in the auto-accept list.

To disable password auth, toggle it off in **Settings > Authentication > Password**. This is useful when you want to enforce OAuth-only or SSO-only sign-in.

:::caution
Password and magic link are mutually exclusive — enabling one disables the other.
:::

## Magic Link

Magic link provides passwordless authentication. Instead of a password, users enter their email and receive a one-time sign-in link.

**Prerequisites:** Email delivery must be configured (`RESEND_API_KEY` environment variable).

To enable, toggle on **Settings > Authentication > Magic Link**. This automatically disables password auth.

## OAuth Providers

OAuth providers allow users to sign in with existing accounts from Google, GitHub, GitLab, Microsoft, or Slack. Each provider requires creating an application in the provider's developer console.

### General Setup Pattern

For each OAuth provider:

1. Create an app/client in the provider's developer console
2. Set the **redirect URI** to the value shown in Drizby's settings (format: `https://your-drizby.example.com/api/auth/{provider}/callback`)
3. Copy the **Client ID** and **Client Secret** into Drizby
4. Enable the provider and click **Save**

### Google

1. Go to [Google Cloud Console > Credentials](https://console.cloud.google.com/apis/credentials)
2. Create an OAuth 2.0 Client ID (Web application)
3. Add the redirect URI from Drizby settings
4. Required scopes: `openid`, `email`, `profile`

### GitHub

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create a new OAuth App
3. Set the Authorization callback URL to the redirect URI from Drizby settings
4. Required scopes: `read:user`, `user:email`

### GitLab

1. Go to [GitLab Applications](https://gitlab.com/-/user_settings/applications)
2. Create a new application
3. Add the redirect URI from Drizby settings
4. Required scopes: `openid`, `profile`, `email`

### Microsoft / Entra ID

1. Go to [Azure App Registrations](https://portal.azure.com/#view/Microsoft_AAD_RegisteredApps)
2. Register a new application
3. Under **Authentication**, add the redirect URI from Drizby settings as a Web platform redirect
4. Required scopes: `openid`, `profile`, `email`, `User.Read`
5. **Tenant ID**: Use `common` for any Microsoft account, or a specific tenant ID to restrict to one organization

### Slack

1. Go to [Slack API Apps](https://api.slack.com/apps)
2. Create a new app
3. Under **OAuth & Permissions**, add the redirect URI from Drizby settings
4. Required scopes: `openid`, `profile`, `email`

## SAML 2.0 SSO

SAML 2.0 enables enterprise single sign-on through identity providers like Okta, Azure AD/Entra ID, and OneLogin. See the dedicated [Enterprise SSO & SCIM](/users/enterprise-sso/) guide for full setup instructions including:

- Step-by-step Okta and Azure AD configuration
- Attribute mapping reference
- Group sync behavior
- Service Provider URLs

## SCIM 2.0 Provisioning

SCIM 2.0 allows your identity provider to automatically create, update, and deactivate users and groups in Drizby. See the dedicated [Enterprise SSO & SCIM](/users/enterprise-sso/) guide for:

- Token generation and management
- Okta and Azure AD SCIM setup
- Provisioning behavior reference
- SCIM endpoint documentation

## Auto-Accept Email Domains

By default, new users who sign up via OAuth or magic link are placed in a pending state until an admin approves them. To bypass this for trusted email domains:

1. Go to **Settings > Authentication > Auto-accept Domains**
2. Enter one or more domains (e.g. `yourcompany.com, partner.org`)
3. Click **Save**

Users with verified emails from these domains will automatically receive the `member` role on sign-up.

:::caution
This only applies to OAuth and magic link sign-ins where the email is verified by the provider. Password registration does not auto-accept because the email is unverified at sign-up time.
:::

## User Roles on Sign-Up

| Scenario | Assigned Role |
|---|---|
| First user ever | `admin` |
| Email domain in auto-accept list | `member` |
| SCIM-provisioned user | `member` |
| All other sign-ups | `user` (pending approval) |

See [Roles](/users/roles/) for details on what each role can do.

## Dev API Key

In development (`NODE_ENV` is not `production`), all API routes accept a bearer token for auth bypass:

```bash
curl -H 'Authorization: Bearer dc-bi-dev-key' http://localhost:3461/api/connections
```

This authenticates as admin user (id: 1). Override the key with the `DEV_API_KEY` environment variable. This key is disabled in production.
