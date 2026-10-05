# CrossWear admin panel setup

The admin panel is at /admin/. It uses Netlify Identity for sign-in, Netlify Functions for protected changes, and Netlify Blobs for the product catalog and uploaded photos.

## Connect the live site to this project

The current storefront was first published as static files. Netlify Functions need to be built from the repository:

1. In Netlify, open the existing crosswear project and connect it to the GitHub repository containing this folder.
2. Keep the publish directory set to . (the project root). The functions directory is configured as netlify/functions.
3. Save the build settings and deploy the connected branch. Future pushes to GitHub will publish code and function changes.

## Turn on the private admin sign-in

1. In the Netlify project, open Identity and enable it.
2. Set registration to Invite only.
3. Invite the email address you will use to manage the shop.
4. In the Identity user list, assign that account the role admin.
5. Open https://crosswear.netlify.app/admin/ and sign in with that invitation.

Do not enable open registration. The catalog and photo upload functions check the signed-in user's admin role before accepting changes. Public visitors can read only active products.

## What the panel can manage

- Add and edit design names, Bible references, categories, descriptions, colors, and the main mockup photo.
- Mark designs as new, hide them from the public shop, or mark artwork as pending.
- Photos must be PNG, JPG, or WebP and under 8 MB.
- The current common price and sizes stay at 15,000 RWF and M–3XL. Those are displayed in the editor as shared shop settings.

Existing mockups remain in the repository. New uploads and the saved catalog are stored by Netlify Blobs, so product edits do not require editing script.js.
