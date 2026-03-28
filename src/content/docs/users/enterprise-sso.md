---
title: Enterprise SSO & SCIM
description: Configure SAML 2.0 single sign-on and SCIM 2.0 user provisioning with your identity provider.
---

Drizby supports enterprise authentication via **SAML 2.0** (single sign-on) and **SCIM 2.0** (automatic user and group provisioning). This guide walks through setup with Okta and Azure AD/Entra ID — the same patterns apply to OneLogin, JumpCloud, and other SAML/SCIM-compatible identity providers.

## Prerequisites

- Drizby deployed with a stable public URL (set via `APP_URL` environment variable)
- `ENCRYPTION_SECRET` set in production (secrets are encrypted at rest)
- Admin access to both Drizby and your identity provider

---

## SAML 2.0 Single Sign-On

SAML SSO lets users authenticate through your organization's identity provider instead of managing separate Drizby credentials.

### Service Provider URLs

You'll need these values when configuring your IdP. They're also displayed in the Drizby admin UI under **Settings > Authentication > SAML 2.0 SSO**.

| Field | Value |
|---|---|
| **ACS URL** (Assertion Consumer Service) | `https://your-drizby.example.com/api/auth/saml/callback` |
| **SP Entity ID** | `https://your-drizby.example.com/api/auth/saml/metadata` |
| **SP Metadata URL** | `https://your-drizby.example.com/api/auth/saml/metadata` |
| **NameID Format** | `urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress` |

### Setup with Okta

#### 1. Create the SAML app in Okta

1. In the Okta admin console, go to **Applications > Create App Integration**
2. Select **SAML 2.0** and click Next
3. Give the app a name (e.g. "Drizby") and click Next
4. Fill in the SAML settings:

| Okta Field | Value |
|---|---|
| Single sign-on URL | `https://your-drizby.example.com/api/auth/saml/callback` |
| Audience URI (SP Entity ID) | `https://your-drizby.example.com/api/auth/saml/metadata` |
| Name ID format | EmailAddress |
| Application username | Email |

5. Under **Attribute Statements**, add:

| Name | Value |
|---|---|
| `email` | `user.email` |
| `name` | `user.displayName` |

6. (Optional) Under **Group Attribute Statements**, add:

| Name | Filter |
|---|---|
| `groups` | Matches regex: `.*` (or filter to specific groups) |

7. Click Next, select "I'm an Okta customer adding an internal app", and click Finish
8. On the app's **Sign On** tab, copy the **Metadata URL** (under "SAML Signing Certificates" > Actions > View IdP metadata)

#### 2. Configure Drizby

1. Go to **Settings > Authentication** in the Drizby admin UI
2. Select **SAML 2.0 SSO** in the sidebar and enable it
3. Paste the Okta **Metadata URL** into the "IdP Metadata URL" field
4. Verify the attribute mapping matches what you configured in Okta:
   - Email: `email`
   - Name: `name`
   - Groups: `groups`
5. Click **Save**

The login page will now show a **"Sign in with SSO"** button.

### Setup with Azure AD / Entra ID

1. In Azure portal, go to **Enterprise Applications > New Application > Create your own**
2. Select "Integrate any other application you don't find in the gallery (Non-gallery)"
3. Under **Single sign-on**, select SAML and configure:
   - **Identifier (Entity ID)**: `https://your-drizby.example.com/api/auth/saml/metadata`
   - **Reply URL (ACS)**: `https://your-drizby.example.com/api/auth/saml/callback`
   - **Sign on URL**: `https://your-drizby.example.com/api/auth/saml/login`
4. Under **Attributes & Claims**, ensure:
   - `email` maps to `user.mail`
   - `name` maps to `user.displayname`
5. Download the **Federation Metadata XML** and paste it into Drizby's "IdP Metadata XML" field in **Settings > Authentication > SAML 2.0 SSO**

### Attribute Mapping

Drizby extracts user information from the SAML assertion using configurable attribute names. The defaults work with most IdPs:

| Drizby Field | Default Attribute | Fallback URIs |
|---|---|---|
| Email | `email` | `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress` |
| Name | `name` | `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name` |
| Groups | `groups` | `http://schemas.xmlsoap.org/claims/Group`, `memberOf` |

If your IdP uses different attribute names, update the mapping in the SAML settings UI.

### Group Sync

When SAML assertions include group information, Drizby automatically:

- Creates a **SAML** group type (if it doesn't exist)
- Creates groups matching the assertion values
- Syncs the user's group membership on each login (adds and removes as needed)

These groups can be used for [dashboard and notebook visibility controls](/users/groups/).

---

## SCIM 2.0 User Provisioning

SCIM allows your IdP to automatically create, update, and deactivate users and groups in Drizby — no manual invites needed.

### Enable SCIM in Drizby

1. Go to **Settings > Authentication** in the Drizby admin UI
2. Select **SCIM Provisioning** in the sidebar and enable it
3. Click **Generate Token** — give it a name like "Okta SCIM"
4. **Copy the token immediately** — it is only shown once
5. Note the **SCIM Endpoint URL** displayed (e.g. `https://your-drizby.example.com/scim/v2`)

### Setup with Okta

1. In the Okta admin console, open the SAML app you created above
2. Go to the **General** tab and click **Edit**
3. Under **Provisioning**, select **SCIM** and click Save
4. Go to the new **Provisioning** tab and click **Edit** under "SCIM Connection"
5. Fill in:

| Okta Field | Value |
|---|---|
| SCIM connector base URL | `https://your-drizby.example.com/scim/v2` |
| Unique identifier field for users | `userName` |
| Supported provisioning actions | Push New Users, Push Profile Updates, Push Groups |
| Authentication Mode | HTTP Header |
| Authorization | Bearer token you generated in Drizby |

6. Click **Test Connector Configuration** to verify the connection
7. Click Save
8. Under **Provisioning > To App**, enable:
   - Create Users
   - Update User Attributes
   - Deactivate Users

### Setup with Azure AD / Entra ID

1. In the Enterprise Application you created for SAML, go to **Provisioning**
2. Set provisioning mode to **Automatic**
3. Under **Admin Credentials**, enter:
   - **Tenant URL**: `https://your-drizby.example.com/scim/v2`
   - **Secret Token**: the bearer token you generated in Drizby
4. Click **Test Connection** to verify
5. Configure attribute mappings and enable provisioning

### SCIM Endpoints

Once enabled, Drizby exposes the full SCIM 2.0 API:

| Endpoint | Method | Purpose |
|---|---|---|
| `/scim/v2/ServiceProviderConfig` | GET | Server capabilities |
| `/scim/v2/Schemas` | GET | Schema definitions |
| `/scim/v2/ResourceTypes` | GET | Supported resource types |
| `/scim/v2/Users` | GET, POST | List/create users |
| `/scim/v2/Users/:id` | GET, PUT, PATCH, DELETE | CRUD single user |
| `/scim/v2/Groups` | GET, POST | List/create groups |
| `/scim/v2/Groups/:id` | GET, PUT, PATCH, DELETE | CRUD single group |
| `/scim/v2/.search` | POST | Cross-resource search |

All endpoints require a bearer token in the `Authorization` header.

### Provisioning Behavior

| IdP Action | Drizby Behavior |
|---|---|
| Create user | User created with `member` role (pre-approved) |
| Update user | Profile fields updated |
| Deactivate user | User blocked (`isBlocked = true`) |
| Reactivate user | User unblocked |
| Delete user | User blocked (soft delete) |
| Create group | Group created under "SCIM" group type |
| Update group members | Membership synced (adds/removes) |
| Delete group | Group deleted (memberships cascade) |

SCIM-provisioned users are marked internally so you can distinguish them from manually created accounts.

### Token Management

- Tokens are hashed (SHA-256) before storage — Drizby never stores the raw token
- You can generate multiple tokens (e.g. one per IdP)
- Revoke tokens at any time from **Settings > Authentication > SCIM Provisioning**
- Last-used timestamps are tracked for each token

---

## Troubleshooting

### SAML login redirects but fails on callback

- Verify the ACS URL in your IdP exactly matches `https://your-drizby.example.com/api/auth/saml/callback`
- Check that the IdP signing certificate is correct (or that metadata XML/URL is properly configured)
- Ensure `APP_URL` is set to your public-facing URL (not `localhost`)

### SCIM connector test fails

- Verify the SCIM endpoint URL ends with `/scim/v2` (no trailing slash)
- Confirm the bearer token was copied correctly (it's only shown once)
- Check that SCIM is enabled in Drizby settings

### Users created but pending approval

- SCIM-provisioned users are automatically assigned the `member` role — they should not require approval
- If a user was created manually before SCIM provisioning, they may retain their original `user` (pending) role

### Groups not syncing

- For SAML: verify the group attribute name in the assertion matches your mapping (default: `groups`)
- For SCIM: ensure "Push Groups" is enabled in your IdP's provisioning settings
- SCIM groups are created under the "SCIM" group type; SAML groups under the "SAML" group type
