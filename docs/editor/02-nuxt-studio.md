# Editing Guide: Nuxt Studio & Configuration

[Nuxt Studio](https://nuxt.studio/) is our visual editing interface. It allows any collaborator or team member to modify content without needing to code or master Git.

## ✍️ Usage (Content Creators)

1. Log in to your Nuxt Studio project workspace.
2. Navigate the left tree view to find the blog post (`/content/blog`) or project (`/content/projects`) you want to edit.
3. The **"Visual Editor"** allows you to edit text directly on the page (WYSIWYG).
4. **Insert a rich component**: Simply type `/` on your keyboard to open the Nuxt Studio dropdown menu. There, you will find our custom components (e.g.: `ArticleHeader`, `Infos`, `Showcase`) that you can inject and fill out visually.
5. **Save and Publish**: Edits create a "Draft" (temporary version). Click **"Publish"** when ready to commit the changes. Developers will automatically receive a `commit` on GitHub.

## 🛠️ Studio Configuration (Developers)

To improve the experience for editors and type the forms within the studio, a `nuxt.schema.ts` file must be maintained at the root of the project, for example:

```ts
// nuxt.schema.ts
export default defineNuxtSchema({
  appConfig: {
    ui: {
      colors: {
        primary: {
          $default: 'blue',
          $schema: {
            title: 'Primary Color',
            description: 'Primary color of the Design System.',
            type: 'string',
            tags: ['@studioIcon i-ph-palette']
          }
        }
      }
    }
  }
})
```

This schema directly connects your UI variables with the "Design" tab in the editor for the editorial team, preventing invalid inputs.
