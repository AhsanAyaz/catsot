# Firebase Services Integration

**Backend in Minutes**
~25 minutes

Note:

- Show how AI connects real Firebase services
- Firestore, Auth, Hosting

---

<!-- .slide: style="font-size: 0.8em" -->
### The Firebase Ecosystem

**Everything you need, integrated**

| Service | Purpose |
|---------|---------|
| **Firestore** | NoSQL database |
| **Authentication** | User management |
| **App Hosting** | Deployment + CDN |
| **Storage** | File uploads |
| **Data Connect** | PostgreSQL (advanced) |

---

### Adding Services with AI

**Just ask:**

```text
You: "Add Firebase for user entries
     and authentication"

Agent: → Initializes Firebase
       → Enables Firestore
       → Sets up Auth
       → Writes connection code
```

**No manual console clicking required**

---

### Firestore Database

**Prompt-based setup**

```text
You: "Create a recipes collection with
     title, ingredients, and author fields"
```

**Agent creates:**

- Firestore initialization
<!-- .element: class="fragment" -->
- TypeScript types
<!-- .element: class="fragment" -->
- CRUD operations
<!-- .element: class="fragment" -->
- Error handling
<!-- .element: class="fragment" -->

---

<!-- .slide: style="font-size: 0.8em" -->
### Firestore MCP Tools

**AI can interact with your data**

| Tool | Action |
|------|--------|
| `firestore_list_collections` | Show all collections |
| `firestore_query_collection` | Query documents |
| `firestore_add_document` | Add new data |
| `firestore_update_document` | Modify existing |

```text
You: "List all recipes from my Firestore"
Agent: [Queries database, shows results]
```

---

### Security Rules

**Critical for production**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /recipes/{recipeId} {
      allow read: if true;
      allow write: if request.auth != null
                   && request.auth.uid == resource.data.authorId;
    }
  }
}
```

**Principle of Least Privilege**

---

### Generating Security Rules

**Use Gemini to help:**

```text
You: "Generate Firestore security rules where:
     - Anyone can read recipes
     - Only the author can edit/delete
     - Users can only create with their own auth ID"
```

**Agent generates and explains the rules**

---

### Authentication

**One prompt setup**

```text
You: "Add Firebase Authentication
     with email/password"
```

**Agent creates:**

- SignIn component
<!-- .element: class="fragment" -->
- SignUp component
<!-- .element: class="fragment" -->
- Auth context/provider
<!-- .element: class="fragment" -->
- Protected routes
<!-- .element: class="fragment" -->

---

<!-- .slide: style="font-size: 0.8em" -->
### Auth MCP Tools

**Manage users via AI**

| Tool | Action |
|------|--------|
| `auth_get_users` | List users |
| `auth_get_user` | Get user details |
| `auth_update_user` | Modify user |
| `auth_delete_user` | Remove user |

**Admin tasks without the console**

---

### App Hosting

**One-click deployment**

```bash
/firebase:deploy
```

**What happens:**

1. Build triggered
2. Assets optimized
3. CDN configured
4. SSL provisioned
5. URL generated

**Your app is LIVE**

---

<!-- .slide: style="font-size: 0.8em" -->
### Hosting Features

| Feature | Benefit |
|---------|---------|
| **CDN** | Fast globally |
| **SSL** | HTTPS by default |
| **SSR Support** | Next.js works perfectly |
| **Git Integration** | CI/CD automatic |
| **Rollbacks** | One-click to previous version |

---

### The Deploy Flow

1. Code ready
<!-- .element: class="fragment" -->
1. Click Deploy
<!-- .element: class="fragment" -->
1. Build runs
<!-- .element: class="fragment" -->
1. Preview URL
<!-- .element: class="fragment" -->
1. Share with the world!
<!-- .element: class="fragment" -->

---

### Demo: Full Integration

**Let's add to our app:**

1. Click "Add Firestore" in sidebar
2. Configure collection structure
3. Add authentication
4. Connect to our UI
5. Deploy and test

---

### Key Takeaways

✅ **Firestore** = Prompt-based database setup
<!-- .element: class="fragment" -->
✅ **Authentication** = One prompt, full auth flow
<!-- .element: class="fragment" -->
✅ **Security Rules** = AI-generated, principle of least privilege
<!-- .element: class="fragment" -->
✅ **App Hosting** = One-click production deploy
<!-- .element: class="fragment" -->

**Next:** Build time! Pick your project
